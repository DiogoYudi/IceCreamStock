package com.icecream.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.icecream.dto.SaleProductDTO;
import com.icecream.service.SaleProductService;

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
@RequestMapping("/sale-product")
public class SaleProductController {
    @Autowired
    private SaleProductService saleProductService;

    @GetMapping
    public List<SaleProductDTO> list(){
        return saleProductService.list();
    }

    @GetMapping("/{idSale}")
    public List<SaleProductDTO> findByIdSale(@PathVariable Long idSale) {
        return saleProductService.findByIdSale(idSale);
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public SaleProductDTO create(@RequestBody @Valid @NotNull SaleProductDTO body){
        System.out.println(body);
        return saleProductService.create(body);
    }

    @PutMapping("/{id}")
    public SaleProductDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid @NotNull SaleProductDTO body){
        return saleProductService.update(id, body);
    }

    @DeleteMapping("/{id_product}/{idSale}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id_product, @PathVariable @NotNull @Positive Long idSale){
        saleProductService.deleteProduct(id_product, idSale);
    }
}
