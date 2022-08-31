package com.mes.bf.prod.vo;

import java.util.List;

import lombok.Data;

@Data
public class InstAndDetailVO {

	private InstructionVO vo;
	private List<InstructionDetailVO> detailvo;
}
