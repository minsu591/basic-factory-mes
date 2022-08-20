package com.mes.bf;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SalesOrderHistoryVO;

@SpringBootTest
public class SlsTest {

	@Autowired SlsOrdService service;
	
	@Test
	void finAllOrder() {
		List<SalesOrderHistoryVO> list = service.findAllOrder();
		
		for(int i = 0; i < list.size(); i++) {
			System.out.println(list.get(i).toString());
		}
	}
}
