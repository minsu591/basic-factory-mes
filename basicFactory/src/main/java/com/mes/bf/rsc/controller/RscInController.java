package com.mes.bf.rsc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;

@Controller
@RequestMapping("/rsc")
public class RscInController {
	
	@Autowired RscInService rscInService;
	
	//입고
	@RequestMapping("/in")
	public ModelAndView in() {
		return new ModelAndView("rsc/in");
	}

	@RequestMapping("/inList")
	public void inList(Model model) {
		List<RscInVO> inList = rscInService.inList();
		model.addAttribute("inList",inList);
	}
}
