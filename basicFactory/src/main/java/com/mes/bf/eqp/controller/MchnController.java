package com.mes.bf.eqp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.eqp.service.MchnService;
import com.mes.bf.eqp.vo.MchnVO;

@Controller
@RequestMapping("/eqp")
public class MchnController {
	
	@Autowired MchnService service;
	
	//설비 조회
	@GetMapping("/mchnAllList")
	public List<MchnVO> MchnAllList() {
		List<MchnVO> list = service.MchnAllList();
		return list;
	}
	
	

}
