import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  displaySignInForm:boolean = true;
  lnkMsg:string = "Company Sign Up";
  displayAdminForm:boolean = false;

  toggleFormDisplay() {
    this.displaySignInForm = !this.displaySignInForm;
    this.lnkMsg = this.displaySignInForm ? "Company Sign Up" : "Sign In";
  }

  companySignUpSubmit() {
    this.displayAdminForm = true;
  }
}
