package com.mes.bf.rsc.service;

import java.util.List;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.vo.RscOrderVO;
import com.mes.bf.rsc.vo.RscOutVO;
import com.mes.bf.rsc.vo.RscReturnVO;
import com.mes.bf.rsc.vo.RscStockVO;

public interface FindRscCodeService {
	//자재코드 조회
	List<RscCodeVO> rscCodeList(String rscCdName, String rscCdClfy);
	
	//자재LOT번호 조회
	List<RscStockVO> rscLotNoList(String rscCdCode, String rscCdName);
	
	//최근 발주리스트 조회
	List<RscOrderVO> rscOrderList(String rscOrderTitle, String rscOrderDate, String empId);
	
	//검사관리용 발주리스트 조회
	List<RscOrderVO> rscOrderInspList(String rscOrderCode, String rscOrderTitle, String rscOrderDate);
	
	//최근 출고리스트 조회
	List<RscOutVO> modalOutList(String rscOutCode, String rscOutDate);
	
	//반품리스트 조회
	List<RscReturnVO> modalReturnList(String rscReturnCode, String rscReturnDate);
}
