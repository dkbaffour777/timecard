import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  displaySignInForm: boolean = true;
  lnkMsg: string = "Company Sign Up";
  displayAdminForm: boolean = false;

  // Reactive form groups
  signInForm: FormGroup;
  companyForm: FormGroup;
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize form groups with validators
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.companyForm = this.fb.group({
      name: ['', Validators.required],
      domain: ['', Validators.required]
    });

    this.companyForm.get('domain')?.disable();

    this.adminForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      company: [''],  // This will be filled after company signup
      role: [''] 
    }, { validators: this.passwordMatchValidator });
  }

  toggleFormDisplay() {
    this.displaySignInForm = !this.displaySignInForm;
    this.lnkMsg = this.displaySignInForm ? "Company Sign Up" : "Sign In";
  }

  onNameInput() {
    const name = this.companyForm.get('name')?.value;
    if (name) {
      this.companyForm.get('domain')?.setValue(`${name}.com`);
    } else {
      this.companyForm.get('domain')?.setValue('.com');
    }
  }

  // Method to check if passwords match
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');
    return password && confirmPassword && password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  // Method to handle sign-in submission
  onSignInSubmit() {
    if (this.signInForm.valid) {
      const { email, password } = this.signInForm.value;
      this.authService.signInUser({ email, password }).subscribe({
        next: () => this.router.navigate(['/home']), // Redirect to homepage on success
        error: (response) => console.log(response)
      });
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Method to handle company sign-up submission
  companySignUpSubmit() {
    if (this.companyForm.valid) {
      this.companyForm.get('domain')?.enable()
      
      this.authService.signUpCompany(this.companyForm.value).subscribe({
        next: (response) => {
          console.log('Company signup successful:', response);
          // Store the newly created company ID
          this.displayAdminForm = true;
  
          // Pre-fill the admin form with the company ID
          this.adminForm.patchValue({
            company: {id: response.id },
            role: {name: "ADMIN"}          
          });
        },
        error: (response) => {
          alert(response.error);
        }
      });

      this.companyForm.get('domain')?.disable()
    } else {
      alert('Please fill out the company registration form correctly.');
    }
  }

  // Method to handle admin sign-up submission
  adminSignUpSubmit() {
    if (this.adminForm.valid) {
      this.authService.signUpAdmin(this.adminForm.value).subscribe({
        next: (response) => {
          if (response.token) {
            // Set the token for authentication
            this.authService.setToken(response.token);
            
            console.log(response)
            
            // Redirect to the home page
            this.router.navigate(['/home']);
          } else {
            alert('Registration successful, but no token returned. Please sign in manually.');
          }
        },
        error: (response) => alert(response.error)
      });
    } else {
      alert('Please fill out the admin registration form correctly.');
    }
  }
}
