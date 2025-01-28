package com.icecream.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icecream.model.SaleProduct;

@Repository
public interface SaleProductRepository extends JpaRepository<SaleProduct, Long> {
}
