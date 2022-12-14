package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.eqp.service.NonOperationService;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.service.MonitoringService;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessVO;

@SpringBootTest
public class JoinTest {

	
	@Autowired MonitoringService monitorservice;
	@Autowired InstructionService service2;
	@Autowired ProcService service3;
	@Autowired NonOperationService service;

	
	//@Test
	void findNonOp() {
		System.out.println(service.findNonOp("aaa", null));
	}
	
	//@Test
	void findProduct() {
		String prdCdCode = "FIN1";
		System.out.println(service2.findProduct(prdCdCode,""));
	}
	
	//@Test
//	void findVinst() {
//		System.out.println(service2.findVInstruction(null,null,null,null));
//	}
	
	//@Test
	void findinputno() {
		System.out.println(service.findInputNo());
	}
	
	//@Test
//	void findMchn() {
//		System.out.println(service.findMchn("유탕"));
//	}


	//@Test
	void findMchn() {
		System.out.println(service3.findMchn("MCHN001", null));
	}
	
//	//@Test
//	void findProcStatus() {
//		System.out.println(service2.findProcStatus("1라인"));
//	}
//
//	//@Test
//	void insertProc() {
//		service2.insertProc("FIN001");
//	}
	
	//@Test
	void updateNeedQTY() {
		service2.updateNeedQty("300", "RSC0022");
	}
	
	//@Test
	void findMonitor() {
		
		System.out.println(monitorservice.findMonitoring("2022-08-11"));
	}
//	@Test
//	void processVOUpdate() {
//		ProcessVO vo = new ProcessVO();
//		vo.setProcessNo(84);
//		service3.updateProcCheck(null);
//	}
	
	
	
}
