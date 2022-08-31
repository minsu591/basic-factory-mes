package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("planVO")
public class PlanVO {
	private int planIdx;
	private String planHdCode;
	private String finPrdCdCode;
	private String finPrdCdName;
	private int planProdVol;
	private Date planSdate;
	private Date planEdate;
	private String planRemk;
	private Integer instProdIndicaVol;
	private Integer planPreVol;
}
