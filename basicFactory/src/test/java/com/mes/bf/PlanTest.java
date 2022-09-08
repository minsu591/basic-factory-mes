package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SlsOrdPlanVO;

@SpringBootTest
public class PlanTest {
	@Autowired PlanService service;
	@Autowired SlsOrdService ordService;
	
	//@Test
	void findPlan() {
		List<PlanHdVO> plans = service.findPlanInst("2022-08-11","2022-08-19",null);
		List<ColPlanOrdVO> plans2 = service.findPlanOrd("2022-08-11","2022-08-19","VEND001");
		System.out.println(plans);
		System.out.println(plans2);
	}
}
