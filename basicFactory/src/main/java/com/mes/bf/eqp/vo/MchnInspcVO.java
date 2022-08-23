package com.mes.bf.eqp.vo;

import java.sql.Date;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("MchnInspcVO")
public class MchnInspcVO {
	
	private int inspc_no;	//점검번호
	private String mchn_code;	//설비코드
	private Date inspc_sdate;	//점검시작일
	private Date inspc_edate;	//점검종료일
	private Date inspc_nxt_date;	//차기점검일
	private String inspc_actn_pnt;	//조치사항
	private String inspc_actn_rsn;	//조치사유
	private String inspc_remk;	//비고
	private String emp_id;	//직원 아이디

}
