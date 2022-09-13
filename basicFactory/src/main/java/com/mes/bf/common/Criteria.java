package com.mes.bf.common;

import lombok.Data;

@Data
public class Criteria {
	private int pageNum = 1; // 현재페이지
	private int amount = 10; // 한페이지에 출력할 게시글 수

	private String type; //검색 분류 
	private String keyword; // 검색어
	private String keyword2;
	private String keyword3;

	public String[] getTypeArr() {

		return type == null ? new String[] {} : type.split("");
	}
}
