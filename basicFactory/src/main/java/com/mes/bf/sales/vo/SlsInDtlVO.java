package com.mes.bf.sales.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("slsInDtlVO")
public class SlsInDtlVO {
	private String slsInDtlNo;	//입고번호
}
