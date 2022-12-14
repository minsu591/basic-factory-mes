package com.mes.bf.eqp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.service.NonOperationService;
import com.mes.bf.eqp.vo.FindNonOpHIstoryVO;
import com.mes.bf.eqp.vo.NonOpHistoryVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.FindEmpVO;

@RestController
@RequestMapping("/eqp")
public class NonOperationController {

	@Autowired
	ProcService procservice;
	@Autowired
	NonOperationService service;
	@Autowired
	InstructionService instservice;

	// 비가동조회페이지 이동
	@RequestMapping("/nonOperation")
	public ModelAndView nonOperation() {
		ModelAndView mav = new ModelAndView("eqp/NonOperation");
		return mav;
	}

	// 비가동관리페이지 이동
	@RequestMapping("/nonOperationManage")
	public ModelAndView nonOperationManage() {
		ModelAndView mav = new ModelAndView("eqp/NonOperationManage");
		return mav;
	}

	// 설비명 조회
	@GetMapping(value = "/findmchn", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findAllMchn(@RequestParam Map<String, String> QueryParameters) {
		List<VfindMchnVO> list = procservice.findMchn(QueryParameters.get("mchnCode"), QueryParameters.get("mchnName"));
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정명 조회
	@GetMapping(value = "/findproccode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<ProcCodeVO>> findProcCode(@RequestParam Map<String, String> QueryParameters) {
		List<ProcCodeVO> list = procservice.findProcCode(QueryParameters.get("procCdCode"),
				QueryParameters.get("procCdName"));
		return new ResponseEntity<List<ProcCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 공정구분 설비 조회
	@GetMapping(value = "/findmchn/{procCdName}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VfindMchnVO>> findMchn(@PathVariable String procCdName) {
		List<VfindMchnVO> list = service.findMchn(procCdName);
		return new ResponseEntity<List<VfindMchnVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 비가동코드 조회
	@GetMapping(value = "/findnonop", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<NonOpVO>> findNonOp(@RequestParam Map<String, String> QueryParameters) {
		List<NonOpVO> list = service.findNonOp(QueryParameters.get("nonOpCode"), QueryParameters.get("nonOpName"));
		return new ResponseEntity<List<NonOpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 설비 비가동 조회
	@GetMapping(value = "findnonophistory", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindNonOpHIstoryVO>> findNonOpHistory(
			@RequestParam Map<String, String> QueryParameters) {

		List<FindNonOpHIstoryVO> list = service.findNonOpHistory(QueryParameters.get("sDate"),
				QueryParameters.get("eDate"), QueryParameters.get("mchnName"), QueryParameters.get("nonOpCode"));
		return new ResponseEntity<List<FindNonOpHIstoryVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 담당자조회
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<FindEmpVO> list = instservice.findEmp(QueryParameters.get("empName"),QueryParameters.get("deptNo"));
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 설비상태업데이트
	@PostMapping("/startmchnstatusupdate/{mchnCode}")
	public int startMchnStatusUpdate(@PathVariable String mchnCode) {
		return service.startMchnStatusUpdate(mchnCode);

	}

	// 설비상태업데이트
	@PostMapping("/endmchnstatusupdate/{mchnCode}")
	public int endMchnStatusUpdate(@PathVariable String mchnCode) {
		return service.endMchnStatusUpdate(mchnCode);

	}

	// 입력번호 찾기
	@GetMapping("/findinputno")
	public int findInputNo() {
		return service.findInputNo();
	}

	// 비가동내역 입력
	@PostMapping("/insertnonophistory")
	public NonOpHistoryVO insertNonOpHistory(@RequestBody NonOpHistoryVO vo) {
		System.out.println(vo);
		service.insertNonOpHistory(vo);
		return vo;
	}
	
	//비가동코드 단건검색
	@GetMapping("/getnonopcode")
	public NonOpVO getNonOpCode(@RequestParam String nonOpCode) {
		return service.getNonOpCode(nonOpCode);
	}
	
	

}
