package com.mes.bf.prod.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

public interface InstructionService {

	// 완제품 조회
	List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName);

	// 생산지시조회
	List<VInstructionVO> findVInstruction(String instSdate,String instEdate,String vendorName,String productName);

	// 담당자 검색
	List<FindEmpVO> findEmp(String empName);

	// 완제품코드 검색
	VFindProdAndLineVO findProdName(String ProdCode);

	// 거래처 조회
	List<VendorCodeVO> findVendorCode(String vendorCode, String vendCdClfy);

	// 공정 상태 조회
	List<FindProcStatusVO> findProcStatus(String lineName);
	
	//자재 소요 예상량 조회
	List<VRscNeedQtyVO> findVRscNeedQty (String lineCdHdName);
	
	//생산지시 입력
	void insertInstruction(InstructionVO vo,InstructionDetailVO detailvo);
	//공정테이블 데이터 입력
	void insertProc(String finPrdCdCode);
}
