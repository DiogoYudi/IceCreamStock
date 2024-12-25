package com.icecream.dto;

import org.springframework.stereotype.Component;

import com.icecream.model.Product;

@Component
public class ProductMapper {
    public ProductDTO toDTO(Product product){
        if(product == null) return null;
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getCategory());
    }
}
