package com.mes.bf.cmn.provider;

import java.io.UnsupportedEncodingException;
import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;


@Component
public class JwtProvider {
	
	@Value("${jwt.password}")
    private String secretKey;
	
	//토큰 생성
    public String createToken(String empId) {
        
      //Header 부분 설정
        Map<String, Object> headers = new HashMap<>();
        headers.put("typ", "JWT");
        headers.put("alg", "HS256");

        //payload 부분 설정
        Map<String, Object> payloads = new HashMap<>();
        payloads.put("data", empId);

        Date now = new Date();
        Date expiration = new Date(now.getTime() + Duration.ofMinutes(5).toMillis()); // 만료기간 5분
     
        // 토큰 Builder
        String jwt = Jwts.builder()
                .setHeader(headers) // Headers 설정
                .setClaims(payloads) // Claims 설정
                .setSubject("findPw") // 토큰 용도 
                .setIssuedAt(now) // 발급시간(iat)
                .setExpiration(expiration) // 토큰 만료 시간 설정
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes()) // HS256과 Key로 Sign
                .compact(); // 토큰 생성

        return jwt;
    }
    
  //토큰 검증
    public Map<String, Object> verifyJWT(String jwt) throws UnsupportedEncodingException {
        Map<String, Object> claimMap = null;
        try {
            Claims claims = Jwts.parser()
                    .setSigningKey(secretKey.getBytes("UTF-8")) // Set Key
                    .parseClaimsJws(jwt) // 파싱 및 검증, 실패 시 에러
                    .getBody();

            claimMap = claims;

        } catch (ExpiredJwtException e) { // 토큰이 만료되었을 경우
            System.out.println(e);
        } catch (Exception e) { // 그외 에러났을 경우
            System.out.println(e);
        }
        return claimMap;
    }
    
}
