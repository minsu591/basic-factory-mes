package com.mes.bf.sales.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SalesOrderHistoryVO;

@RestController
@RequestMapping("/sls")
public class SlsOrdController {
	@Autowired
	private SlsOrdService service;
	
	// 주문조회 페이지 이동
//	@RequestMapping("/ord")
//	public ModelAndView ord() {
//		ModelAndView mav = new ModelAndView("sales/order");
//		return mav;
//	}
	@RequestMapping("/ord")
	public ModelAndView ord() {
		List<SalesOrderHistoryVO> list = service.findAllOrder();
		ModelAndView mav = new ModelAndView("sales/order");
		mav.addObject("ordList", list);
		return mav;
	}
}
