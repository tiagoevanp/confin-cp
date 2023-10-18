package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ISetting;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.BusinessConfEntity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/config/business")
public class BusinessConf implements ISetting<BusinessConfEntity> {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<BusinessConfEntity> businessConfigs = BusinessConfEntity.listAll();

            return new Response(businessConfigs);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response read(@PathParam("id") String id) {
        try {
            BusinessConfEntity businessConfig = BusinessConfEntity.findById(new ObjectId(id));

            if (businessConfig == null) {
                throw new NotFoundException();
            }

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(List<BusinessConfEntity> businessConfig) {
        try {
            for (BusinessConfEntity businessConfEntity : businessConfig) {
                businessConfEntity.update();
            }

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
