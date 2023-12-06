package br.com.cofincp.api.v1.helpers;

import br.com.cofincp.entities.BusinessConfEntity;
import br.com.cofincp.entities.ProductEntity;

public class DealJson extends ProductEntity {
    public BusinessConfEntity credit_card_fee;

    public DealJson(ProductEntity product, BusinessConfEntity credit_card_fee) {
        this.id = product.id;
        this.name = product.name;
        this.supplier_id = product.supplier_id;
        this.profit_percentage = product.profit_percentage;
        this.purchase = product.purchase;

        this.credit_card_fee = credit_card_fee;
    }
}
