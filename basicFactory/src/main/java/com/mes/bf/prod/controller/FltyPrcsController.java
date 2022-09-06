package com.mes.bf.prod.controller;
/*
 작성일
 작성자
 수정일
 */
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

import com.mes.bf.cmn.vo.FaultyCodeVO;
import com.mes.bf.prod.service.FltyPrcsService;
import com.mes.bf.prod.vo.FindProcFltyVO;
import com.mes.bf.prod.vo.FltyPrcsVO;

@Controller
@RequestMapping("/prod")
public class FltyPrcsController {
	
	@Autowired FltyPrcsService service;
	
	//불량처리관리 페이지
//	@RequestMapping("/fltyPrcsManage")
//	public ModelAndView fltyPrcsManage() {
//		ModelAndView mav = new ModelAndView("prod/FltyPrcsManage");
//		return mav;
//	}
	//불량처리관리 페이지 호출(생산불량 조회)
	@GetMapping("/fltyPrcsManage")
	public String procFlty(Model model) {
		List<FindProcFltyVO> pf = service.procFlty();
		model.addAttribute("pf", pf);
		return "prod/FltyPrcsManage";
	}
	
	//불량처리목록(모달창)
	@GetMapping(value = "/findListFltyPrcs", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FltyPrcsVO>> findListFltyPrcs(@RequestParam Map<String, String> QueryParameters) {
		List<FltyPrcsVO> list = service.findlistFltyPrcs(QueryParameters.get("fltyPrcsSdate"), QueryParameters.get("fltyPrcsEdate"));
		return new ResponseEntity<List<FltyPrcsVO>>(list, HttpStatus.OK);
	}
	
	//불량처리 등록
	@PostMapping("/fltyPrcs/insert")
	public ResponseEntity<Integer> fltyPrcsInsert(@RequestBody FltyPrcsVO vo) {
		int result = service.fltyPrcsInsert(vo);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//불량처리 수정
	@PostMapping(value = "/fltyPrcs/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> fltyPrcsUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.fltyPrcsUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//불량코드조회(모달창)
	@GetMapping(value = "/findFltyCode", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FaultyCodeVO>> findFltyCode(@RequestParam Map<String, String> QueryParameters) {
		List<FaultyCodeVO> list = service.findFltyCode(QueryParameters.get("faultyCode"));
		return new ResponseEntity<List<FaultyCodeVO>>(list, HttpStatus.OK);
	}
	
	//불량처리조회
	@RequestMapping("/fltyPrcs")
	public String fltyPrcsListPage(Model model) {
		List<FltyPrcsVO> fltyPrcs = service.listFltyPrcs();
		model.addAttribute("fltyPrcs", fltyPrcs);
		return "prod/FltyPrcs";
	}
	//불량처리상세조회
	@GetMapping(value = "/fltyPrcsList/find", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<FltyPrcsVO>> fltyPrcsFindPage(@RequestParam Map<String, String> queryParameters) {
		List<FltyPrcsVO> list = service.findFltyPrcs(queryParameters.get("fltyPrcsSdate"), queryParameters.get("fltyPrcsEdate"), queryParameters.get("finPrdCdName"));
		return new ResponseEntity<List<FltyPrcsVO>>(list, HttpStatus.OK);
	}
	
}
