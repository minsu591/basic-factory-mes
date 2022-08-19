package com.mes.bf.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.VfindMchnVO;

@RestController
@RequestMapping("/prod")
public class ProcController {

	@Autowired ProcService service;
	
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

	//설비명 전체조회
	@GetMapping(value = "/findallmchn", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findEmp(VfindMchnVO vo) {
		List<VfindMchnVO> list = service.findAllMchn();
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	//공정명 전체조회
	@GetMapping(value = "/findallproccode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> findAllProcCode(ProcCodeVO vo) {
		List<ProcCodeVO> list = service.findAllProcCode();
		return new ResponseEntity<List<ProcCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	
	

}
