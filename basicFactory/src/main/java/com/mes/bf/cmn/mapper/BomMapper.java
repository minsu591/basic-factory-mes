package com.mes.bf.cmn.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomRscVO;
import com.mes.bf.cmn.vo.BomVO;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

@Mapper
public interface BomMapper {
	List<BomVO> listBom(String finName);
	List<BomRscDtlVO> findBomRsc(String bomCode);
	
	int bomCodeDelete(List<String> bomDelList);
	int bomCodeInsert(BomVO bom);
	int bomCodeUpdate(String priKey, String updCol, String updCont);
	
	int bomRscDelete(List<String> rscDelList);
	int bomRscInsert(BomRscVO bomRsc,String type);
	int bomRscUpdate(String priKey, String updCol, String updCont);
	
	List<LineCodeVO> findProcForLine(String lineCode);
	List<LineCodeHdVO> findLine();
}
