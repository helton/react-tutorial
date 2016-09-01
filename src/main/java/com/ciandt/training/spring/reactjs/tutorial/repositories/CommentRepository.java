package com.ciandt.training.spring.reactjs.tutorial.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ciandt.training.spring.reactjs.tutorial.entities.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
