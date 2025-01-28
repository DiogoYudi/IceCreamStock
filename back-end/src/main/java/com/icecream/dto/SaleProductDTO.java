package com.icecream.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

public record SaleProductDTO(
    @GeneratedValue(strategy = GenerationType.AUTO) Long id,
    Long id_product,
    Long id_sale,
    int qtd,
    double total_price) {
}
