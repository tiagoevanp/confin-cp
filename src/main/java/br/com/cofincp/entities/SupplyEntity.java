package br.com.cofincp.entities;

import br.com.cofincp.entities.helpers.OptionType;
import br.com.cofincp.entities.helpers.Purchase;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import io.smallrye.common.constraint.NotNull;
import jakarta.validation.constraints.NotBlank;

@MongoEntity(collection = "supply")
public class SupplyEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    public Purchase purchase;
    @NotNull
    public OptionType supplier_id;
    public int annual_depreciation_value;
    public int annual_maintenance_value;
}
