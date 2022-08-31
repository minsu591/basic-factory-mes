package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.vo.RscStockVO;

public interface FindRscCodeService {
	//자재코드 조회
	List<RscCodeVO> rscCodeList(String rscCdName, String rscCdClfy);
	
	//자재LOT번호 조회
	List<RscStockVO> rscLotNoList(String rscCdCode, String rscCdName);
}
