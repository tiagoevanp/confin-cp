package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.BusinessConfEntity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/config/business")
public class BusinessConf implements ICrud<BusinessConfEntity>{

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

            if(businessConfig == null) {
                throw new NotFoundException();
            }

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(BusinessConfEntity businessConfig) {
        try {
            businessConfig.persist();

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, BusinessConfEntity businessConfig) {
        try {
            businessConfig.update();

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response delete(@PathParam("id") String id) {
        try {
            BusinessConfEntity businessConfig = BusinessConfEntity.findById(new ObjectId(id));

            if(businessConfig == null) {
                throw new NotFoundException();
            }

            businessConfig.delete();

            return new Response(businessConfig);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

}
