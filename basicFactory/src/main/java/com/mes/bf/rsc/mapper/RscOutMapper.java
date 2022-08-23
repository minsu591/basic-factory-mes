package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscOutVO;

@Mapper
public interface RscOutMapper {
	List<RscOutVO> normalOutList();
	List<RscOutVO> exceptOutList();
}
