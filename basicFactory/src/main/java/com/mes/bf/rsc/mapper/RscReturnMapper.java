package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscReturnVO;

@Mapper
public interface RscReturnMapper {
	List<RscReturnVO> returnList();	
}