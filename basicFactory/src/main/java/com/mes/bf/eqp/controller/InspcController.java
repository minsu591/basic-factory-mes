package com.mes.bf.eqp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.eqp.service.InspcService;
import com.mes.bf.eqp.vo.InspcVO;

@Controller
@RequestMapping("/eqp")
public class InspcController {
	
	@Autowired InspcService service;
	
	
	
	//점검조회
	@RequestMapping("/inspcList")
	public String MchnListPage(Model model) {
		List<InspcVO> inspcs = service.listInspc();
		model.addAttribute("inspcs", inspcs);
		System.out.println(inspcs);
		return "eqp/InspcList";
	}
	//점검상세조회
	@GetMapping(value="/inspcList/find", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String MchnListFindPage(@RequestParam Map<String, String> QueryParameters, Model model) {
		List<InspcVO> inspcs = service.findListInspc(QueryParameters.get("sdate"), QueryParameters.get("edate"), QueryParameters.get("mchnCode"));
		model.addAttribute("inspcs", inspcs);
		return "eqp/ChangeInspcListTable";
	}

}
