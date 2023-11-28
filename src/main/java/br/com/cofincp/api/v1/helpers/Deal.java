package br.com.cofincp.api.v1.helpers;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.util.Locale;
import br.com.cofincp.api.v1.BusinessConf;
import br.com.cofincp.api.v1.Supply;
import br.com.cofincp.entities.BusinessConfEntity;
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

    public Deal(ProductEntity product, BusinessConf businessConfRestClient, Supply supplyRestClient) {
        this.id = product.id;
        this.name = product.getName();
        this.supplier_id = product.getSupplier_id();
        this.profit_percentage = product.getProfit_percentage();
        this.quantity = product.getPurchase().quantity;

        DecimalFormat df = new DecimalFormat("#.00", new DecimalFormatSymbols(Locale.US));

        String cost = df.format(
                Double.parseDouble(product.getPurchase().value.integer + "." + product.getPurchase().value.decimal)
                        / product.getPurchase().quantity);

        String[] costArr = cost.split("\\.");

        int costInteger = Integer.parseInt(costArr[0]);
        int costDecimal = Integer.parseInt(costArr[1]);

        this.cost.setInteger(costInteger);
        this.cost.setDecimal(costDecimal);
        this.cost.setType(product.getPurchase().value.type);

        double profitPercentage = Double.parseDouble(
                product.getProfit_percentage().integer + "." + product.getProfit_percentage().decimal) / 100;

        double salePrice = Double.parseDouble(cost) * profitPercentage;

        BusinessConfEntity creditCardFeeConf = (BusinessConfEntity) businessConfRestClient
                .read("credit_card_fee")
                .getPayload();
        double creditCardFee = 0;

        if (creditCardFeeConf.value.decimal != 0) {
            creditCardFee = salePrice * Double.parseDouble(
                    creditCardFeeConf.value.integer + "." + creditCardFeeConf.value.decimal) / 100;
        } else {
            creditCardFee = salePrice * Double.parseDouble(creditCardFeeConf.value.integer + "") / 100;
        }

        double price = salePrice + creditCardFee;

        String[] priceArr = df.format(price).split("\\.");

        int priceInteger = Integer.parseInt(priceArr[0]);
        int priceDecimal = Integer.parseInt(priceArr[1]);

        this.price.setInteger(priceInteger);
        this.price.setDecimal(priceDecimal);
        this.price.setType(product.getPurchase().value.type);
    }
}
