package br.com.cofincp.entities;

import java.util.List;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "supplier")
public class SupplierEntity extends PanacheMongoEntity {
    public String name;
    public String marketplace;
    public String address_street;
    public String address_number;
    public String address_zip_code;
    public List<String> contact_phone_number;
    public List<String> contact_email;
}
