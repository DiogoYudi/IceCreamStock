package com.icecream.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
    Long id,
    @NotBlank @NotNull @Length(max = 50) String name,
    @NotNull double price,
    @NotBlank @NotNull String category) {
    
}
