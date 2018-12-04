package edu.pwr.cs.rebu.offerbroker.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.util.UUID;

@Entity
@Table(name="user_account")
public class User {

    @Id
    @GeneratedValue
    private UUID id;

    private String name;

    private String email;

    private String phone;

    private String password;
}
