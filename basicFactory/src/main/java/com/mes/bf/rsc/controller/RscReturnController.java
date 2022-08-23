package com.mes.bf.rsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/rsc")
public class RscReturnController {

	//반품
	@RequestMapping("/return")
	public ModelAndView returnPage() {
		return new ModelAndView("rsc/return");
	}
	
	@RequestMapping("/returnList")
	public ModelAndView returnList() {
		return new ModelAndView("rsc/returnList");
	}
}
