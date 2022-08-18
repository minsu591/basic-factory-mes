package com.mes.bf.prod.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("planVO")
public class PlanVO {
	private int planIdx;
	private String planHdCode;
	private String finPrdCdCode;
	private int planProdVol;
	private Date planSdate;
	private Date planEdate;
	private String planRemk;
}
