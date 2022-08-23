package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsRtnHdDtlVO;

@Mapper
public interface SlsRtnMapper {
	//반품내역 전체조회
	List<SlsRtnHdDtlVO> findAllReturn();
}
