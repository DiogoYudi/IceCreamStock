package com.icecream.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icecream.model.SaleProduct;

@Repository
public interface SaleProductRepository extends JpaRepository<SaleProduct, Long> {
    List<SaleProduct> findByIdSale(Long idSale);
    Optional<SaleProduct> findByIdProductAndIdSale(Long idProduct, Long idSale);
}
