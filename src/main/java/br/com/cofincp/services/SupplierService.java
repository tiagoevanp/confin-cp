package br.com.cofincp.services;

import br.com.cofincp.entities.SupplierEntity;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.validation.Valid;

@ApplicationScoped
public class SupplierService {
    public void validateSupplier(@Valid SupplierEntity supplier) {
    }
}
