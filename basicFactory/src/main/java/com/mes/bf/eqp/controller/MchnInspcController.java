package com.mes.bf.eqp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.eqp.service.MchnInspcService;
import com.mes.bf.eqp.vo.MchnInspcVO;

@Controller
public class MchnInspcController {
	
	@Autowired MchnInspcService service;
	
	//설비 점검 조회
	@RequestMapping("/inspcList")
	public String MchnListPage(Model model) {
		List<MchnInspcVO> inspcs = service.listInspc();
		model.addAttribute("inspcs", inspcs);
		System.out.println(inspcs);
		return "eqp/InspcList";
	}

}
