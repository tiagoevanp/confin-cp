package br.com.cofincp.services;

import br.com.cofincp.entities.ProductEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;

@ApplicationScoped
public class ProductService {
    public void validate(@Valid ProductEntity entity) {
    }
}
