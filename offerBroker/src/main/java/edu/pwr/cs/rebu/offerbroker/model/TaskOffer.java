package edu.pwr.cs.rebu.offerbroker.model;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.geolatte.geom.Point;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.util.UUID;

@Data
@Entity
@NoArgsConstructor
public class TaskOffer {
    @Id
    @GeneratedValue
    private UUID id;

    @NotEmpty
    @Size(min=3)
    private String title;

    @NotEmpty
    private String description;

    @ManyToOne
    @JoinColumn(name = "posted_by")
    private User postedBy;

    @ManyToOne
    @JoinColumn(name = "claimed_by")
    private User claimedBy;

    Point location;

    @Builder
    public TaskOffer(String title, String description, User postedBy, Point location) {
        this.title = title;
        this.description = description;
        this.postedBy = postedBy;
        this.location = location;
    }
}
