package com.mes.bf.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanVO;

@Controller
@RequestMapping("/prod")
public class PlanController {
	@Autowired PlanService service;
	
	@RequestMapping("/planView")
	public String planView(Model model) {
		List<ColPlanVO> plans = service.findPlan("all", null, null);
		model.addAttribute("plans",plans);
		return "prod/PlanView";
	}
	@GetMapping("/planView/{sdate}/{edate}")
	public ResponseEntity<List<ColPlanVO>> planDateView(@PathVariable String sdate, @PathVariable String edate){
		List<ColPlanVO> plans = service.findPlan("all", sdate, edate);
		return new ResponseEntity<List<ColPlanVO>>(plans, HttpStatus.OK); 
	}
	
	@RequestMapping("/planManage")
	public String planManage() {
		return "prod/PlanManage";
	}
	
	@GetMapping("/prod/planNotDoneView")
	public ResponseEntity<List<ColPlanVO>> planNotDoneView(){
		List<ColPlanVO> plans = service.findPlan("notDone",null,null);
		return new ResponseEntity<List<ColPlanVO>>(plans, HttpStatus.OK);
	}
	
	@GetMapping("/prod/planNotDoneView/{sdate}/{edate}")
	public ResponseEntity<List<ColPlanVO>> planNotDoneDateView(@PathVariable String sdate, @PathVariable String edate){
		List<ColPlanVO> plans = service.findPlan("notDone",sdate,edate);
		return new ResponseEntity<List<ColPlanVO>>(plans, HttpStatus.OK);
	}
	
	
	
	
	
}
