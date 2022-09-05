package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscOrderVO;

@Mapper
public interface RscOrderMapper {
	
	//발주 리스트 조회
	List<RscOrderVO> orderDetailList(String rscOrderCode);
	
}
