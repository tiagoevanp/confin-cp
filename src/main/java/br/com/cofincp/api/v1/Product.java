package br.com.cofincp.api.v1;

import java.util.ArrayList;
import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.Deal;
import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.ProductEntity;
import br.com.cofincp.entities.projections.Profit;
import br.com.cofincp.enums.RestMethods;
import br.com.cofincp.services.LogsService;
import br.com.cofincp.services.ProductService;
import io.quarkus.logging.Log;
import io.quarkus.panache.common.Sort;
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

@Path("api/v1/product")
public class Product extends LogsService implements ICrud<ProductEntity> {

    @Inject
    ProductService productService;

    @Inject
    BusinessConf businessConfRestClient;

    @Inject
    Supply supplyRestClient;

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
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/deal")
    public Response deal() {
        try {
            List<ProductEntity> products = ProductEntity.listAll();
            List<Deal> deals = new ArrayList<>();

            for (ProductEntity product : products) {
                Deal deal = new Deal(product, businessConfRestClient, supplyRestClient);

                deals.add(deal);
            }

            return new Response(deals);
        } catch (Exception e) {
            Log.error(e.getMessage());
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

            if (product == null) {
                throw new NotFoundException();
            }

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/profit")
    public Response profit() {
        try {
            List<Profit> products = ProductEntity.findAll(Sort.by("profit_percentage").and("name"))
                    .project(Profit.class).list();

            return new Response(products);
        } catch (Exception e) {
            Log.error(e.getMessage());
            return new Response(e.getMessage());
        }
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response create(ProductEntity product) {
        try {
            productService.validate(product);

            product.persist();

            setLog(product.id.toString(), RestMethods.POST);

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @PUT
    @Path("/{id}")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response update(@PathParam("id") String id, ProductEntity product) {
        try {
            productService.validate(product);

            product.update();

            setLog(product.id.toString(), RestMethods.PUT);

            return new Response(product);
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
            ProductEntity product = ProductEntity.findById(new ObjectId(id));

            if (product == null) {
                throw new NotFoundException();
            }

            product.delete();

            setLog(product.id.toString(), RestMethods.DELETE);

            return new Response(product);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
