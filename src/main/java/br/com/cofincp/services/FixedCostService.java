package br.com.cofincp.services;

import br.com.cofincp.entities.FixedCostEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;

@ApplicationScoped
public class FixedCostService {
    public void validate(@Valid FixedCostEntity entity) {
    }
}
