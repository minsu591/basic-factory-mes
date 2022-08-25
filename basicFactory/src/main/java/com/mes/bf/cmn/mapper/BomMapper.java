package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomVO;

@Mapper
public interface BomMapper {
	List<BomVO> listBom(String finName);
	List<BomRscDtlVO> findBomRsc(String bomCode);
}
