package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.EmpTestService;
import com.mes.bf.prod.vo.FindEmpVO;

@SpringBootTest
class BasicFactoryApplicationTests {

	
	@Autowired EmpTestService service;
	@Test
	void contextLoads() {
		List<FindEmpVO> list = service.findAll();
		
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i));
		}
	}
	
	

}
