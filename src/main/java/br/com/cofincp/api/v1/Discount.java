package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.DiscountEntity;
import br.com.cofincp.enums.RestMethods;
import br.com.cofincp.services.DiscountService;
import br.com.cofincp.services.LogsService;
import jakarta.inject.Inject;
import jakarta.validation.ConstraintViolationException;
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

@Path("api/v1/discount")
public class Discount extends LogsService implements ICrud<DiscountEntity> {

    @Inject
    DiscountService discountService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<DiscountEntity> discounts = DiscountEntity.listAll();

            return new Response(discounts);
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
            DiscountEntity discount = DiscountEntity.findById(new ObjectId(id));

            if (discount == null) {
                throw new NotFoundException();
            }

            return new Response(discount);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(DiscountEntity discount) {
        try {
            discountService.validate(discount);

            discount.persist();

            setLog(discount.id.toString(), RestMethods.POST);

            return new Response(discount);
        } catch (ConstraintViolationException e) {
            return new Response(e.getConstraintViolations());
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, DiscountEntity discount) {
        try {
            discountService.validate(discount);

            discount.update();

            setLog(discount.id.toString(), RestMethods.PUT);

            return new Response(discount);
        } catch (ConstraintViolationException e) {
            return new Response(e.getConstraintViolations());
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
            DiscountEntity discount = DiscountEntity.findById(new ObjectId(id));

            if (discount == null) {
                throw new NotFoundException();
            }

            discount.delete();

            setLog(discount.id.toString(), RestMethods.DELETE);

            return new Response(discount);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
