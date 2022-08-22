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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.ColPlanVO;

@Controller
@RequestMapping("/prod")
public class PlanController {
	@Autowired PlanService service;
	
	@RequestMapping("/planView")
	public String planView(Model model) {
		List<ColPlanOrdVO> plans = service.findPlanOrd(null, null,null);
		model.addAttribute("plans",plans);
		return "prod/PlanView";
	}
	@GetMapping(value = "/planView/if", produces = { MediaType.APPLICATION_JSON_VALUE })
	public String planDateView(@RequestParam Map<String, String> QueryParameters, Model model){
		List<ColPlanOrdVO> plans = service.findPlanOrd(QueryParameters.get("sdate"), QueryParameters.get("edate"),QueryParameters.get("vendorCd"));
		model.addAttribute("plans",plans);
		return "prod/changePlanTable";
	}
	
	@RequestMapping("/planManage")
	public String planManage() {
		return "prod/PlanManage";
	}
	
	@GetMapping("/prod/planNotDoneView")
	public ResponseEntity<List<ColPlanVO>> planNotDoneView(){
		List<ColPlanVO> plans = service.findPlanInst(null,null);
		return new ResponseEntity<List<ColPlanVO>>(plans, HttpStatus.OK);
	}
	
	@GetMapping("/prod/planNotDoneView/{sdate}/{edate}")
	public ResponseEntity<List<ColPlanVO>> planNotDoneDateView(@PathVariable String sdate, @PathVariable String edate){
		List<ColPlanVO> plans = service.findPlanInst(sdate,edate);
		return new ResponseEntity<List<ColPlanVO>>(plans, HttpStatus.OK);
	}
	
	
	
	
	
}
