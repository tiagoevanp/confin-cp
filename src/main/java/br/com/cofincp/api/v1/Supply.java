package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.SupplyEntity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

public class Supply implements ICrud<SupplyEntity> {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<SupplyEntity> supplies = SupplyEntity.listAll();

            return new Response(supplies);
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
            SupplyEntity supply = SupplyEntity.findById(new ObjectId(id));

            if(supply == null) {
                throw new NotFoundException();
            }

            return new Response(supply);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(SupplyEntity supply) {
        try {
            supply.persist();

            return new Response(supply);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, SupplyEntity supply) {
        try {
            supply.update();

            return new Response(supply);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response delete(@PathParam("id") String id) {
        try {
            SupplyEntity supply = SupplyEntity.findById(new ObjectId(id));

            if(supply == null) {
                throw new NotFoundException();
            }

            supply.delete();

            return new Response(supply);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
