package com.mes.bf.rsc.vo;

import java.util.List;

import lombok.Data;

@Data
public class RscOrderDtlVO {
	private RscOrderVO RscOrderVO;
	private List<RscOrderVO> orders; 
}
