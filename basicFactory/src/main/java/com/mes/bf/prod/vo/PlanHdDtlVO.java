package com.mes.bf.prod.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("planHdDtl")
public class PlanHdDtlVO {
	private PlanHdVO planHdVO;
	private List<PlanVO> plans;
}
