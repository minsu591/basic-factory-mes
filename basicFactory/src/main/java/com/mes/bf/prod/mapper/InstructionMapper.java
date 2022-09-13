package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.EmpVO;
import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstAndDetailVO;
import com.mes.bf.prod.vo.InstructionDetailVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.NotInProcInstVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;
import com.mes.bf.prod.vo.VRscNeedQtyVO;

@Mapper
public interface InstructionMapper {

	// 완제품조회
	List<FinProdCodeVO> findProduct(String prdCdCode, String prdCdName);

	// 생산지시조회
	List<VInstructionVO> findVInstruction(String instSdate, String instEdate, String vendorName, String productName,String workScope);

	// 담당자 검색
	List<FindEmpVO> findEmp(String empName);

	// 완제품코드 검색
	VFindProdAndLineVO findProdName(String ProdCode);

	// 거래처 조회
	List<VendorCodeVO> findVendorCode(String vendorCode, String vendCdClfy);

	// 공정 상태 조회
	//List<FindProcStatusVO> findProcStatus(String lineName);
	List<FindProcStatusVO> findProcStatus(List<String> lineName);

	// 자재 소요 예상량 조회
	//List<VRscNeedQtyVO> findVRscNeedQty(String finPrdCdCode);
	List<VRscNeedQtyVO> findVRscNeedQty(List<String> finPrdCdCode);
	// 생산지시 헤더 입려
	boolean insertInstruction(InstructionVO vo);

	// 생산지시 상세 입력
	//boolean insertInstructionDetail(InstructionDetailVO detailvo);
	
	//생산지시 통합 입력
	void insertInstAndDetail(InstAndDetailVO vo);
	void insertInstructionDetailList(InstructionDetailVO vo);

	// 공정테이블 데이터 입력
	void insertProc(String finPrdCdCode);

	// 자재소요예살양 데이터 입력
	void insertNeedQty(String finPrdCdCode);

	// 자재소요예상량 업데이트
	void updateNeedQty(String needQty, String rscCdCode);

	// 제품코드로 설비명,상태조회
	List<MchnVO> selectMchn(String finPrdCdCode);

	// 최초 공정 입고량 업데이트
	void updateinDtlVol(int indicaVol);
	
	//생산지시 업데이트 
	void updateInst(VInstructionVO vo);
	
	//생산지시 헤더 조회
	InstructionVO getInst(int instNo);
	
	//직원 아이디로 직원 이름 찾기 
	EmpVO getEmpName(String empId);
	
	//생산지시 통합업데이트
	void updateInstruction(InstAndDetailVO vo);
	
	//생산지시 헤더 업데이트
	void updateInstHeader(InstructionVO vo);
	
	//생산지시 디테일 업데이트
	void updateInstDetail(InstructionDetailVO str);
	
	//생산지시 삭제 
	void deleteInst(InstructionDetailVO vo);
	
	//생산지시 헤더 조회
	List<InstructionVO> findInst(String instSdate,String instEdate); 
	
	//진행전 생산지시 데이터
	List<NotInProcInstVO> findNotInProcInst(int instNo);
	
	//생산지시 헤더 삭제 
	void deleteInstHd(InstructionVO vo);
	
}
