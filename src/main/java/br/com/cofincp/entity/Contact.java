package br.com.cofincp.entity;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Contact {
    public List<String> phone_number;
    public List<String> email;
}
