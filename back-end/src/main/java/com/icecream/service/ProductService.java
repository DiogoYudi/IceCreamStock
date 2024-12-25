package com.icecream.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.icecream.dto.ProductDTO;
import com.icecream.dto.ProductMapper;
import com.icecream.repository.ProductRepository;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductService(ProductRepository productRepository, ProductMapper productMapper){
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    public List<ProductDTO> list(){
        return productRepository.findAll().stream().map(productMapper::toDTO).collect(Collectors.toList());
    }
}
