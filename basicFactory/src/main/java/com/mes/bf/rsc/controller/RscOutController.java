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
		List<RscOutVO> nList = rscOutService.normalOutList(null, null, null, null);
		List<RscOutVO> eList = rscOutService.exceptOutList(null, null, null, null);
		model.addAttribute("nList", nList);
		model.addAttribute("eList", eList);
	}
	
	@RequestMapping(value = "/outListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String outTableList(@RequestParam Map<String, String> QueryParameters, Model model) {
		System.out.println("진입확인");
		List<RscOutVO> nList = rscOutService.normalOutList(QueryParameters.get("rscOutCode"), QueryParameters.get("rscCdCode"), 
														QueryParameters.get("rscOutSDate"), QueryParameters.get("rscOutEDate"));
		List<RscOutVO> eList = rscOutService.exceptOutList(QueryParameters.get("rscOutCode"), QueryParameters.get("rscCdCode"), 
														QueryParameters.get("rscOutSDate"), QueryParameters.get("rscOutEDate"));
		model.addAttribute("nList", nList);
		model.addAttribute("eList", eList);
		return "rsc/table/OutListTable";
	}
}
