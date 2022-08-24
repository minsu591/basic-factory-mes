package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Mapper
public interface RscInMapper {
	List<RscInVO> inList();
	List<RscInspVO> inspCompList();
	
	int inInsert(RscInspVO vo);
}
