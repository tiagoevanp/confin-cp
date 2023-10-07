package br.com.cofincp.services;

import br.com.cofincp.api.v1.Logs;
import br.com.cofincp.entities.LogsEntity;
import br.com.cofincp.enums.RestMethods;
import io.vertx.ext.web.RoutingContext;
import jakarta.inject.Inject;
import jakarta.ws.rs.core.Context;

public class LogsService {
    @Context
    private RoutingContext context;

    @Inject
    Logs logsRestClient;

    public void setLog(String id, RestMethods method) {
        LogsEntity log = new LogsEntity();
        log.ip = context.request().host();
        log.uri = context.request().absoluteURI();
        log.timestamp = System.currentTimeMillis();
        log.method = method;
        log.payloadId = id;
        logsRestClient.create(log);
    }
}
