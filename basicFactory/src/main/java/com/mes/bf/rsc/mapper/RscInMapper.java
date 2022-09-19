package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.common.Criteria;
import com.mes.bf.rsc.vo.RscInVO;
import com.mes.bf.rsc.vo.RscInspVO;

@Mapper
public interface RscInMapper {
	List<RscInVO> inList(Criteria cri);
	Integer inListCount(Criteria cri);
	
	List<RscInspVO> inspCompList(Criteria cri);
	Integer inspCompListCount(Criteria cri);
	
	int inInsert(RscInspVO vo);
}
