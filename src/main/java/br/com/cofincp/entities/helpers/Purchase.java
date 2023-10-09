package br.com.cofincp.entities.helpers;

import java.util.Date;

import br.com.cofincp.validators.ICheckDateFormat;
import io.smallrye.common.constraint.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Purchase {
    @NotNull
    @ICheckDateFormat(pattern = "yyyy-MM-dd", message = "Data inválida")
    public Date date;
    @NotNull
    @Positive(message = "Valor não pode ser negativo, zero ou nulo")
    public int value;
    @Positive(message = "Valor de desconto não pode ser negativo ou zero")
    public int discount_value;
    @Positive(message = "Porcentagem de desconto não pode ser negativo ou zero")
    public int discount_percentage;
    @Positive(message = "Quantidade não pode ser negativo ou zero")
    public int quantity;
}
