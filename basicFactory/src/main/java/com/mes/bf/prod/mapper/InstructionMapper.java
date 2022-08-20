package com.mes.bf.prod.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.cmn.vo.FinProdCodeVO;
import com.mes.bf.cmn.vo.VendorCodeVO;
import com.mes.bf.prod.vo.FindEmpVO;
import com.mes.bf.prod.vo.FindProcStatusVO;
import com.mes.bf.prod.vo.InstructionVO;
import com.mes.bf.prod.vo.VFindProdAndLineVO;
import com.mes.bf.prod.vo.VInstructionVO;

@Mapper
public interface InstructionMapper {

	InstructionVO getInst();

	// 완제품코드 전체조회
	List<FinProdCodeVO> findAllProduct();

	// 완제품코드,명으로 검색
	FinProdCodeVO findProduct(String prdCdCode, String prdCdName);

	// 생산지시조회
	List<VInstructionVO> findAllvInstruction();

	// 담당자 검색
	List<FindEmpVO> findEmp();

	// 이름으로 검색
	FindEmpVO findEmpName(String empName);

	// 완제품코드 검색
	VFindProdAndLineVO findProdName(String ProdCode);
	
	//거래처 조회
	List<VendorCodeVO> findAllVendorCode();
	
	//공정 상태 조회
	List<FindProcStatusVO> findProcStatus(String lineName);

}
