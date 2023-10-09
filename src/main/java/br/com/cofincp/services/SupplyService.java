package br.com.cofincp.services;

import br.com.cofincp.entities.SupplyEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;

@ApplicationScoped
public class SupplyService {
    public void validate(@Valid SupplyEntity entity) {
    }
}
