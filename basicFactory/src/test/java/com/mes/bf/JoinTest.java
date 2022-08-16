package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.InstManageService;
import com.mes.bf.prod.vo.FindEmpVO;

@SpringBootTest
public class JoinTest {

	
	@Autowired InstManageService service;
	
	
	//@Test
	void findEmp() {
		
		List<FindEmpVO> list = service.findEmp();
		
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
		
	}
	
	@Test
	void findEmpName() {
		
	System.out.println(service.findEmpName("defty"));
	}
	
	
	
	
}
