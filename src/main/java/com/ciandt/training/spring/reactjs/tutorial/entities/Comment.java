package com.ciandt.training.spring.reactjs.tutorial.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Comment {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;
    private String author;
    private String text;

	public Comment() {    	
    }
    
    public Comment(Long id, String author, String content) {
        this.id = id;
        this.author = author;
        this.text = content;
    }

    public Long getId() {
        return id;
    }

    public String getAuthor() {
        return author;
    }
    
    public String getText() {
        return text;
    }
    
    public void setId(Long id) {
		this.id = id;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public void setText(String text) {
		this.text = text;
	}

}