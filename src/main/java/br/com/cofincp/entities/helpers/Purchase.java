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
    public NumberValue value;
    public NumberValue discount_value;
    public NumberValue discount_percentage;
    @Positive(message = "Quantidade não pode ser negativo ou zero")
    public int quantity;
}
