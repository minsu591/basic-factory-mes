package com.mes.bf.prod.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@RestController
@RequestMapping("/prod")
public class ProcController {

	@Autowired
	ProcService service;

	// 공정실적 조회페이지 이동
	@RequestMapping("/proc")
	public ModelAndView proc() {
		ModelAndView mav = new ModelAndView("prod/Proc");
		return mav;
	}

	// 공정실적 관리페이지 이동
	@RequestMapping("/procManage")
	public ModelAndView procManage() {
		ModelAndView mav = new ModelAndView("prod/ProcManage");
		return mav;
	}

	// 공정모니터링 페이지 이동
	@RequestMapping("/monitoring")
	public ModelAndView monitoring() {
		ModelAndView mav = new ModelAndView("prod/Monitoring");
		return mav;
	}

	// 포장관리 페이지 이동
	@RequestMapping("/packing")
	public ModelAndView packing() {
		ModelAndView mav = new ModelAndView("prod/PackingManage");
		return mav;
	}

	// 설비명 조회
	@GetMapping(value = "/findmchn", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<VfindMchnVO> list = service.findMchn(QueryParameters.get("mchnCode"), QueryParameters.get("mchnName"));
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정명 조회
	@GetMapping(value = "/findproccode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> findProcCode(@RequestParam Map<String, String> QueryParameters) {
		List<ProcCodeVO> list = service.findProcCode(QueryParameters.get("procCdCode"), QueryParameters.get("procCdName"));
		return new ResponseEntity<List<ProcCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정실적 전체조회
	@GetMapping(value = "/findprocperform", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VFindProcPerformVO>> findProcPerform(@RequestParam Map<String, String> QueryParameters) {
		List<VFindProcPerformVO> list = service.findProcPerform(QueryParameters.get("workSdate"),
																QueryParameters.get("workEdate"),
																QueryParameters.get("procCdName"),
																QueryParameters.get("mchnName"),
																QueryParameters.get("empId"));
		return new ResponseEntity<List<VFindProcPerformVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	//공정실적관리 테이블 조회
	@GetMapping("/findprocmanage")
	public ResponseEntity<List<ProcManageVO>> findProcManage(){
		List<ProcManageVO> list = service.findProcManage();
		return new ResponseEntity<List<ProcManageVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	//공정테이블 조회
	@GetMapping("/findprocess")
	public ResponseEntity<List<ProcessVO>> findProcess(){
		List<ProcessVO> list = service.findProcess();
		return new ResponseEntity<List<ProcessVO>>(list,HttpStatus.OK);
	}
	
	

}
