package com.mes.bf.cmn.controller;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.vo.EmpVO;

@Controller
@RequestMapping("/cmn")
public class LoginController {
	@Autowired EmpDeptService service;
	
	//로그인 페이지
	@GetMapping("/login")
	public String loginPage(HttpServletRequest request) {
		HttpSession session = request.getSession();
		session.setAttribute("emp", null);
		return "cmn/Login";
	}
	
	@PostMapping(value = "/login/check")
	public ResponseEntity<Integer> loginCheck(@RequestBody EmpVO emp, HttpServletRequest request) {
		HttpSession session = request.getSession();
		//아이디와 비밀번호 받아옴
		MessageDigest md;
		String empHex = "";
		String empId = emp.getEmpId();
		String empPw = emp.getEmpPw();
		EmpVO empInfo = service.findEmp(empId);
		int result;
		if(empInfo == null) {
			//empInfo가 비었으면
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
			if(empInfo.getEmpPw().equals(empHex)) {
				result = 1;
				session.setAttribute("emp",empInfo);
			}else {
				result = 0;
			}
		}
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	
}
