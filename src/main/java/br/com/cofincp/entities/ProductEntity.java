package br.com.cofincp.entities;

import java.util.List;

import br.com.cofincp.entities.helpers.NumberValue;
import br.com.cofincp.entities.helpers.OptionType;
import br.com.cofincp.entities.helpers.Purchase;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.smallrye.common.constraint.NotNull;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
@MongoEntity(collection = "product")
public class ProductEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    public Purchase purchase;
    public NumberValue profit_percentage;
    @NotNull
    public OptionType supplier_id;
    public List<OptionType> supply_id;
    public OptionType discount_id;
}
