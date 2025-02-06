package com.icecream.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.icecream.dto.SaleProductDTO;
import com.icecream.dto.SaleProductMapper;
import com.icecream.exception.RecordNotFoundException;
import com.icecream.model.SaleProduct;
import com.icecream.repository.SaleProductRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class SaleProductService {
    private final SaleProductRepository saleProductRepository;
    private final SaleProductMapper saleProductMapper;

    public SaleProductService(SaleProductRepository saleProductRepository, SaleProductMapper saleProductMapper){
        this.saleProductRepository = saleProductRepository;
        this.saleProductMapper = saleProductMapper;
    }

    public List<SaleProductDTO> list(){
        return saleProductRepository.findAll().stream().map(saleProductMapper::toDTO).collect(Collectors.toList());
    }

    public List<SaleProductDTO> findByIdSale(Long idSale) {
        return saleProductRepository.findByIdSale(idSale).stream()
                .map(saleProductMapper::toDTO)
                .collect(Collectors.toList());
    }

    public SaleProductDTO create(@Valid @NotNull SaleProductDTO saleProduct){
        return saleProductMapper.toDTO(saleProductRepository.save(saleProductMapper.toEntity(saleProduct)));
    }

    public SaleProductDTO update(@NotNull @Positive Long id, @Valid @NotNull SaleProductDTO saleProduct){
        System.out.println(saleProduct);
        return saleProductRepository.findById(id).map(recordFound -> {
            recordFound.setIdProduct(saleProduct.id_product());
            recordFound.setIdSale(saleProduct.id_sale());
            recordFound.setQtd(saleProduct.qtd());
            recordFound.setTotalPrice(saleProduct.total_price());
            return saleProductMapper.toDTO(saleProductRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id){
        saleProductRepository.delete(saleProductRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }

    public void deleteProduct(@NotNull @Positive Long id_product, @NotNull @Positive Long idSale){
        Optional<SaleProduct> saleProductOptional = saleProductRepository.findByIdProductAndIdSale(id_product, idSale);
        if(saleProductOptional.isPresent()){
            SaleProduct saleProduct = saleProductOptional.get();
            if(saleProduct.getQtd() > 0){
                saleProduct.setQtd(saleProduct.getQtd() - 1);
                saleProductRepository.save(saleProduct);
                if(saleProduct.getQtd() < 1){
                    saleProductRepository.delete(saleProduct);
                }
            }
        }
    }
}
