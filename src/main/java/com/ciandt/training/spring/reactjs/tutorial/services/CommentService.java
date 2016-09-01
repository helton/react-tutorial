package com.ciandt.training.spring.reactjs.tutorial.services;

import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ciandt.training.spring.reactjs.tutorial.entities.Comment;
import com.ciandt.training.spring.reactjs.tutorial.repositories.CommentRepository;

@Service
public class CommentService {

	@Autowired
	private CommentRepository repository;
	
	@PostConstruct
	@Transactional
	public void populate() {
    	add("Pete Hunt", "Hey there!");
    	add("Paul O’Shannessy", "React is *great*!");    			
	}
	
	
	@Transactional
	public void add(String author, String text) {
		Comment comment = new Comment(null, author, text);
		repository.save(comment);
	}
	
	@Transactional(readOnly=true)
	public List<Comment> getAll() {
		return repository.findAll();
	}
	
}
