package edu.pwr.cs.rebu.offerbroker.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import org.geolatte.geom.G2D;
import org.geolatte.geom.Point;
import org.geolatte.geom.crs.CoordinateReferenceSystems;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class NewTaskOffer {

    @NotBlank
    @Size(min = 3)
    private String title;

    @NotBlank
    private String description;

    @NotNull
    @Valid
    private Reward reward;

    @NotNull
    private Point location;

    @JsonProperty
    public void setLocation(org.springframework.data.geo.Point basicPoint) {
        this.location = new Point<>(new G2D(basicPoint.getX(), basicPoint.getY()), CoordinateReferenceSystems.WGS84);
    }
}
