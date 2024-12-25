package com.icecream.controller;

import java.util.List;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icecream.dto.ProductDTO;
import com.icecream.service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;


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
    
}
