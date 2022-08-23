package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

@Mapper
public interface InstructionMapper {

	// 완제품조회
	List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName);

	// 생산지시조회
	List<VInstructionVO> findVInstruction(String instSdate, String instEdate, String vendorName, String productName);

	// 담당자 검색
	List<FindEmpVO> findEmp(String empName);

	// 완제품코드 검색
	VFindProdAndLineVO findProdName(String ProdCode);

	// 거래처 조회
	List<VendorCodeVO> findVendorCode(String vendorCode, String vendCdClfy);

	// 공정 상태 조회
	List<FindProcStatusVO> findProcStatus(String lineName);

	// 자재 소요 예상량 조회
	List<VRscNeedQtyVO> findVRscNeedQty(String finPrdCdCode);

	// 생산지시 헤더 입려
	boolean insertInstruction(InstructionVO vo);

	// 생산지시 상세 입력
	boolean insertInstructionDetail(InstructionDetailVO detailvo);

	// 공정테이블 데이터 입력
	void insertProc(String finPrdCdCode);

	// 자재소요예살양 데이터 입력
	void insertNeedQty(String finPrdCdCode);

	// 자재소요예상량 업데이트
	void updateNeedQty(String needQty,String rscCdCode);

}
