package com.mes.bf.prod.vo;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("findProcStatusVO")
public class FindProcStatusVO {	
	private Integer lineCdOrd;
	private String procCdName;
	private String mchnName;
	private String mchnStts;
}
