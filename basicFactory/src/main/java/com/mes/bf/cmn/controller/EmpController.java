package com.mes.bf.cmn.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;

@Controller
@RequestMapping("/cmn")
public class EmpController {
	@Autowired EmpDeptService service;
	
	//직원 관리 페이지
	@RequestMapping("/empView")
	public String empViewPage(Model model) {
		List<EmpDeptVO> listEmp = service.listEmpDept(null,null,null);
		model.addAttribute("emps",listEmp);
		return "cmn/Emp";
	}
	
	//부서 관리 페이지
	@RequestMapping("/dept")
	public String deptPage(Model model) {
		List<DeptVO> depts = service.listDept(null);
		model.addAttribute("depts",depts);
		return "cmn/Dept";
	}
	
	//직원 조건 조회
	@GetMapping(value="/empView/select", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<EmpDeptVO>> findEmpSelect(@RequestParam Map<String, String> QueryParameters){
		List<EmpDeptVO> emps = service.listEmpDept(QueryParameters.get("empId"), QueryParameters.get("empName"), QueryParameters.get("deptNo"));
		return new ResponseEntity<List<EmpDeptVO>>(emps,HttpStatus.OK);
	}
	
	//부서 조건 조회
	@GetMapping(value="/empView/dept", produces = {MediaType.APPLICATION_JSON_VALUE})
	public ResponseEntity<List<DeptVO>> findDept(@RequestParam Map<String, String> QueryParameters){
		List<DeptVO> depts = service.listDept(QueryParameters.get("deptName"));
		return new ResponseEntity<List<DeptVO>>(depts,HttpStatus.OK);
	}
	
}
