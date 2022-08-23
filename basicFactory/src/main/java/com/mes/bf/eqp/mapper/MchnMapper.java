package com.mes.bf.eqp.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnVO;

@Mapper
public interface MchnMapper {
	
	//설비 조회
	List<MchnVO> MchnAllList();
	
	//설비 코드별 조회
	List<MchnVO> findMchn(Map<String, Object> params);

}
