package com.mes.bf.eqp.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("findNonOpHistoryVO")
public class FindNonOpHIstoryVO {

	private String mchnCode;
	private String mchnName;
	private Date inputDate;
	private String nonOpName;
	private String nonOpRsn;
	private int nonOpMin;
	private String nonOpStartTime;
	private String nonOpEndTime;
	private String nonOpRemk;
}
