package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.prod.vo.VfindMchnVO;

@Mapper
public interface ProcMapper {

	// 설비전체조회
	List<VfindMchnVO> findAllMchn();
}
