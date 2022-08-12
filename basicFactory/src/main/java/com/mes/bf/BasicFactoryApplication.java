package com.mes.bf;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class BasicFactoryApplication {

	public static void main(String[] args) {
		SpringApplication.run(BasicFactoryApplication.class, args);
	}
	
	@RequestMapping("/")
	String home() {
		//하잉
		return "Hello World!";
	}

}
