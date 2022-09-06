package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("FindProcFlty")
public class FindProcFltyVO {
	
	private Integer processPerfomNo;
	private String finPrdCdCode;
	private String finPrdCdName;
	private Integer fltyVol;
	private String procCdName;
	private String mchnName;
	private Date workDate;
	private String workerName;
	private Integer fltyPrcsVol;

}
