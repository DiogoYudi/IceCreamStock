package com.icecream.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@Entity
@Table(name = "sale_product")
public class SaleProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @NotBlank
    private Long id_product;

    @NotNull
    @NotBlank
    private Long id_sale;

    @NotNull
    @NotBlank
    private int qtd;

    @NotNull
    @NotBlank
    private double totalPrice;
}
