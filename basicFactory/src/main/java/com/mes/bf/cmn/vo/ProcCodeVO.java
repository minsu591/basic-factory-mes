package com.mes.bf.cmn.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("procCodeVO")
public class ProcCodeVO {
	private String procCdCode;
	private String procCdName;
	private String procCdRemk;
}
