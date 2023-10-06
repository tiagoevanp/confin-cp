package br.com.cofincp.services;

import br.com.cofincp.api.v1.Logs;
import br.com.cofincp.entities.LogsEntity;
import br.com.cofincp.enums.RestMethods;
import io.vertx.ext.web.RoutingContext;

public class LogsService {
    public static void setLog(String id, RestMethods method, RoutingContext context, Logs logsRestClient) {
        LogsEntity log = new LogsEntity();
        log.ip = context.request().host();
        log.uri = context.request().absoluteURI();
        log.timestamp = System.currentTimeMillis();
        log.method = method;
        log.payloadId = id;
        logsRestClient.create(log);
    }
}
