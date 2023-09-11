package br.com.cofincp.entities;

import java.util.List;

import br.com.cofincp.entities.helpers.Config;
import br.com.cofincp.enums.BusinessConf;
import io.quarkus.mongodb.panache.PanacheMongoEntity;

public class BusinessConfEntity extends PanacheMongoEntity {
    public BusinessConf name;
    public List<Config> configs;
}
