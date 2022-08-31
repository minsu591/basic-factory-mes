package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("prodRscOutVo")
public class ProdRscOutVO {

	private int processNo;
	private String finPrdCdCode;
	private String inDtlVol;
	private String empId;
}
