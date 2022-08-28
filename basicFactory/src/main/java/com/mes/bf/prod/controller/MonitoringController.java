package com.mes.bf.prod.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mes.bf.prod.service.MonitoringService;
import com.mes.bf.prod.vo.MonitoringVO;

@RestController
@RequestMapping("/prod")
public class MonitoringController {
@Autowired MonitoringService service;
	//모니터링 현황 조회
	@GetMapping("/findmonitoring/{toDay}")
	public ResponseEntity<List<MonitoringVO>> findVInstruction(@PathVariable String toDay) {
		List<MonitoringVO> list = service.findMonitoring(toDay);
		return new ResponseEntity<List<MonitoringVO>>(list, HttpStatus.OK);// 결과값,상태값 OK = 200, NOTFOUND = 404
	}
}
