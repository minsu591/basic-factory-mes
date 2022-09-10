package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscReturnVO;

@Mapper
public interface RscReturnMapper {
	List<RscReturnVO> returnList(String rscReturnCode, String vendor, String rscReturnSDate, String rscReturnEDate);	
	
	//등록&수정
	int returnInsert(RscReturnVO vo);
	int returnUpdate(RscReturnVO vo);
}
