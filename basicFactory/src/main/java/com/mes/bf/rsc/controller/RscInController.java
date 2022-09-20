package com.mes.bf.rsc.controller;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.mes.bf.common.Criteria;
import com.mes.bf.common.PageDTO;
import com.mes.bf.rsc.service.RscInService;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Controller
@RequestMapping("/rsc")
public class RscInController {
	
	@Autowired RscInService rscInService;
	
	//입고
	@RequestMapping("/in")
	public void in(Model model, @ModelAttribute("cri") Criteria cri) {
		System.out.println(cri);
		int total = rscInService.inspCompListCount(cri);
		cri.setAmount(10);
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		model.addAttribute("inspCompList", rscInService.inspCompList(cri));
		System.out.println(rscInService.inspCompList(cri));
	}
	
	//입고테이블 replace
//	@RequestMapping(value ="/inTable", produces = { MediaType.APPLICATION_JSON_VALUE })
//	public String inTable(@RequestParam Map<String, String> QueryParameters, Model model) {
//		List<RscInspVO> inspCompList = rscInService.inspCompList(QueryParameters.get("rscCdCode"),QueryParameters.get("rscInspDate"));
//		System.out.println(QueryParameters.get("rscInspDate"));
//		model.addAttribute("inspCompList",inspCompList);
//		return "rsc/table/inTable";
//	}
	
	@RequestMapping(value = "/inInsert", method = RequestMethod.POST)
	@ResponseBody
	public String inInsert(@RequestBody List<RscInspVO> list) {
		for(RscInspVO insp:list) {
			rscInService.inInsert(insp);
			}
		return "rsc/in";
	}
	
	
	//입고 전체조회
	@RequestMapping("/inList")
	public void inList(Model model, @ModelAttribute("cri") Criteria cri) {
		int total = rscInService.inListCount(cri);
		cri.setAmount(10); // 한페이지당 10개씩 설정
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		model.addAttribute("inList", rscInService.inList(cri));
	}
	
//	@RequestMapping(value = "/inListTable", produces = { MediaType.APPLICATION_JSON_VALUE })
//	public String inListTable(@ModelAttribute("cri") Criteria cri, Model model) {
//		int total = rscInService.inListCount(cri);
//		cri.setAmount(10); // 한페이지당 10개씩 설정
//		PageDTO page = new PageDTO(cri, total);
//		model.addAttribute("pageMaker", page);
//		model.addAttribute("inList", rscInService.inList(cri));
//		return "rsc/table/inListTable";
//	}

}
