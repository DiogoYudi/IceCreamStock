package com.icecream.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.icecream.dto.ProductDTO;
import com.icecream.service.ProductService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/product")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping
    public List<ProductDTO> list(){
        return productService.list();
    }

    @GetMapping("/{id}")
    public ProductDTO findById(@PathVariable @NotNull @Positive Long id){
        return productService.findById(id);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public ProductDTO create(@RequestBody @Valid @NotNull ProductDTO product){
        return productService.create(product);
    }
    
    @PutMapping("/{id}")
    public ProductDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid @NotNull ProductDTO product){
        return productService.update(id, product);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        productService.delete(id);
    }
}
