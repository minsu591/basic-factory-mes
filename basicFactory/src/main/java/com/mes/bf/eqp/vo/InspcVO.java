package com.mes.bf.eqp.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("inspc")
public class InspcVO {
	
	private int inspcNo;	//점검번호
	private String mchnCode;	//설비코드
	private String mchnName; //설비명
	private Date mchnInspcNxtDate; //차기점검일
	private Date inspcSdate;	//점검시작일
	private Date inspcEdate;	//점검종료일
	private int mchnInspcCycle;	//점검주기
	private String inspcActnPnt;	//조치사항
	private String inspcActnRsn;	//조치사유
	private String inspcRemk;	//비고
	private String empId;	//직원 아이디
	private String empName;	//직원 이름

}
