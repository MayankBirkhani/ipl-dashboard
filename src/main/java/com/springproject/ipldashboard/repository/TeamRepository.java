package com.springproject.ipldashboard.repository;

import com.springproject.ipldashboard.model.Team;

import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository <Team, Long> {
    //Declaring a method to get team record using JPA   
    Team findByTeamName(String teamName);

}
