package com.mes.bf.rsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/rsc")
public class RscOutController {

	//출고
	@RequestMapping("/out")
	public ModelAndView out() {
		return new ModelAndView("rsc/out");
	}
	
	@RequestMapping("/outList")
	public ModelAndView outList() {
		return new ModelAndView("rsc/outList");
	}
}
