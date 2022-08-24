package com.mes.bf.rsc.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.rsc.service.RscInspService;
import com.mes.bf.rsc.vo.RscInspVO;

@Controller
@RequestMapping("/rsc")
public class RscInspController {
	
	@Autowired RscInspService rscInspService;

	//검사
	@RequestMapping("/insp")
	public ModelAndView insp() {
		return new ModelAndView("rsc/insp");
	}
	
	@RequestMapping("/inspList")
	public void inspList(Model model) {
		List<RscInspVO> inspList = rscInspService.inspList();
		model.addAttribute("inspList",inspList);
	}
}
