package com.icecream.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.icecream.dto.SaleDTO;
import com.icecream.model.Sale;
import com.icecream.service.SaleService;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@Validated
@CrossOrigin(origins = "*")
@RequestMapping("/sale")
public class SaleController {
    @Autowired
    private SaleService saleService;

    @GetMapping
    public List<SaleDTO> list(){
        return saleService.list();
    }

    @GetMapping("/{id}")
    public SaleDTO findById(@PathVariable @NotNull @Positive Long id){
        return saleService.findById(id);
    }

    @GetMapping("/last-sale")
    public Sale getLastSale() {
        return saleService.findTopByOrderByIdDesc();
    }

    @PostMapping
    @ResponseStatus(code = HttpStatus.CREATED)
    public SaleDTO create(@RequestBody @Valid @NotNull SaleDTO sale){
        return saleService.create(sale);
    }

    @PutMapping("/{id}")
    public SaleDTO update(@PathVariable @NotNull @Positive Long id, @RequestBody @Valid @NotNull SaleDTO sale){
        return saleService.update(id, sale);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable @NotNull @Positive Long id){
        saleService.delete(id);
    }
}
