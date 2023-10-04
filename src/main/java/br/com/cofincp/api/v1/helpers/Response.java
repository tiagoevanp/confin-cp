package br.com.cofincp.api.v1.helpers;

import java.util.Set;
import java.util.stream.Collectors;

import jakarta.validation.ConstraintViolation;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {
    private Boolean success;
    private String message;
    private Object payload;

    public Response(String message) {
        this.success = false;
        this.message = message;
    }

    public Response(Set<? extends ConstraintViolation<?>> violations) {
        this.success = false;
        this.message = violations.stream()
                .map(cv -> cv.getMessage())
                .collect(Collectors.joining(", "));
    }

    public Response(Object payload) {
        this.success = true;
        this.payload = payload;
    }
}
