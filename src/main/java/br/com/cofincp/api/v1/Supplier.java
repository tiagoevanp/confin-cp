package br.com.cofincp.api.v1;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.entity.Address;
import br.com.cofincp.entity.Contact;
import br.com.cofincp.entity.SupplierEntity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/supplier")
public class Supplier {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response read() {
        try {
            List<SupplierEntity> suppliers = SupplierEntity.listAll();

            return new Response(suppliers);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @GET
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response get(String id) {
        try {
            SupplierEntity supplier = SupplierEntity.findById(new ObjectId(id));

            if(supplier == null) {
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
    public Response create() {
        try {
            List<String> phones = new ArrayList<>();
            phones.add("999999");
            phones.add("999999");

            List<String> emails = new ArrayList<>();
            emails.add("t@t.com");
            emails.add("t@t1.com");

            SupplierEntity supplier = new SupplierEntity();
            supplier.name = "Fornecedor 1";
            supplier.marketplace = "Mercado Livre";
            supplier.address = new Address();
            supplier.address.setStreet("Rua 1");
            supplier.address.setNumber(1);
            supplier.address.setZip_code("99999999");
            supplier.contact = new Contact();
            supplier.contact.setPhone_number(phones);
            supplier.contact.setEmail(emails);

            supplier.persist();

            return new Response(supplier);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response update(String id, SupplierEntity supplier) {
        try {
            supplier.update();

            return new Response(supplier);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @DELETE
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response delete(String id) {
        try {
            SupplierEntity supplier = SupplierEntity.findById(new ObjectId(id));

            if(supplier == null) {
                throw new NotFoundException();
            }

            supplier.delete();

            return new Response(supplier);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
