package com.mes.bf.eqp.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("NonOpHistoryVO")
public class FindNonOpHIstoryVO {

	private String mchnCode;
	private String mchnName;
	private Date inputDate;
	private String nonOpName;
	private String nonOpRsn;
	private int nonOpMin;
	private Date nonOpStartTime;
	private Date nonOpEndTime;
}
