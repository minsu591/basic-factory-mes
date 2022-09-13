package com.mes.bf.prod.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class NotInProcInstVO {
	 private int instNo; 
	 private int instProdNo;
	 private String finPrdCdCode;
     private int planIdx;
     private String planHdCode;
     private Date planSdate;
     private Date planEdate;
     private int instProdIndicaVol;
     private int planProdVol;
     private Date workDate;
}
