package com.mes.bf.sales.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.sales.mapper.SlsRtnMapper;
import com.mes.bf.sales.service.SlsRtnService;
import com.mes.bf.sales.vo.SlsOutDtlVO;
import com.mes.bf.sales.vo.SlsRtnDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdDtlVO;
import com.mes.bf.sales.vo.SlsRtnHdVO;

@Service
public class SlsRtnServiceImpl implements SlsRtnService{

	@Autowired SlsRtnMapper mapper;
	
	@Override
	public List<SlsRtnHdDtlVO> findAllReturn() {
		return mapper.findAllReturn();
	}

	@Override
	public List<SlsRtnHdDtlVO> findReturn(String rtnSdate, String rtnEdate, String prcCls, String vendorName) {
		return mapper.findReturn(rtnSdate, rtnEdate, prcCls, vendorName);
	}

	@Override
	public List<SlsRtnHdVO> returnView(String rtnSdate, String rtnEdate) {
		return mapper.returnView(rtnSdate, rtnEdate);
	}

	@Override
	public List<SlsRtnHdDtlVO> returnDtlView(String slsRtnHdNo) {
		return mapper.returnDtlView(slsRtnHdNo);
	}

	@Override
	public void rtnInsertHd(SlsRtnHdVO vo) {
		mapper.rtnInsertHd(vo);
	}

	@Override
	public void rtnInsertDtl(SlsRtnDtlVO vo) {
		mapper.rtnInsertDtl(vo);
	}

	@Override
	public void rtnUpdate(String priKey, String updCol, String updCont) {
		mapper.rtnUpdate(priKey, updCol, updCont);
	}

	@Override
	public void callProcRtnDtlUpdate(String priKey, String updCont) {
		mapper.callProcRtnDtlUpdate(priKey, updCont);
	}
	
	@Override
	public void rtnHdDelete(String slsRtnHdNo) {
		mapper.rtnHdDelete(slsRtnHdNo);
	}

	@Override
	public void rtnDelete(SlsRtnDtlVO vo) {
		mapper.rtnDelete(vo);
	}

	@Override
	public List<SlsRtnDtlVO> rtnDtlNoSelect(SlsRtnDtlVO vo) {
		return mapper.rtnDtlNoSelect(vo);
	}
}
