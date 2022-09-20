package com.mes.bf.prod.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstAndDetailVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.NotInProcInstVO;
import com.mes.bf.prod.vo.ProcessVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

public interface InstructionService {

	// 완제품 조회
	List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName);

	// 생산지시조회
	List<VInstructionVO> findVInstruction(String instSdate, String instEdate, String vendorName, String productName,
			String workScope);

	// 담당자 검색
	List<FindEmpVO> findEmp(String empName,String deptNo);

	// 완제품코드 검색
	VFindProdAndLineVO findProdName(String ProdCode);

	// 거래처 조회
	List<VendorCodeVO> findVendorCode(String vendorCode, String vendCdClfy);

	// 공정 상태 조회
	// List<FindProcStatusVO> findProcStatus(String lineName);
	List<FindProcStatusVO> findProcStatus(List<String> lineName);

	// 자재 소요 예상량 조회
	// List<VRscNeedQtyVO> findVRscNeedQty(String finPrdCdCode);
	List<VRscNeedQtyVO> findVRscNeedQty(List<String> finPrdCdCode);

	// 생산지시 입력
	// void insertInstruction(InstructionVO vo, InstructionDetailVO detailvo);
	// 생산지시 통합 입력
	void insertInstAndDetail(InstAndDetailVO vo);

	// 자재소요예상량 업데이트
	void updateNeedQty(String needQty, String rscCdCode);

	// 생산지시 업데이트
	void updateInst(VInstructionVO vo);

	// 생산지시 헤더 조회
	InstructionVO getInst(int instNo);

	// 직원 아이디로 직원 이름 찾기
	EmpVO getEmpName(String empId);

	// 생산지시 통합업데이트
	void updateInstruction(InstAndDetailVO vo);

	// 생산지시 삭제
	void deleteInst(InstructionDetailVO vo);

	// 생산지시 헤더 조회
	List<InstructionVO> findInst(String instSdate,String instEdate);

	// 진행전 생산지시 데이터
	List<NotInProcInstVO> findNotInProcInst(int instNo);

	// 생산지시 헤더 삭제
	void deleteInstHd(InstructionVO vo);

}
