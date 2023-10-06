package br.com.cofincp.api.v1;

import java.util.List;

import org.bson.types.ObjectId;

import br.com.cofincp.api.v1.helpers.ICrud;
import br.com.cofincp.api.v1.helpers.Response;
import br.com.cofincp.entities.LogsEntity;
import io.quarkus.panache.common.Sort;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.NotFoundException;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("api/v1/logs")
public class Logs implements ICrud<LogsEntity> {

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Override
    public Response all() {
        try {
            List<LogsEntity> logs = LogsEntity.listAll(Sort.by("timestamp").descending());

            return new Response(logs);
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
            LogsEntity log = LogsEntity.findById(new ObjectId(id));

            if (log == null) {
                throw new NotFoundException();
            }

            return new Response(log);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response create(LogsEntity log) {
        try {
            log.persist();

            return new Response(log);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response update(@PathParam("id") String id, LogsEntity log) {
        try {
            log.update();

            return new Response(log);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }

    @Override
    public Response delete(@PathParam("id") String id) {
        try {
            LogsEntity log = LogsEntity.findById(new ObjectId(id));

            if (log == null) {
                throw new NotFoundException();
            }

            log.delete();

            return new Response(log);
        } catch (Exception e) {
            return new Response(e.getMessage());
        }
    }
}
