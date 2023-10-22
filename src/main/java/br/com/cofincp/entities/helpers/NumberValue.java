package br.com.cofincp.entities.helpers;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NumberValue {
    @NotBlank(message = "Tipo não pode ser vazio")
    public String type;
    @PositiveOrZero(message = "Inteiro não pode ser negativo")
    public int integer;
    @PositiveOrZero(message = "Decimal não pode ser negativo")
    public int decimal;
}
