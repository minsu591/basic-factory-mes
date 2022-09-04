package com.mes.bf.cmn.controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
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

import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.vo.DeptVO;
import com.mes.bf.cmn.vo.EmpDeptVO;
import com.mes.bf.cmn.vo.EmpVO;

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
	
	//부서 insert, delete, update

	@PostMapping(value = "/dept/delete", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> deptDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.deptDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/dept/insert", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> deptInsert(@RequestParam Map<String, String> QueryParameters) {
		int result = service.deptInsert(QueryParameters.get("deptName"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/dept/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> deptUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.deptUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//직원 insert, delete, update
	@GetMapping(path = "/emp/delete")
	public ResponseEntity<Integer> empDelete(@RequestParam(value="delList[]") List<String> delList) {
		int result = service.empDelete(delList);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/emp/insert")
	public ResponseEntity<Integer> empInsert(@RequestBody EmpVO emp) {
		//비밀번호 암호화 작업 SHA-256
		String rawPw = emp.getEmpPw();
		String hex = "";
		
		MessageDigest md;
		try {
			md = MessageDigest.getInstance("SHA-256");
			md.update(rawPw.getBytes());
			hex = String.format("%064x", new BigInteger(1,md.digest()));
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		}
		emp.setEmpPw(hex);
		int result = service.empInsert(emp);
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@PostMapping(value = "/emp/update", produces = { MediaType.APPLICATION_JSON_VALUE })
	public ResponseEntity<Integer> empUpdate(@RequestParam Map<String, String> QueryParameters) {
		int result = service.empUpdate(QueryParameters.get("priKey"), QueryParameters.get("updCol"), QueryParameters.get("updCont"));
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	//로그인 페이지
	@GetMapping("/login")
	public String loginPage() {
		return "login";
	}
	
	@PostMapping(value = "/login/check")
	public ResponseEntity<Integer> loginCheck(@RequestBody EmpVO emp) {
		//아이디와 비밀번호 받아옴
		MessageDigest md;
		String empHex = "";
		String empId = emp.getEmpId();
		String empPw = emp.getEmpPw();
		EmpVO empInfo = service.findEmp(empId);
		int result;
		if(empInfo == null) {
			//empInfo가 비었으면
			System.out.println("존재하는 아이디가 아닙니다.");
			result = -1;
		}else {
			try {
				md = MessageDigest.getInstance("SHA-256");
				md.update(empPw.getBytes());
				empHex = String.format("%064x", new BigInteger(1,md.digest()));
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			}
			
			//empInfo가 존재하는데 비밀번호가 맞지 않으면
			if(empInfo.getEmpPw() != empHex) {
				System.out.println("비밀번호가 맞지 않습니다.");
				result = 0;
			}else {
				result = 1;
			}
		}

		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	
}
