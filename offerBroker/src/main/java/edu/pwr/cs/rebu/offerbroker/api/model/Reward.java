package edu.pwr.cs.rebu.offerbroker.api.model;

import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

@Data
public class Reward {
    private String description;
    @Min(0)
    private int value;
    @NotBlank
    private String unit;
}
