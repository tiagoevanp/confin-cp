package br.com.cofincp.interfaces;

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient;

import br.com.cofincp.api.v1.helpers.Deal;
import br.com.cofincp.api.v1.helpers.DealJson;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@RegisterRestClient(baseUri = "http://localhost:8081/deal")
public interface IDeal {
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Deal calculate(DealJson deal);
}