package com.mes.bf.eqp.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.eqp.vo.VfindMchnVO;
@Mapper
public interface NonOperationMapper {

	//공정구분검색
	List<VfindMchnVO> findMchn(String procCdName);
}
