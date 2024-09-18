package com.dkbaffour.backend.dto;

import com.dkbaffour.backend.model.Company;
import com.dkbaffour.backend.model.User;
import org.springframework.stereotype.Component;

@Component
public class EntityToDTOMapper {

    public CompanyDTO convertToCompanyDTO(Company company) {
        CompanyDTO companyDTO = new CompanyDTO();
        companyDTO.setId(company.getId());
        companyDTO.setName(company.getName());
        companyDTO.setDomain(company.getDomain());
        companyDTO.setCreatedAt(company.getCreatedAt());

        return companyDTO;
    }

    public UserDTO convertToUserDTO(User user) {
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setEmail(user.getEmail());
        userDTO.setFirstName(user.getFirstName());
        userDTO.setLastName(user.getLastName());

        return userDTO;
    }
}
