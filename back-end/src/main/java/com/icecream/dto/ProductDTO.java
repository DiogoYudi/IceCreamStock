package com.icecream.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record ProductDTO(
    @GeneratedValue(strategy = GenerationType.AUTO) Long id,
    @NotBlank @NotNull @Length(max = 50) String name,
    @NotNull double price,
    @NotBlank @NotNull String category) {
    
}
