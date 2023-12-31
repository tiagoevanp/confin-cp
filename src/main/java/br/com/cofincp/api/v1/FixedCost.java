package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.FixedCostEntity;
import br.com.cofincp.enums.RestMethods;
import br.com.cofincp.services.FixedCostService;
import br.com.cofincp.services.LogsService;
import jakarta.inject.Inject;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/fixed-cost")
public class FixedCost extends LogsService implements ICrud<FixedCostEntity> {

    @Inject
    FixedCostService fixedCostService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<FixedCostEntity> fixedCosts = FixedCostEntity.listAll();

            return new Response(fixedCosts);
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
            FixedCostEntity fixedCost = FixedCostEntity.findById(new ObjectId(id));

            if (fixedCost == null) {
                throw new NotFoundException();
            }

            return new Response(fixedCost);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(FixedCostEntity fixedCost) {
        try {
            fixedCostService.validate(fixedCost);

            fixedCost.persist();

            setLog(fixedCost.id.toString(), RestMethods.POST);

            return new Response(fixedCost);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, FixedCostEntity fixedCost) {
        try {
            fixedCostService.validate(fixedCost);

            fixedCost.update();

            setLog(fixedCost.id.toString(), RestMethods.PUT);

            return new Response(fixedCost);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response delete(@PathParam("id") String id) {
        try {
            FixedCostEntity fixedCost = FixedCostEntity.findById(new ObjectId(id));

            if (fixedCost == null) {
                throw new NotFoundException();
            }

            fixedCost.delete();

            setLog(fixedCost.id.toString(), RestMethods.DELETE);

            return new Response(fixedCost);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

}
