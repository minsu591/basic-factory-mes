package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscOutVO;

@Mapper
public interface RscOutMapper {
	List<RscOutVO> normalOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate);
	List<RscOutVO> exceptOutList(String rscOutCode, String rscCdCode, String rscOutSDate, String rscOutEDate);
	
	RscOutVO exceptOut(String rscOutCode);
	
	int OutInsert(RscOutVO vo);
	int OutUpdate(RscOutVO vo);
}
