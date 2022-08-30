package com.mes.bf.rsc.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
		List<RscInspVO> inspList = rscInspService.inspList(null, null, null, null);
		model.addAttribute("inspList",inspList);
	}
	
	@RequestMapping(value = "/inspListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String inspListTable(@RequestParam Map<String, String> QueryParameters, Model model) {
		System.out.println(QueryParameters.get("rscCdCode"));
		List<RscInspVO> inspList = rscInspService.inspList(QueryParameters.get("rscInspCode"), QueryParameters.get("rscCdCode"), 
													QueryParameters.get("rscInspSDate"), QueryParameters.get("rscInspEDate"));
		model.addAttribute("inspList",inspList);
		return "rsc/table/inspListTable";
	}
}
