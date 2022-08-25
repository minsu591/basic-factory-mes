package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnVO;

@Mapper
public interface MchnMapper {
	
	//설비관리
	
	
	//설비조회
	List<MchnVO> listMchn(String mchnCode);

}
