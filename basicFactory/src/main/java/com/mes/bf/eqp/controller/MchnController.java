package com.mes.bf.eqp.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.eqp.service.MchnService;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.service.InstructionService;

@Controller
@RequestMapping("/eqp")
public class MchnController {
	
	@Autowired MchnService service;
	@Autowired InstructionService instService;
	
	//설비관리
//	@RequestMapping("/mchnManage")
//	public ModelAndView mchnManage() {
//		ModelAndView mav = new ModelAndView("eqp/MchnManage");
//		return mav;
//	}
	@RequestMapping("/mchnManage")
	public String mchnPage(Model model) {
		List<MchnVO> mchns = service.findMchnName(null);
		model.addAttribute("mchns",mchns);
		return "eqp/MchnManage";
	}
	
	@GetMapping(value = "/mchn/name", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<MchnVO>> findMchnName(@RequestParam Map<String, String> QueryParameters){
		List<MchnVO> vends = service.findMchnName(QueryParameters.get("mchnName"));
		return new ResponseEntity<List<MchnVO>>(vends, HttpStatus.OK);
	}
	
	@PostMapping(value = "/mchn/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> mchnDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.mchnDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//설비 등록
	@PostMapping("/mchn/insert")
	public ResponseEntity<Integer> fltyPrcsInsert(@RequestBody MchnVO vo) {
		int result = service.mchnInsert(vo);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//설비 수정
	@PostMapping(value = "/mchn/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> fltyPrcsUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.mchnUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	
	//설비 조회
	@RequestMapping("/mchnList")
	public String mchnListPage(Model model) {
		List<MchnVO> mchns = service.listMchn(null);
		model.addAttribute("mchns", mchns);
		System.out.println(mchns);
		return "eqp/MchnList";
	}
	//설비 코드별 조회
	@GetMapping(value = "/mchnList/mchnName", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<MchnVO>> mchnCodePage(@RequestParam Map<String, String> QueryParameters){
		List<MchnVO> mchnName = service.listMchn(QueryParameters.get("mchnName"));
		return new ResponseEntity<List<MchnVO>>(mchnName, HttpStatus.OK);
	}
	
	//거래처 전체조회
	@GetMapping(value = "/findvendorcode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VendorCodeVO>> findAllVInstruction(@RequestParam Map<String,String> queryParameters) {
		List<VendorCodeVO> list = instService.findVendorCode(queryParameters.get("vendorCode"),queryParameters.get("vendCdClfy"));
		return new ResponseEntity<List<VendorCodeVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}

}
