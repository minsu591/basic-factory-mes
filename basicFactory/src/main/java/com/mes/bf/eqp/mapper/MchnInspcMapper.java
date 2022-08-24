package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.MchnInspcVO;

@Mapper
public interface MchnInspcMapper {
	
	List<MchnInspcVO> listInspc();

}
