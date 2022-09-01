package com.mes.bf.rsc.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.vo.RscOutVO;
import com.mes.bf.rsc.vo.RscReturnVO;
import com.mes.bf.rsc.vo.RscStockVO;
@Mapper
public interface FindRscCodeMapper {
	//자재코드 조회
	List<RscCodeVO> rscCodeList(String rscCdName, String rscCdClfy);
	
	//자재LOT번호 조회
	List<RscStockVO> rscLotNoList(String rscCdCode, String rscCdName);
	
	//최근 출고리스트 조회
	List<RscOutVO> modalOutList(String rscOutCode, String rscOutDate);
	
	//반품리스트 조회
	List<RscReturnVO> modalReturnList(String rscReturnCode, String rscReturnDate);
}
