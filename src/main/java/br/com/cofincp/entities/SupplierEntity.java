package br.com.cofincp.entities;

import java.util.List;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;
import jakarta.validation.constraints.NotBlank;

@MongoEntity(collection = "supplier")
public class SupplierEntity extends PanacheMongoEntity {
    @NotBlank(message = "Nome é um campo obrigatório")
    public String name;
    @NotBlank(message = "Marketplace é um campo obrigatório")
    public String marketplace;
    public String address_street;
    public String address_number;
    public String address_zip_code;
    public List<String> contact_phone_number;
    public List<String> contact_email;
}
