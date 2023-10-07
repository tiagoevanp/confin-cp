package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.SupplierEntity;
import br.com.cofincp.enums.RestMethods;
import br.com.cofincp.services.LogsService;
import br.com.cofincp.services.SupplierService;
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

@Path("api/v1/supplier")
public class Supplier extends LogsService implements ICrud<SupplierEntity> {

    @Inject
    SupplierService supplierService;

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<SupplierEntity> suppliers = SupplierEntity.listAll();

            return new Response(suppliers);
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
            SupplierEntity supplier = SupplierEntity.findById(new ObjectId(id));

            if (supplier == null) {
                throw new NotFoundException();
            }

            return new Response(supplier);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(SupplierEntity supplier) {
        try {
            supplierService.validate(supplier);

            supplier.persist();

            setLog(supplier.id.toString(), RestMethods.POST);

            return new Response(supplier);
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
    public Response update(@PathParam("id") String id, SupplierEntity supplier) {
        try {
            supplierService.validate(supplier);

            supplier.update();

            setLog(supplier.id.toString(), RestMethods.PUT);

            return new Response(supplier);
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
            SupplierEntity supplier = SupplierEntity.findById(new ObjectId(id));

            if (supplier == null) {
                throw new NotFoundException();
            }

            supplier.delete();

            setLog(supplier.id.toString(), RestMethods.DELETE);

            return new Response(supplier);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
