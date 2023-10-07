package br.com.cofincp.services;

import br.com.cofincp.entities.DiscountEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;

@ApplicationScoped
public class DiscountService {
    public void validate(@Valid DiscountEntity entity) {
    }
}
