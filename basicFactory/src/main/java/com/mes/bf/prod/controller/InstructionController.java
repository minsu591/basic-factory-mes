package com.mes.bf.prod.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;

@RestController
@RequestMapping("/prod")
public class InstructionController {

	@Autowired
	private InstructionService service;

	// 생산 지시 조회페이지 이동
	@RequestMapping("/inst")
	public ModelAndView inst() {
		ModelAndView mav = new ModelAndView("prod/Instruction");
		return mav;
	}

	// 생산 지시 관리페이지 이동
	@RequestMapping("/instmanagement")
	public ModelAndView instma() {
		ModelAndView mav = new ModelAndView("prod/InstManage");
		return mav;
	}

	// 조회 => Get
	@GetMapping(value = "/findemp", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindEmpVO>> findEmp(FindEmpVO vo) {
		List<FindEmpVO> list = service.findEmp();
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 단건조회 => GET
	@GetMapping("/findemp/{empName}")
	public FindEmpVO findEmpName(@PathVariable String empName) {

		return service.findEmpName(empName);
	}

	@GetMapping("/findProdName/{prodCode}")
	public VFindProdAndLineVO findProdName(@PathVariable String prodCode) {
		return service.findProdName(prodCode);
	}

	// 완제품전체 조회
	// 조회 => Get
	@GetMapping(value = "/findProduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findAllProduct(FinProdCodeVO vo) {
		List<FinProdCodeVO> list = service.findAllProduct();
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 생산지시조회
	// 조회 => Get
	@GetMapping(value = "/findvInst", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VInstructionVO>> findAllVInstruction(VInstructionVO vo) {
		List<VInstructionVO> list = service.findAllvInstruction();
		return new ResponseEntity<List<VInstructionVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 완제품 단건 검색
	// 단건조회 => GET
	@GetMapping(value = { "/getProduct" })
	public FinProdCodeVO findProduct(@RequestParam Map<String, String> QueryParameters) {
		System.out.println(QueryParameters.get("prdCdCode"));
		System.out.println(QueryParameters.get("prdCdName"));
		return service.findProduct(QueryParameters.get("prdCdCode"), QueryParameters.get("prdCdName"));
	}
	
	//거래처 전체조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(VendorCodeVO vo) {
		List<VendorCodeVO> list = service.findAllVendorCode();
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	
	
	@GetMapping(value = "/findprocstatus/{lineName}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindProcStatusVO>> findProcStatus(@PathVariable String lineName) {
		List<FindProcStatusVO> list = service.findProcStatus(lineName);
		return new ResponseEntity<List<FindProcStatusVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	

}
