package com.mes.bf.prod.controller;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.common.Criteria;
import com.mes.bf.common.PageDTO;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.PlanHdDtlVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.prod.vo.PlanVO;
import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SlsOrdDtlVO;
import com.mes.bf.sales.vo.SlsOrdHdVO;

@Controller
@RequestMapping("/prod")
public class PlanController {
	@Autowired PlanService service;
	@Autowired SlsOrdService ordService;
	
	//생산 계획 조회
	@RequestMapping("/planView")
	public String planView(Model model, @ModelAttribute("cri") Criteria cri) {
//		//오늘날짜 가져오기
//		Calendar cal = Calendar.getInstance();
//		SimpleDateFormat simpleFormat = new SimpleDateFormat("yyyy-MM-dd");
//		//오늘 날짜
//		String edate = simpleFormat.format(cal.getTime());
//		cal.add(cal.DATE, -6);
//		//일주일 전 날짜
//		String sdate = simpleFormat.format(cal.getTime());
		
		int total = service.findPlanOrdCount(cri);
		cri.setAmount(10); // 한페이지당 10개씩 설정
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		model.addAttribute("plans", service.findPlanOrd(cri));
		return "prod/PlanView";
	}
	
	//생산 계획 조건 조회
	@GetMapping(value = "/planView/org")
	public String planDateView(Model model, @ModelAttribute("cri") Criteria cri){
		int total = service.findPlanOrdCount(cri);
		cri.setAmount(10); // 한페이지당 10개씩 설정
		PageDTO page = new PageDTO(cri, total);
		model.addAttribute("pageMaker", page);
		model.addAttribute("plans", service.findPlanOrd(cri));
		return "prod/changePlanTable";
	}
	
	//생산 계획 관리에서 내 생산계획 조회 모달
	@GetMapping("/myPlanView")
	public ResponseEntity<List<PlanHdVO>> planMyView(@RequestParam Map<String, String> QueryParameters, HttpServletRequest request){
		HttpSession session = request.getSession();
		EmpVO emp = (EmpVO) session.getAttribute("emp");
		List<PlanHdVO> plans = service.findPlanInst(QueryParameters.get("sdate"), QueryParameters.get("edate"), emp.getEmpId());
		return new ResponseEntity<List<PlanHdVO>>(plans, HttpStatus.OK);
	}
	//생산 계획 관리에서 내 생산계획 상세 조회
	@GetMapping("/myPlanView/dtl")
	public ResponseEntity<List<ColPlanOrdVO>> planMyDtlView(@RequestParam String planHdCode){
		List<ColPlanOrdVO> plans = service.findMyPlan(planHdCode);
		return new ResponseEntity<List<ColPlanOrdVO>>(plans, HttpStatus.OK);
	}
	
	//생산 관리 페이지
	@RequestMapping("/planManage")
	public String planManage() {
		return "prod/PlanManage";
	}
	
	//생산 관리에서 미계획 주문내역 모달 조회
	@GetMapping(value="/notDoneOrd", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<SlsOrdHdVO>> notDoneOrd(@RequestParam Map<String, String> QueryParameters){
		List<SlsOrdHdVO> ords = ordService.findOrderForPlan(QueryParameters.get("sdate"), QueryParameters.get("edate"));
		return new ResponseEntity<List<SlsOrdHdVO>>(ords, HttpStatus.OK);
	}
	
	//생산 관리에서 미계획 주문내역 모달 상세 조회
	@GetMapping(value="/notDoneOrd/dtl", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<SlsOrdDtlVO>> notDoneOrdDtl(@RequestParam Map<String, String> QueryParameters){
		List<SlsOrdDtlVO> ords = ordService.findOrderForPlanDtl(QueryParameters.get("slsOrdHdNo"));
		return new ResponseEntity<List<SlsOrdDtlVO>>(ords, HttpStatus.OK);
	}
	
	//생산 지시에서 미지시 생산계획 조회
	@GetMapping(value="/planNotDoneView", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<PlanHdVO>> planNotDoneView(@RequestParam Map<String, String> QueryParameters){
		List<PlanHdVO> plans = service.findPlanInst(QueryParameters.get("sdate"), QueryParameters.get("edate"),null);
		return new ResponseEntity<List<PlanHdVO>>(plans, HttpStatus.OK);
	}
	//계획 상세 조회
	@GetMapping(value="/planNotDoneView/dtl", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<PlanVO>> planNotDoneViewDtl(@RequestParam String planHdCode){
		List<PlanVO> plans = service.findPlan(planHdCode);
		System.out.println(plans);
		return new ResponseEntity<List<PlanVO>>(plans, HttpStatus.OK);
	}
	
	//계획 헤더 insert, 나머지 insert
	@PostMapping(value = "/planManage/hd/insert")
	public ResponseEntity<Integer> planHdInsert(@RequestBody PlanHdDtlVO planHdDtl) {
		List<PlanVO> plans = planHdDtl.getPlans();
		int result = service.planHdInsert(planHdDtl.getPlanHdVO());
		int resultSum = 0;
		if(result == 1) {
			for(int i = 0; i<plans.size();i++) {
				int resultEl = service.planInsert(plans.get(i));
				if(resultEl == 1) {
					resultSum ++;
				}
			}
		}
		return new ResponseEntity<Integer>(resultSum,HttpStatus.OK);
	}
	
	@PostMapping(value = "/planManage/insert")
	public ResponseEntity<Integer> planInsert(@ModelAttribute PlanVO planDtl) {
		System.out.println("plandtl"+planDtl);
		int result = service.planInsert(planDtl);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//계획 헤더 delete
	@PostMapping(value = "/planManage/hd/delete")
	public ResponseEntity<Integer> planHdDelete(@RequestBody PlanHdVO headerInfo) {
		int result = service.planHdDelete(headerInfo);
		System.out.println(result);
		return null;
		//return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	//계획 delete

	@PostMapping(value = "/planManage/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> planDtlDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.planDtlDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//계획 헤더 update
	@PostMapping(value = "/planManage/hd/update")
	public ResponseEntity<Integer> planHdUpdate(@RequestParam String priKey, @RequestParam String updCol, @RequestParam String updCont) {
		int result = service.planHdUpdate(priKey, updCol, updCont);
		
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//계획 update
	@PostMapping(value = "/planManage/update")
	public ResponseEntity<Integer> planDtlUpdate(@RequestParam String priKey, @RequestParam String updCol, @RequestParam String updCont) {
		int result = service.planDtlUpdate(priKey, updCol, updCont);
		
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}


}
