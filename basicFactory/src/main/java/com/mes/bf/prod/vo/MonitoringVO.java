package com.mes.bf.prod.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("MonitoringVO")
public class MonitoringVO {

	private String mchnName;
	private String procCdName;
	private String prodName;
	private int indicaVol;
	private int totalVol;
	private int fltyVol;
	private int achieRate;
	private Date workDate;
	private int inDtlVol;

}
