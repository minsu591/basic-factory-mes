package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanVO;

@SpringBootTest
public class PlanTest {
	@Autowired PlanService service;
	
	@Test
	void findPlan() {
		List<ColPlanVO> plans = service.findPlan("notDone","2022-08-15","2022-08-15");
		System.out.println(plans);
	}
}
