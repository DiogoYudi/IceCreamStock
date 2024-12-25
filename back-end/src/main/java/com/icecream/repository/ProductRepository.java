package com.icecream.repository;

import org.springframework.stereotype.Repository;
import com.icecream.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>{
    
}
