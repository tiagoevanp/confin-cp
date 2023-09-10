package br.com.cofincp.entity;

import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="supplier")
public class SupplierEntity extends PanacheMongoEntity {
    public String name;
    public String marketplace;
    public Address address;
    public Contact contact;
}