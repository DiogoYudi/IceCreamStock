package com.icecream.dto;

import org.springframework.stereotype.Component;

import com.icecream.model.SaleProduct;

@Component
public class SaleProductMapper {
    public SaleProductDTO toDTO(SaleProduct saleProduct){
        if(saleProduct == null) return null;
        return new SaleProductDTO(saleProduct.getId(), saleProduct.getId_product(), saleProduct.getId_sale(), saleProduct.getQtd(), saleProduct.getTotalPrice());
    }

    public SaleProduct toEntity(SaleProductDTO saleProductDTO){
        if(saleProductDTO == null) return null;

        SaleProduct saleProduct = new SaleProduct();
        if(saleProductDTO.id() != null) saleProduct.setId(saleProductDTO.id());
        saleProduct.setId_product(saleProductDTO.id_product());
        saleProduct.setId_sale(saleProductDTO.id_sale());
        saleProduct.setQtd(saleProductDTO.qtd());
        saleProduct.setTotalPrice(saleProductDTO.total_price());
        return saleProduct;
    }
}
