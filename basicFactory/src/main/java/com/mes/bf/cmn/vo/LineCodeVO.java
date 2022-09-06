package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("lineCodeVO")
public class LineCodeVO {
	private String lineCdCode;
	private String lineCdHdCode;
	private String lineCdHdName;
	private String procCdCode;
	private String procCdName;
	private String mchnCode;
	private String mchnName;
	private int lineCdOrd;
}
