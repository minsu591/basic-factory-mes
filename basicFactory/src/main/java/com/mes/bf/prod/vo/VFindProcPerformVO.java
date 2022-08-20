package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("vfindprocperformVO")
public class VFindProcPerformVO {
	private Integer instNo;
	private Integer processPerfomNo;
	private Date workDate;
	private String finPrdCdCode;
	private String finPrdCdName;
	private String procCdName;
	private String mchnName;
	private String workerName;
	private Integer prodVol;
	private Integer fltyVol;
	private String perfomeRemk;
}
