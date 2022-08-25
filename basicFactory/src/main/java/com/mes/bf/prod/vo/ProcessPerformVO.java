package com.mes.bf.prod.vo;

import java.util.Date;

import org.apache.ibatis.type.Alias;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

//공정실적
@Data
@Alias("ProcessPerformVO")
public class ProcessPerformVO {
	private Integer processPerformNo;
	private Integer processNo;
	private Integer prodVol;
	private Integer fltyVol;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date workStartTime;
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm")
	private Date workEndTime;
	private String perpormRemk;
	private String workerName;
	
	
}
