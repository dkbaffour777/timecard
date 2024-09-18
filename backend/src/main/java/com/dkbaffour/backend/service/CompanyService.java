package com.dkbaffour.backend.service;

import com.dkbaffour.backend.dto.CompanyDTO;
import com.dkbaffour.backend.dto.EntityToDTOMapper;
import com.dkbaffour.backend.model.Company;
import com.dkbaffour.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private EntityToDTOMapper entityToDTOMapper;

    public CompanyDTO saveCompany(Company company) {
        Company savedCompany = companyRepository.save(company);
        return entityToDTOMapper.convertToCompanyDTO(savedCompany);
    }

    public List<CompanyDTO> getAllCompanies() {
        List<Company> companies = companyRepository.findAll();
        return companies.stream()
                .map(entityToDTOMapper::convertToCompanyDTO)
                .collect(Collectors.toList());
    }

    public CompanyDTO getCompanyById(Long id) {
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));
        return entityToDTOMapper.convertToCompanyDTO(company);
    }
}
