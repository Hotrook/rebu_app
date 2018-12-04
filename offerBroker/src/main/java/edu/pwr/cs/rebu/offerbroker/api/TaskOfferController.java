package edu.pwr.cs.rebu.offerbroker.api;

import edu.pwr.cs.rebu.offerbroker.api.model.NewTaskOffer;
import edu.pwr.cs.rebu.offerbroker.api.model.TaskOfferDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class TaskOfferController {

    private final TaskOfferService taskOfferService;

    @Autowired
    public TaskOfferController(TaskOfferService taskOfferService) {
        this.taskOfferService = taskOfferService;
    }

    @GetMapping("/offer")
    public ResponseEntity<List<NewTaskOffer>> getOffers(@PageableDefault Pageable pageable) {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/offer")
    public ResponseEntity<TaskOfferDetails> placeOffer(@RequestBody @Valid NewTaskOffer offer) {
        return ResponseEntity.ok(taskOfferService.placeOffer(offer));
    }

    @GetMapping("/offer/{id}")
    public ResponseEntity<TaskOfferDetails> getOfferById(@PathVariable("id") String id) {
        return taskOfferService.getOfferDetails(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }



}
