package com.mes.bf.prod.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.service.PackingService;
import com.mes.bf.prod.vo.PackingVO;
import com.mes.bf.sales.vo.SlsInDtlVO;

@RestController
@RequestMapping("/prod")
public class PackingController {

	@Autowired PackingService service;
	
	@GetMapping(value = "/findpackingproc", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<PackingVO>> findPackingProc() {
		List<PackingVO> list = service.findPackingProc();
		return new ResponseEntity<List<PackingVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
	
	@GetMapping("/findmchn/{finPrdCdCode}")
	public MchnVO findMchn(@PathVariable String finPrdCdCode) {
		MchnVO vo = service.findMchn(finPrdCdCode);
		return vo;
	}
	
	//완제품 입고내역 등록
	@PostMapping("/insertindtl")
	public void insertInDtl(@RequestBody SlsInDtlVO vo) {
		service.insertInDtl(vo);
	}
	
}
