package com.mes.bf.rsc.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Controller
@RequestMapping("/rsc")
public class RscInController {
	
	@Autowired RscInService rscInService;
	
	//입고
	@RequestMapping("/in")
	public void in(Model model) {
		List<RscInspVO> inspCompList = rscInService.inspCompList(null, null);
		model.addAttribute("inspCompList",inspCompList);
	}
	
	//입고테이블 replace
	@RequestMapping(value ="/inTable", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String inTable(@RequestParam Map<String, String> QueryParameters, Model model) {
		List<RscInspVO> inspCompList = rscInService.inspCompList(QueryParameters.get("rscCdCode"),QueryParameters.get("rscInspDate"));
		model.addAttribute("inspCompList",inspCompList);
		return "rsc/table/inTable";
	}
	
	@RequestMapping(value = "/inInsert", method = RequestMethod.POST)
	@ResponseBody
	public String inInsert(@RequestBody List<RscInspVO> itemList) {
		System.out.println(itemList);
		for(RscInspVO insp:itemList) {
			rscInService.inInsert(insp);
			}
		return "rsc/in";
	}
	
	
	//입고 전체조회
	@RequestMapping("/inList")
	public void inList(Model model) {
		List<RscInVO> inList = rscInService.inList();
		model.addAttribute("inList",inList);
	}

}
