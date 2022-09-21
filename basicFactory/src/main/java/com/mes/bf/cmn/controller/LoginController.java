package com.mes.bf.cmn.controller;

import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.provider.JwtProvider;
import com.mes.bf.cmn.service.EmpDeptService;
import com.mes.bf.cmn.service.MailService;
import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.MailVO;

@Controller
@RequestMapping("/cmn")
public class LoginController {
	@Autowired EmpDeptService service;
	@Autowired JwtProvider jwt;
	@Autowired MailService mail;
	
	//로그인 페이지
	@GetMapping("/login")
	public String loginPage(HttpServletRequest request) {
		//로그아웃
		HttpSession session = request.getSession();
		session.setAttribute("emp", null);
		return "cmn/loginpage";
	}
	
	//비밀번호 찾기 페이지
	@GetMapping("/login/reset")
	public ModelAndView pwResetPage() {
		return new ModelAndView("cmn/pwReset");
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
		}else if(empInfo.getEmpAuth().equals("0")){
			//권한이 있는 아이디가 아니면
			result = -2;
		}
		else{
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
	//비밀번호 재설정
	//비밀번호 재설정 아이디 정보 가져오기
	@PostMapping(value = "/login/reset/empId")
	public ResponseEntity<Integer> checkEmpId(@RequestBody EmpVO emp, HttpServletRequest request) {
		int result = 0;
		String empId = emp.getEmpId();
		String empName = emp.getEmpName();
		String empEmail = emp.getEmpEmail();
		EmpVO empInfo = service.findEmp(empId);
		
		if(empInfo == null) {
			result = -1;
		}else if(!empInfo.getEmpName().equals(empName)) {
			result = -2;
		}else if(!empInfo.getEmpEmail().equals(empEmail)) {
			result = -3;
		}else {
			String token = jwt.createToken(empId);
			//현재 경로 넣기
		    String path = request.getRequestURL().toString();
		    int pathIdx = path.indexOf("/", 8);
		    String ipAddr = path.substring(0, pathIdx);
		    
			//성공
			String cont = "<div style=\"width:70%; margin : 0 auto; height : 70%;\">\r\n"
					+ "  <div style=\"background-color : #1abc9c; margin : 0; color : white; text-align :center; padding: 1px;\">\r\n"
					+ "          <h2>Basic Factory</h2>\r\n"
					+ "      </div>\r\n"
					+ "	<div style=\"background-color : #e1e3e3; margin : 0; text-align :center; padding : 2%; margin-bottom : 1%; height : 100%;\">\r\n"
					+ "		<h3>\"empId\"님 비밀번호를 재설정해주세요.</h3>\r\n"
					+ "		<p>아래의 비밀번호 재설정 버튼을 클릭하여<br>비밀번호를 재설정하는 페이지로 이동할 수 있습니다.<br>		<br>본인이 새로운 비밀번호를 요청하지 않았다면 이 메일을 무시해주세요.</p>\r\n"
					+ "        <p>\r\n"
					+ "	</div>\r\n"
					+ "    <button type=\"button\" onclick=\"location.href='"
					+ ipAddr+"/cmn/login/reset/"+token+"'\" style=\"cursor : pointer; color : #fff; background-color : #1abc9c; border-color : #1abc9c; display: block; width: 30%; margin : 0 auto; padding : 2%; font-weight : bold; vertical-align : middle; border-radius : 10px; justify-content : flex-start; height : 20%;\">비밀번호 재설정</button>\r\n"
					+ "</div>";
					
				
			MailVO mailInfo = new MailVO();
			mailInfo.setToAddress(empEmail);
			mailInfo.setSubject("Basic Factory 비밀번호 재설정 메일입니다");
			mailInfo.setContent(cont);
			mail.sendMail(mailInfo);
			
		}
		return new ResponseEntity<Integer>(result,HttpStatus.OK);
	}
	
	@GetMapping(value = "/login/reset/{token}")
	public String goPwPageWithToken(@PathVariable("token") String token, Model model) {
		Map<String, Object> claimMap = null;
		try {
			claimMap = jwt.verifyJWT(token);
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		if(claimMap == null) {
			//만료된 토큰
			//오류 페이지 띄우기
			return "layout/error404";
		}else {
			//비밀번호 변경페이지
			String empId = (String) claimMap.get("data");
			EmpVO emp = new EmpVO();
			emp.setEmpId(empId);
			model.addAttribute("emp", emp);
		}
		
		return "cmn/pwResetDetail";
	}
	
	//비밀번호 재설정
		@PostMapping(value = "/login/reset/confirm")
		public ResponseEntity<Integer> passwordConfirm(@RequestBody EmpVO emp) {
			String empId = emp.getEmpId();
			String empPw = emp.getEmpPw();
			MessageDigest md;
			String empHex = "";
			int result;
			try {
				md = MessageDigest.getInstance("SHA-256");
				md.update(empPw.getBytes());
				empHex = String.format("%064x", new BigInteger(1,md.digest()));
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			}
			
			result = service.empUpdate(empId,"emp_pw",empHex);
			
			return new ResponseEntity<Integer>(result,HttpStatus.OK);
		}
}
