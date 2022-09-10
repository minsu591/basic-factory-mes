package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.sales.mapper.SlsOutMapper;
import com.mes.bf.sales.service.SlsOutService;
import com.mes.bf.sales.vo.SlsOrdHdDtlVO;
import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsOutHdDtlVO;
import com.mes.bf.sales.vo.SlsOutHdVO;

@Service
public class SlsOutServiceImpl implements SlsOutService {

	@Autowired SlsOutMapper mapper;
	
	@Override
	public List<SlsOutHdDtlVO> findAllOut() {
		return mapper.findAllOut();
	}

	@Override
	public List<SlsOutHdDtlVO> findOut(String ordSdate, String ordEdate, String vendorName) {
		return mapper.findOut(ordSdate, ordEdate, vendorName);
	}

	@Override
	public List<SlsOrdHdDtlVO> findNotOut(String ordSdate, String ordEdate) {
		return mapper.findNotOut(ordSdate, ordEdate);
	}

	@Override
	public List<SlsOutHdDtlVO> findNotOutDtl(String slsOrdHdNo) {
		return mapper.findNotOutDtl(slsOrdHdNo);
	}

	@Override
	public List<SlsOutHdVO> outView(String outSdate, String outEdate) {
		return mapper.outView(outSdate, outEdate);
	}

	@Override
	public List<SlsOutDtlVO> outDtlView(String slsOutHdNo) {
		return mapper.outDtlView(slsOutHdNo);
	}

	@Override
	public void outInsertHd(SlsOutHdVO vo) {
		mapper.outInsertHd(vo);
	}

	@Override
	public void outInsertDtl(SlsOutDtlVO vo) {
		mapper.outInsertDtl(vo);
	}

	@Override
	public void outUpdate(String slsOutDtlNo, String slsOutDtlVol) {
		mapper.outUpdate(slsOutDtlNo, slsOutDtlVol);
	}
	
	@Override
	public void outHdDelete(String slsOutHdNo) {
		mapper.outHdDelete(slsOutHdNo);
	}

	@Override
	public void outDelete(List<String> delList) {
		mapper.outDelete(delList);
	}

	@Override
	public List<SlsOutDtlVO> outDtlViewToReturn(String slsOutHdNo) {
		return mapper.outDtlViewToReturn(slsOutHdNo);
	}

	@Override
	public int checkOrder(String slsOrdHdNo) {
		return mapper.checkOrder(slsOrdHdNo);
	}
}
