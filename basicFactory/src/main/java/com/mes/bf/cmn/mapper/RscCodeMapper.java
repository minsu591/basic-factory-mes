package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.RscCodeVO;

@Mapper
public interface RscCodeMapper {
	
	List<RscCodeVO> listRsc(String rscCode);

}
