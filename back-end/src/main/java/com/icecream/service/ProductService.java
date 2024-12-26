package com.icecream.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.icecream.dto.ProductDTO;
import com.icecream.dto.ProductMapper;
import com.icecream.exception.RecordNotFoundException;
import com.icecream.model.Product;
import com.icecream.repository.ProductRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

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

    public ProductDTO findById(@NotNull @Positive Long id){
        return productRepository.findById(id).map(productMapper::toDTO).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public ProductDTO create(@Valid @NotNull ProductDTO product){
        return productMapper.toDTO(productRepository.save(productMapper.toEntity(product)));
    }

    public ProductDTO update(@NotNull @Positive Long id, @Valid @NotNull ProductDTO productDTO){
        return productRepository.findById(id).map(recordFound -> {
            Product product = productMapper.toEntity(productDTO);
            recordFound.setName(productDTO.name());
            recordFound.setPrice(productDTO.price());
            recordFound.setCategory(productDTO.category());
            return productMapper.toDTO(productRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id){
        productRepository.delete(productRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
