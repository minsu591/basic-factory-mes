package com.mes.bf.rsc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.rsc.service.RscReturnService;
import com.mes.bf.rsc.vo.RscReturnVO;

@Controller
@RequestMapping("/rsc")
public class RscReturnController {
	
	@Autowired RscReturnService rscReturnService;

	//반품
	@RequestMapping("/return")
	public ModelAndView returnPage() {
		return new ModelAndView("rsc/return");
	}
	
	@RequestMapping("/returnList")
	public String returnList(Model model) {
		List<RscReturnVO> rList = rscReturnService.returnList();
		System.out.println(rList);
		model.addAttribute("rList", rList);
		return "rsc/returnList";
	}
}
