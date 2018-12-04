package edu.pwr.cs.rebu.offerbroker.api.model;

import lombok.Builder;
import lombok.Value;
import org.geolatte.geom.Point;

@Builder
@Value
public class TaskOfferDetails {
    String title;
    String description;
    Point location;
}
