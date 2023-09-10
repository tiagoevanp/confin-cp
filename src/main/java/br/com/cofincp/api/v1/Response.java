package br.com.cofincp.api.v1;

public class Response {
    public Boolean success;
    public String message;
    public Object payload;

    public Response(String message) {
        this.success = false;
        this.message = message;
    }

    public Response(Object payload) {
        this.success = true;
        this.payload = payload;
    }
}
