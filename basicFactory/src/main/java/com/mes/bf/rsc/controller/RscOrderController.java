package com.mes.bf.rsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/rsc")
public class RscOrderController {

	//발주
	@RequestMapping("/order")
	public String order(Model model) {
		return "rsc/order";
	}
	
	@RequestMapping("/orderList")
	public void orderList() {
	}
}
