package br.com.cofincp.entities;

import br.com.cofincp.enums.ValueType;
import io.quarkus.mongodb.panache.PanacheMongoEntity;

public class DiscountEntity extends PanacheMongoEntity {
    public String name;
    public int value;
    public ValueType type;
}
