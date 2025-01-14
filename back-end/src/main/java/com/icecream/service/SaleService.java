package com.icecream.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.icecream.dto.SaleDTO;
import com.icecream.dto.SaleMapper;
import com.icecream.exception.RecordNotFoundException;
import com.icecream.model.Sale;
import com.icecream.repository.SaleRepository;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@Service
public class SaleService {
    private final SaleRepository saleRepository;
    private final SaleMapper saleMapper;

    public SaleService(SaleRepository saleRepository, SaleMapper saleMapper){
        this.saleRepository = saleRepository;
        this.saleMapper = saleMapper;
    }

    public List<SaleDTO> list(){
        return saleRepository.findAll().stream().map(saleMapper::toDTO).collect(Collectors.toList());
    }

    public SaleDTO findById(@NotNull @NotBlank @Positive Long id){
        return saleRepository.findById(id).map(saleMapper::toDTO).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public SaleDTO create(@Valid @NotNull SaleDTO sale){
        return saleMapper.toDTO(saleRepository.save(saleMapper.toEntity(sale)));
    }

    public SaleDTO update(@NotNull @Positive Long id, @Valid @NotNull SaleDTO saleDTO){
        return saleRepository.findById(id).map(recordFound -> {
            Sale sale = saleMapper.toEntity(saleDTO);
            recordFound.setTableNum(saleDTO.tableNum());
            recordFound.setStatus(saleDTO.status());
            recordFound.setTotalprice(saleDTO.totalprice());
            recordFound.setDate(saleDTO.date());
            return saleMapper.toDTO(saleRepository.save(recordFound));
        }).orElseThrow(() -> new RecordNotFoundException(id));
    }

    public void delete(@NotNull @Positive Long id){
        saleRepository.delete(saleRepository.findById(id).orElseThrow(() -> new RecordNotFoundException(id)));
    }
}
