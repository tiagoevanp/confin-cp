package br.com.cofincp.entities.helpers;

import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Purchase {
    public Date date;
    public int value;
    public int discount_value;
    public int discount_percentage;
    public int quantity;
}
