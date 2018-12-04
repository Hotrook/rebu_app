package edu.pwr.cs.rebu.offerbroker.model;

import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface TaskOfferRepository extends CrudRepository<TaskOffer, UUID> {

}
