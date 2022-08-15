package com.mes.bf.prod.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.prod.service.InstructionService;

@RestController
public class InstructionController {

	
	@Autowired
	//private InstructionService service;
	
	//생산 지시 조회페이지 이동
	@RequestMapping("/inst")
	public ModelAndView inst() {
		ModelAndView mav = new ModelAndView("prod/Instruction");
		return mav;
	}
	//생산 지시 관리페이지 이동
	@RequestMapping("/instmanagement")
	public ModelAndView instma() {
		ModelAndView mav = new ModelAndView("prod/InstManage");
		return mav;
	}
	
	
	
	//모달테스이동
		@RequestMapping("/modal")
		public ModelAndView modal() {
			ModelAndView mav = new ModelAndView("prod/modaltest");
			return mav;
		}
	
	
	
}
