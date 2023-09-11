package br.com.cofincp.entities;

import br.com.cofincp.entities.helpers.Purchase;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="supply")
public class SupplyEntity extends PanacheMongoEntity {
    public String name;
    public Purchase purchase;
    public String supplier_id;
    public int annual_depreciation_value;
    public int annual_maintenance_value;
}
