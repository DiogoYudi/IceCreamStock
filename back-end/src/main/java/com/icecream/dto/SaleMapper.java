package com.icecream.dto;

import org.springframework.stereotype.Component;

import com.icecream.model.Sale;

@Component
public class SaleMapper {
    public SaleDTO toDTO(Sale sale){
        if(sale == null) return null;
        return new SaleDTO(sale.getId(), sale.getTableNum(), sale.isStatus(), sale.getTotalprice(), sale.getDate());
    }

    public Sale toEntity(SaleDTO saleDTO){
        if(saleDTO == null) return null;
        
        Sale sale = new Sale();
        if(saleDTO.id() != null) sale.setId(saleDTO.id());
        sale.setTableNum(saleDTO.tableNum());
        sale.setStatus(saleDTO.status());
        sale.setTotalprice(saleDTO.totalprice());
        sale.setDate(saleDTO.date());
        return sale;
    }
}