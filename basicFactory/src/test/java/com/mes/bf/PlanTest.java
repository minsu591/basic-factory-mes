package com.mes.bf;

import java.math.BigInteger;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.mes.bf.cmn.provider.JwtProvider;
import com.mes.bf.prod.service.PlanService;
import com.mes.bf.prod.vo.ColPlanOrdVO;
import com.mes.bf.prod.vo.PlanHdVO;
import com.mes.bf.sales.service.SlsOrdService;
import com.mes.bf.sales.vo.SlsOrdPlanVO;

@SpringBootTest
public class PlanTest {
	@Autowired PlanService service;
	@Autowired SlsOrdService ordService;
	@Autowired JwtProvider jwt;
	
	//@Test
	void findPlan() {
		List<PlanHdVO> plans = service.findPlanInst("2022-08-11","2022-08-19",null);
//		List<ColPlanOrdVO> plans2 = service.findPlanOrd("2022-08-11","2022-08-19","VEND001");
		System.out.println(plans);
//		System.out.println(plans2);
	}
	
	//@Test
	void resetPwToken() {
		String token = jwt.createToken("mia");
		System.out.println(token);
	}
	
	@Test
	void test() {
		//비밀번호 암호화 작업 SHA-256
				String rawPw = "admin";
				String hex = "";
				MessageDigest md;
				try {
					md = MessageDigest.getInstance("SHA-256");
					md.update(rawPw.getBytes());
					hex = String.format("%064x", new BigInteger(1,md.digest()));
					System.out.println(hex);
				} catch (NoSuchAlgorithmException e) {
					e.printStackTrace();
				}
	}
}
