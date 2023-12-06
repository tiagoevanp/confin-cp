package br.com.cofincp.api.v1.helpers;

import br.com.cofincp.entities.ProductEntity;
import br.com.cofincp.entities.helpers.NumberValue;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Deal extends ProductEntity {
    private NumberValue cost = new NumberValue();
    private NumberValue price = new NumberValue();
    private int quantity;
}
