package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.ProductEntity;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/product")
public class Product implements ICrud<ProductEntity>{

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<ProductEntity> products = ProductEntity.listAll();

            return new Response(products);
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
            ProductEntity product = ProductEntity.findById(new ObjectId(id));

            if(product == null) {
                throw new NotFoundException();
            }

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(ProductEntity product) {
        try {
            product.persist();

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, ProductEntity product) {
        try {
            product.update();

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response delete(@PathParam("id") String id) {
        try {
            ProductEntity product = ProductEntity.findById(new ObjectId(id));

            if(product == null) {
                throw new NotFoundException();
            }

            product.delete();

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
