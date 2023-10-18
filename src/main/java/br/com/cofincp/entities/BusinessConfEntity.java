package br.com.cofincp.entities;

import java.util.List;

import br.com.cofincp.entities.helpers.OptionType;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "conf-business")
public class BusinessConfEntity extends PanacheMongoEntity {
    public String id;
    public int value;
    public List<OptionType> values;
}
