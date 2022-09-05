package com.mes.bf.cmn.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomRscInsVO;
import com.mes.bf.cmn.vo.BomRscVO;
import com.mes.bf.cmn.vo.BomVO;
import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;
import com.mes.bf.prod.service.InstructionService;

@Controller
@RequestMapping("/cmn")
public class BomCodeController {
	@Autowired BomService service;
	@Autowired InstructionService Instservice;

	
	//페이지 호출
	@RequestMapping("/bomCode")
	public String bomCodePage(Model model, HttpServletRequest request) {
		HttpSession session = request.getSession();
		EmpVO emp = (EmpVO) session.getAttribute("emp");
		if(emp == null) {
			return "cmn/login";
		}else {
			List<BomVO> boms = service.listBom(null);
			model.addAttribute("boms",boms);
			return "cmn/BomCode";
		}
		
	}
	
	//bom 조건 조회
	@GetMapping(value="/bomCode/name", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<BomVO>> bomCodeName(@RequestParam Map<String, String> QueryParameters){
		List<BomVO> boms = service.listBom(QueryParameters.get("finName"));
		return new ResponseEntity<List<BomVO>>(boms,HttpStatus.OK);
	}
	
	//bom 자재 조회
	@GetMapping(value="/bomRsc", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<BomRscDtlVO>> findBomRsc(@RequestParam Map<String, String> QueryParameters){
		List<BomRscDtlVO> boms = service.findBomRsc(QueryParameters.get("bomCode"));
		return new ResponseEntity<List<BomRscDtlVO>>(boms,HttpStatus.OK);
	}
	
	@GetMapping(value="/bomRsc/proc", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<LineCodeVO>> findProcForLine(@RequestParam String lineCode){
		List<LineCodeVO> procs = service.findProcForLine(lineCode);
		return new ResponseEntity<List<LineCodeVO>>(procs,HttpStatus.OK);
	}
	
	
	//bom insert, delete, update
	@PostMapping(value = "/bomCode/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeDelete(@RequestParam(value="bomDelList[]") List<String> bomDelList) {
		int result = service.bomCodeDelete(bomDelList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/bomCode/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeInsert(@ModelAttribute BomVO bom) {
		int result = service.bomCodeInsert(bom);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/bomCode/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomCodeUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomCodeUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//bom rsc insert, delete, update
	@PostMapping(value = "/bomRsc/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscDelete(@RequestParam(value="rscDelList[]") List<String> rscDelList) {
		int result = service.bomRscDelete(rscDelList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}

	@PostMapping(value = "/bomRsc/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscInsert(@ModelAttribute BomRscVO bomRsc) {
		System.out.println(bomRsc);
		int result = service.bomRscInsert(bomRsc,null);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/bomRsc/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> bomRscUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.bomRscUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//bom와 rsc insert 동시에
	@PostMapping(value = "/bomRsc/with/insert")
	public ResponseEntity<Integer> bomRscInsert(@RequestBody BomRscInsVO bomRscInsVO) {
		System.out.println(bomRscInsVO);
		int result = service.bomCodeInsert(bomRscInsVO.getBom());
		int resultSum = 0;
		List<BomRscVO> bomRscs = bomRscInsVO.getBomRscs();
		for (int i =0; i<bomRscs.size(); i++) {
			System.out.println(bomRscs.get(i));
			int ans = service.bomRscInsert(bomRscs.get(i),"withBom");
			if(ans == 1) {
				resultSum += ans;
			}
		}
		return new ResponseEntity<Integer>(resultSum,HttpStatus.OK);
	}
	
	// 완제품 조회
	@GetMapping(value = "/findproduct", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FinProdCodeVO>> findProduct(@RequestParam Map<String, String> QueryParameters) {
		List<FinProdCodeVO> list = Instservice.findProduct(QueryParameters.get("prdCdCode"),
				QueryParameters.get("prdCdName"));
		return new ResponseEntity<List<FinProdCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	//bom에 없는 라인 조회
	@GetMapping(value = "/findLine", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<LineCodeHdVO>> findLine() {
		List<LineCodeHdVO> lines = service.findLine();
		return new ResponseEntity<List<LineCodeHdVO>>(lines, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	
	
}
