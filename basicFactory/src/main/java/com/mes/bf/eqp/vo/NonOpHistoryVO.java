package com.mes.bf.eqp.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("NonOpHistoryVO")
public class NonOpHistoryVO {

	private String inputNo;
	private String mchnCode;
	private String nonOpCode;
	private String empId;
	private Date inputDate;
	private int nonOpMin;
	private String nonOpStartTime;
	private String nonOpEndTime;
	private String nonOpRemk;
	private String nonOpRsn;
	
	
	
}
