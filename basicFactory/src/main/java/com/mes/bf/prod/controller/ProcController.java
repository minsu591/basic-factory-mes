package com.mes.bf.prod.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/prod")
public class ProcController {

	//공정실적 조회페이지 이동
	@RequestMapping("/proc")
	public ModelAndView proc() {
		ModelAndView mav = new ModelAndView("prod/Proc");
		return mav;
	}
	
	//공정실적 관리페이지 이동
	@RequestMapping("/procManage")
	public ModelAndView procManage() {
		ModelAndView mav = new ModelAndView("prod/ProcManage");
		return mav;
	}
	
	//공정모니터링 페이지 이동
	@RequestMapping("/monitoring")
	public ModelAndView monitoring() {
		ModelAndView mav = new ModelAndView("prod/Monitoring");
		return mav;
	}
	
	//포장관리 페이지 이동
	@RequestMapping("/packing")
	public ModelAndView packing() {
		ModelAndView mav = new ModelAndView("prod/PackingManage");
		return mav;
	}
	
	
	
	
}
