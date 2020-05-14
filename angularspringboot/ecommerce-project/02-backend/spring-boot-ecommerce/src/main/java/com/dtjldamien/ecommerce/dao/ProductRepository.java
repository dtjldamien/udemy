package com.dtjldamien.ecommerce.dao;

import com.dtjldamien.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
