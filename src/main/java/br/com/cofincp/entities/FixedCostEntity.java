package br.com.cofincp.entities;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@MongoEntity(collection = "fixed-costs")
public class FixedCostEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    @NotNull(message = "Valor é um campo obrigatório")
    @Positive(message = "Valor não pode ser negativo, zero ou nulo")
    public int value;
}
