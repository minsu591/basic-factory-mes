package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.service.SlsStockService;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsStockVO;

@SpringBootTest
public class SlsTest {
	
	@Autowired SlsOrdService service;
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
	
	@Test
	void finAllStock() {
		List<SlsStockVO> list = stockService.findAllStock();
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
}