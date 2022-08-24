package com.mes.bf.rsc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.rsc.service.RscOutService;
import com.mes.bf.rsc.vo.RscOutVO;

@Controller
@RequestMapping("/rsc")
public class RscOutController {
	
	@Autowired RscOutService rscOutService;

	//출고
	@RequestMapping("/out")
	public ModelAndView out() {
		return new ModelAndView("rsc/out");
	}
	
	@RequestMapping("/outList")
	public void outList(Model model) {
		List<RscOutVO> nList = rscOutService.normalOutList();
		List<RscOutVO> eList = rscOutService.exceptOutList();
		model.addAttribute("nList", nList);
		model.addAttribute("eList", eList);
	}
}
