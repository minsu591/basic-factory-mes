package com.mes.bf.common;

import lombok.Data;

@Data
public class Criteria {
	private int pageNum = 1; // 현재페이지
	private int amount = 10; // 한페이지에 출력할 게시글 수

	private String type;
	private String keyword;
	private String keyword2;

	public String[] getTypeArr() {

		return type == null ? new String[] {} : type.split("");
	}
}
