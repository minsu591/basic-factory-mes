package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.rsc.vo.RscInspVO;

@Mapper
public interface RscInspMapper {
	List<RscInspVO> inspList(String rscInspCode, String rscCdCode, String rscInspSDate, String rscInspEDate);
}
