package com.mes.bf.prod.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.InstructionVO;

@Mapper
public interface InstructionMapper {

	public InstructionVO getInst();
	
	
}
