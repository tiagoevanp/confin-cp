package br.com.cofincp.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Address {
    private String street;
    private int number;
    private String zip_code;
}
