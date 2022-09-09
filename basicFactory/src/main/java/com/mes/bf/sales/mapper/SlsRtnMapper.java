package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsRtnDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdVO;

@Mapper
public interface SlsRtnMapper {
	List<SlsRtnHdDtlVO> findAllReturn();
	List<SlsRtnHdDtlVO> findReturn(String rtnSdate, String rtnEdate, String prcCls, String vendorName);
	List<SlsRtnHdVO> returnView(String rtnSdate, String rtnEdate);
	List<SlsRtnHdDtlVO> returnDtlView(String slsRtnHdNo);
	void rtnInsertHd(SlsRtnHdVO vo);
	void rtnInsertDtl(SlsRtnDtlVO vo);
	void rtnHdDelete(String slsRtnHdNo);
	void rtnDelete(List<String> delList);
}
