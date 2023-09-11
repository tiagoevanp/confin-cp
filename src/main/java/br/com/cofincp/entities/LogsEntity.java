package br.com.cofincp.entities;

import java.net.InetAddress;

import br.com.cofincp.enums.ApiUri;
import br.com.cofincp.enums.RestMethods;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection="logs")
public class LogsEntity extends PanacheMongoEntity {
    public InetAddress ip;
    public ApiUri uri;
    public RestMethods method;
    public String datetime;
    public String payload;
}
