package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("lineCodeVO")
public class LineCodeVO {
	private int lineCdNo;
	private String lineCdHdCode;
	private String procCdCode;
	private String mchnCode;
	private int lineCdOrd;
}
