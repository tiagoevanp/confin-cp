package br.com.cofincp.entities;

import io.quarkus.mongodb.panache.PanacheMongoEntity;

public class FixedCostEntity extends PanacheMongoEntity {
    public String name;
    public int value;
}
