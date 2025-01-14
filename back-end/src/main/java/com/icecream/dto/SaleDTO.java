package com.icecream.dto;

import java.sql.Date;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.validation.constraints.NotNull;

public record SaleDTO(
    @GeneratedValue(strategy = GenerationType.AUTO) Long id,
    @NotNull int tableNum,
    @NotNull boolean status,
    double totalprice,
    Date date){
}
