package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.service.SlsOutService;
import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.service.SlsStockService;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsStockVO;

@SpringBootTest
public class SlsTest {
	
	@Autowired SlsOrdService service;
	@Autowired SlsOutService outService;
	@Autowired SlsRtnService rtnService;
	@Autowired SlsStockService stockService;
	
	
	//@Test
	void findAllOrd() {
		List<SlsOrdHdDtlVO> list1 = service.findAllOrder();
		for(int i = 0; i < list1.size(); i++) {
			System.out.println(list1.get(i).toString());
		}
	}

	//@Test
	void findOrder() {
		List<SlsOrdHdDtlVO> list1 = service.findOrder("2022-08-18","2022-08-18","예담");
		for(int i = 0; i < list1.size(); i++) {
			System.out.println(list1.get(i).toString());
		}
	}
	
	//@Test
	void findAllOut() {
		List<SlsOutHdDtlVO> list = outService.findAllOut();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
	
	@Test
	void findOut() {
		List<SlsOutHdDtlVO> list = outService.findOut("2022-08-24", "2022-08-24", "예담");
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
	
	//@Test
	void findAllStock() {
		List<SlsStockVO> list = stockService.findAllStock();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
	
	//@Test
	void findStock() {
		List<SlsStockVO> list = stockService.findStock("", "SLS_LOT002");
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}	
	}
	
	//@Test
	void findAllReturn() {
		List<SlsRtnHdDtlVO> list = rtnService.findAllReturn();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
	
	//@Test
	void findReturn() {
		List<SlsRtnHdDtlVO> list = rtnService.findReturn("2022-08-24", "2022-08-24", "2", "예담");
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
	
}