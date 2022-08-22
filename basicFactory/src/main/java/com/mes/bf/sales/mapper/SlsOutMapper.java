package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsOutHdDtlVO;

@Mapper
public interface SlsOutMapper {
	List<SlsOutHdDtlVO> findAllOut();
	List<SlsOutHdDtlVO> findOut(String ordSdate, String ordEdate, String vendorName);
}
