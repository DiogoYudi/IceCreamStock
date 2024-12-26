package com.icecream.dto;

import org.springframework.stereotype.Component;

import com.icecream.model.Product;

@Component
public class ProductMapper {
    public ProductDTO toDTO(Product product){
        if(product == null) return null;
        return new ProductDTO(product.getId(), product.getName(), product.getPrice(), product.getCategory());
    }

    public Product toEntity(ProductDTO productDTO){
        if(productDTO == null) return null;

        Product product = new Product();
        if(productDTO.id() != null) product.setId(productDTO.id());
        product.setName(productDTO.name());
        product.setPrice(productDTO.price());
        product.setCategory(productDTO.category());
        return product;
    }
}
