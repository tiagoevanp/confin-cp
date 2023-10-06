package br.com.cofincp.entities;

import br.com.cofincp.enums.RestMethods;
import io.quarkus.mongodb.panache.PanacheMongoEntity;
import io.quarkus.mongodb.panache.common.MongoEntity;

@MongoEntity(collection = "logs")
public class LogsEntity extends PanacheMongoEntity {
    public String ip;
    public String uri;
    public RestMethods method;
    public long timestamp;
    public String payloadId;
}
