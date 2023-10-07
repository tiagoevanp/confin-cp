package br.com.cofincp.entities;

import br.com.cofincp.entities.helpers.DiscountType;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

@MongoEntity(collection = "discount")
public class DiscountEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    @Positive(message = "Valor não pode ser negativo, zero ou nulo")
    public int value;
    @NotNull(message = "Tipo é um campo obrigatório")
    public DiscountType type;
}
