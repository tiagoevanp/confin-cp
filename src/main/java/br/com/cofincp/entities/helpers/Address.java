package br.com.cofincp.entities.helpers;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
    private String street;
    private int number;
    private String zip_code;
}
