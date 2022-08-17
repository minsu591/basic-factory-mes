package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.InstManageService;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;

@SpringBootTest
public class JoinTest {

	
	@Autowired InstManageService service;
	@Autowired InstructionService service2;
	
	//@Test
	void findEmp() {
		
		List<FindEmpVO> list = service.findEmp();
		
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
		
	}
	
	//@Test
	void findEmpName() {
		
	System.out.println(service.findEmpName("defty"));
	}
	
	//@Test
	void findAllProduct() {
		System.out.println(service2.findAllProduct());
	}
	
	//@Test
	void findProduct() {
		String prdCdCode = "FIN1";
		System.out.println(service2.findProduct(prdCdCode,""));
	}
	
	@Test
	void findProdName() {
		String prodCode = "FIN1";
		System.out.println(service.findProdName(prodCode));
	}
	
}
