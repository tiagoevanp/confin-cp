package br.com.cofincp.entity;

import java.util.List;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="product")
public class ProductEntity extends PanacheMongoEntity {
    public String name;
    public List<Purchase> purchase;
    public int profit_percentage;
    public String supplier_id;
    public List<String> supply_id;
    public String discount_id;
}
