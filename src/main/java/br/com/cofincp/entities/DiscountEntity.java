package br.com.cofincp.entities;

import br.com.cofincp.entities.helpers.NumberValue;
import br.com.cofincp.entities.helpers.OptionType;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@MongoEntity(collection = "discount")
public class DiscountEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    @NotNull(message = "Valor é um campo obrigatório")
    public NumberValue value;
    @NotNull(message = "Tipo é um campo obrigatório")
    public OptionType type;
}
