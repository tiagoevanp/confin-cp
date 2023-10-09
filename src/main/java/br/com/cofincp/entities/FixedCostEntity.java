package br.com.cofincp.entities;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class FixedCostEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    @Positive(message = "Valor não pode ser negativo, zero ou nulo")
    public int value;
}
