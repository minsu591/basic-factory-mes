package com.mes.bf.eqp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
public class NonOperationController {

	//비가동조회페이지 이동
	@RequestMapping("/nonOperation")
	public ModelAndView nonOperation() {
		ModelAndView mav = new ModelAndView("eqp/NonOperation");
		return mav;
	}
	//비가동관리페이지 이동
	@RequestMapping("/nonOperationManage")
	public ModelAndView nonOperationManage() {
		ModelAndView mav = new ModelAndView("eqp/NonOperationManage");
		return mav;
	}
	
	
}
