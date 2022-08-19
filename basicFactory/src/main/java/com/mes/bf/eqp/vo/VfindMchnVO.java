package com.mes.bf.eqp.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("vmchn")
public class VfindMchnVO {

	private String mchnCode;
	private String mchnName;
	private String mchnStts;
	private String procCdName;
	
}
