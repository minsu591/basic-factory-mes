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
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.ff")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date nonOpStartTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss.ff")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date nonOpEndTime;
	private String nonOpRemk;
	private String nonOpRsn;
	
	
	
}
