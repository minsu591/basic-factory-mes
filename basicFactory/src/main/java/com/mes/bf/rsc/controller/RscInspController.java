package com.mes.bf.rsc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/rsc")
public class RscInspController {

	//검사
	@RequestMapping("/insp")
	public ModelAndView insp() {
		return new ModelAndView("rsc/insp");
	}
	
	@RequestMapping("/inspList")
	public ModelAndView inspList() {
		return new ModelAndView("rsc/inspList");
	}
}
