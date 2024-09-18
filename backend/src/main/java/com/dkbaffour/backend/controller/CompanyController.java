package com.dkbaffour.backend.controller;

import com.dkbaffour.backend.dto.CompanyDTO;
import com.dkbaffour.backend.model.Company;
import com.dkbaffour.backend.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/companies")
@CrossOrigin(origins = "http://localhost:4200")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    // Sign up a new company
    @PostMapping("/signup")
    public CompanyDTO signUpCompany(@RequestBody Company company) {
        return companyService.saveCompany(company);
    }

    // Get all companies
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<CompanyDTO> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    // Get company by id
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    public CompanyDTO getCompanyById(@PathVariable Long id) {
        return companyService.getCompanyById(id);
    }
}
