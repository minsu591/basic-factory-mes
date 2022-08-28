package com.mes.bf.sales.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;
import com.mes.bf.sales.vo.SlsOutHdVO;

@Mapper
public interface SlsOutMapper {
	List<SlsOutHdDtlVO> findAllOut();
	List<SlsOutHdDtlVO> findOut(String outSdate, String outEdate, String vendorName);
	List<SlsOrdHdDtlVO> findNotOut(String ordSdate, String ordEdate);
	List<SlsOutDtlVO> findNotOutDtl(String slsOrdHdNo);
	List<SlsOutHdVO> outView(String outSdate, String outEdate);
	List<SlsOutDtlVO> outDtlView(String slsOutHdNo);
}
