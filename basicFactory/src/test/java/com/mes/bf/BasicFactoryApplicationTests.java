package com.mes.bf;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.InstructionService;

@SpringBootTest
class BasicFactoryApplicationTests {

	 InstructionService service;
	
	
	@Test
	void contextLoads() {
		
		System.out.println(service.getInst());
	}
	
	

}
