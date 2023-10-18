package br.com.cofincp.api.v1.helpers;

import java.util.List;

public interface ISetting<T> {
    public Response all();

    public Response read(String id);

    public Response update(List<T> object);
}
