package com.mes.bf.prod.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.service.FltyPrcsService;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FltyPrcsVO;

@Controller
@RequestMapping("/prod")
public class FltyPrcsController {
	
	@Autowired FltyPrcsService service;
	@Autowired InstructionService instService;
	
	//불량처리관리 페이지
	@RequestMapping("/fltyPrcsManage")
	public ModelAndView fltyPrcsManage() {
		ModelAndView mav = new ModelAndView("prod/FltyPrcsManage");
		return mav;
	}
	
	//불량처리관리 
	
	
	//불량코드조회
	//@GetMapping(value = "/findFltyCode", produces = { MediaType.APPLICATION_JSON_VALUE })
	//public ResponseEntity<List<FaultyCodeVO>> findFltyCode(@RequestParam Map<String, String> QueryParameters) {
	//	List<FaultyCodeVO> list = 
	//}
	
	//불량처리조회
	@RequestMapping("/fltyPrcs")
	public String fltyPrcsListPage(Model model) {
		List<FltyPrcsVO> fltyPrcs = service.listFltyPrcs();
		model.addAttribute("fltyPrcs", fltyPrcs);
		System.out.println(fltyPrcs);
		return "prod/FltyPrcs";
	}
	//불량처리상세조회
	@GetMapping(value = "/fltyPrcsList/find", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FltyPrcsVO>> fltyPrcsFindPage(@RequestParam Map<String, String> queryParameters) {
		List<FltyPrcsVO> list = service.findFltyPrcs(queryParameters.get("fltyPrcsSdate"), queryParameters.get("fltyPrcsEdate"), queryParameters.get("fltyCode"));
		return new ResponseEntity<List<FltyPrcsVO>>(list, HttpStatus.OK);
	}
	
}
