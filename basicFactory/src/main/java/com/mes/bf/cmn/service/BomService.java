package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomRscVO;
import com.mes.bf.cmn.vo.BomVO;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;


public interface BomService {
	List<BomVO> listBom(String finName);
	List<BomRscDtlVO> findBomRsc(String bomCode);
	
	int bomCodeDelete(String priKey);
	int bomCodeInsert(BomVO bom);
	int bomCodeUpdate(String priKey, String updCol, String updCont);

	int bomRscDelete(String priKey);
	int bomRscInsert(BomRscVO bomRsc);
	int bomRscUpdate(String priKey, String updCol, String updCont);
	
	List<LineCodeVO> findProcForLine(String lineCode);
	List<LineCodeHdVO> findLine();
}
