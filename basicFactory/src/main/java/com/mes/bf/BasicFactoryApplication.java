package com.mes.bf;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.common.Criteria;
import com.mes.bf.common.PageDTO;
import com.mes.bf.common.service.CommonService;

@RestController
@SpringBootApplication
public class BasicFactoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicFactoryApplication.class, args);
	}
	
	@Autowired
	CommonService service;
	@RequestMapping("/")
	String home() {
		//master
		return "Hello World!";
	}
	
	@RequestMapping("/test")
	String test() {
		return "future test";
	}
	

}
