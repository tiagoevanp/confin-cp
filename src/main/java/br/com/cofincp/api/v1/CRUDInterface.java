package br.com.cofincp.api.v1;

public interface CRUDInterface<T> {
    public Response all();
    public Response read(String id);
    public Response create(T object);
    public Response update(String id, T object);
    public Response delete(String id);
}
