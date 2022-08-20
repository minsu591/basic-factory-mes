package com.mes.bf.rsc.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class RscController {
	
	//발주
	@RequestMapping("/rsc/order")
	public ModelAndView order() {
		return new ModelAndView("rsc/order");
	}
	
	@RequestMapping("/rsc/orderList")
	public ModelAndView orderList() {
		return new ModelAndView("rsc/orderList");
	}
	
	//검사
	@RequestMapping("/rsc/insp")
	public ModelAndView insp() {
		return new ModelAndView("rsc/insp");
	}
	
	@RequestMapping("/rsc/inspList")
	public ModelAndView inspList() {
		return new ModelAndView("rsc/inspList");
	}

	//입고
	@RequestMapping("/rsc/in")
	public ModelAndView in() {
		return new ModelAndView("rsc/in");
	}
	
	@RequestMapping("/rsc/inList")
	public ModelAndView inList() {
		return new ModelAndView("rsc/inList");
	}
	
	//출고
	@RequestMapping("/rsc/out")
	public ModelAndView out() {
		return new ModelAndView("rsc/out");
	}
	
	@RequestMapping("/rsc/outList")
	public ModelAndView outList() {
		return new ModelAndView("rsc/outList");
	}
	
	//반품
	@RequestMapping("/rsc/return")
	public ModelAndView returnPage() {
		return new ModelAndView("rsc/return");
	}
	
	@RequestMapping("/rsc/returnList")
	public ModelAndView returnList() {
		return new ModelAndView("rsc/returnList");
	}
	
	//재고
	@RequestMapping("/rsc/stockList")
	public ModelAndView stockList() {
		return new ModelAndView("rsc/stockList");
	}
}
