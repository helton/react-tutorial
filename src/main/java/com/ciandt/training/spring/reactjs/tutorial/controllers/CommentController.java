package com.ciandt.training.spring.reactjs.tutorial.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ciandt.training.spring.reactjs.tutorial.entities.Comment;
import com.ciandt.training.spring.reactjs.tutorial.services.CommentService;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

	@Autowired
	private CommentService service;
	
    @RequestMapping(value="/get-all", method=RequestMethod.GET)
	public List<Comment> getComments() {
    	return service.getAll();
	}
    
    @RequestMapping(value="/add", method=RequestMethod.POST)
	public List<Comment> addComment(@RequestParam("author") String author, @RequestParam("text") String text) {
    	service.add(author, text);
    	return service.getAll();
	}
    
}
