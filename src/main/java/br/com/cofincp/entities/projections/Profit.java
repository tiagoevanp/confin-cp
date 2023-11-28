package br.com.cofincp.entities.projections;

import br.com.cofincp.entities.ProductEntity;
import br.com.cofincp.entities.helpers.NumberValue;
import io.quarkus.mongodb.panache.common.ProjectionFor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ProjectionFor(ProductEntity.class)
public class Profit {
    public String name;
    public NumberValue profit_percentage;
}