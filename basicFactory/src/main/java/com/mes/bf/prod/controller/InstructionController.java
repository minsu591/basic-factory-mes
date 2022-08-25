package com.mes.bf.prod.controller;

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

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.service.InstructionService;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

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
	public ResponseEntity<List<FindEmpVO>> findEmp(@RequestParam Map<String, String> QueryParameters) {
		List<FindEmpVO> list = service.findEmp(QueryParameters.get("empName"));
		return new ResponseEntity<List<FindEmpVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	@GetMapping("/findProdName/{prodCode}")
	public VFindProdAndLineVO findProdName(@PathVariable String prodCode) {
		return service.findProdName(prodCode);
	}

	// 완제품 조회
	@GetMapping(value = "/findproduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findProduct(@RequestParam Map<String, String> QueryParameters) {
		List<FinProdCodeVO> list = service.findProduct(QueryParameters.get("prdCdCode"),
				QueryParameters.get("prdCdName"));
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 생산지시조회
	@GetMapping(value = "/findvinst", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VInstructionVO>> findVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VInstructionVO> list = service.findVInstruction(queryParameters.get("instSdate"),
				queryParameters.get("instEdate"), queryParameters.get("vendorName"),
				queryParameters.get("productName"));
		return new ResponseEntity<List<VInstructionVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 거래처 조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String, String> queryParameters) {
		List<VendorCodeVO> list = service.findVendorCode(queryParameters.get("vendorCode"),
				queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	@GetMapping(value = "/findprocstatus/{lineName}", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FindProcStatusVO>> findProcStatus(@PathVariable String lineName) {
		List<FindProcStatusVO> list = service.findProcStatus(lineName);
		return new ResponseEntity<List<FindProcStatusVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

	// 제품별 자재 소요 예상량 조회
	@GetMapping("/findvrscneedqty/{finPrdCdCode}")
	public ResponseEntity<List<VRscNeedQtyVO>> findVRscNeedQty(@PathVariable String finPrdCdCode) {
		List<VRscNeedQtyVO> list = service.findVRscNeedQty(finPrdCdCode);
		return new ResponseEntity<List<VRscNeedQtyVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	//생산지시 등록
	@PostMapping("/insertinstruction")
	public void insertInstruction(@RequestBody Map<String,Object> instruction) {
		//System.out.println(instruction.get("instobjheader"));
		//System.out.println(instruction.get("instobjdetail"));
		ObjectMapper m = new ObjectMapper();
		try {
			//object -> String 변환
			String instheader = m.writeValueAsString(instruction.get("instobjheader"));
			String instdetail = m.writeValueAsString(instruction.get("instobjdetail"));
			//String -> vo변환
			InstructionVO instvo = m.readValue(instheader,InstructionVO.class);
			InstructionDetailVO detailvo = m.readValue(instdetail, InstructionDetailVO.class);
			//System.out.println(instvo);
			//System.out.println(detailvo);
			String finPrdCdCode = detailvo.getFinPrdCdCode();
			System.out.println(detailvo.getFinPrdCdCode());
			service.insertInstruction(instvo, detailvo);
			service.insertProc(finPrdCdCode);
			
			//자재소요예상량 데이터 입력
			service.insertNeedQty(finPrdCdCode);

			//최초 공정 업데이트
			service.updateinDtlVol(detailvo.getInstProdIndicaVol());
			
			
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		
	}
	
	//자재소요예상량 업데이트
	@PutMapping("/updateneedqty") //파라미터가 JSON이라 파싱필요
	public void todoUpdate(@RequestBody Map<String,String> needQty) {
		System.out.println(needQty.get("needQty"));
		System.out.println(needQty.get("rscCdCode"));
		
		service.updateNeedQty(needQty.get("needQty"), needQty.get("rscCdCode"));
		
	}
	
	
	

}
