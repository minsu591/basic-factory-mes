package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("lineCodeHd")
public class LineCodeHdVO {
	private String lineCdHdCode;
	private String lineCdHdName;
	private String finPrdCdCode;
	private String finPrdCdName;
	
}
