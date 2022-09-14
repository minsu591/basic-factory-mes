package com.mes.bf.rsc.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.RscCodeVO;
import com.mes.bf.rsc.mapper.FindRscCodeMapper;
import com.mes.bf.rsc.service.FindRscCodeService;
import com.mes.bf.rsc.vo.RscInspVO;
import com.mes.bf.rsc.vo.RscOrderVO;
import com.mes.bf.rsc.vo.RscOutVO;
import com.mes.bf.rsc.vo.RscReturnVO;
import com.mes.bf.rsc.vo.RscStockVO;
@Service
public class FindRscCodeServiceImpl implements FindRscCodeService{
	
	@Autowired FindRscCodeMapper rscCodeMapper;
	
	@Override
	public List<RscCodeVO> rscCodeList(String rscCdName, String rscCdClfy,String rscCdCode) {
		return rscCodeMapper.rscCodeList(rscCdName, rscCdClfy, rscCdCode);
	}

	@Override
	public List<RscStockVO> rscLotNoList(String rscCdCode, String rscCdName) {
		return rscCodeMapper.rscLotNoList(rscCdCode, rscCdName);
	}
	
	@Override
	public List<RscStockVO> canRscLotNoList(String rscCdCode, String rscCdName) {
		return rscCodeMapper.canRscLotNoList(rscCdCode, rscCdName);
	}
	
	@Override
	public List<RscStockVO> rscLotNoListToReturn(String rscCdCode, String rscCdName, String vendCdCode) {
		return rscCodeMapper.rscLotNoListToReturn(rscCdCode, rscCdName, vendCdCode);
	}
	
	@Override
	public List<RscOrderVO> rscOrderList(String rscOrderTitle, String rscOrderDate, String empId) {
		return rscCodeMapper.rscOrderList(rscOrderTitle, rscOrderDate, empId);
	}

	@Override
	public List<RscOrderVO> rscOrderInspList(String rscOrderCode, String rscOrderTitle, String rscOrderDate) {
		return rscCodeMapper.rscOrderInspList(rscOrderCode, rscOrderTitle, rscOrderDate);
	}
	
	@Override
	public List<RscInspVO> rscInspList(String rscCdCode, String rscCdName, String rscInspDate) {
		return rscCodeMapper.rscInspList(rscCdCode, rscCdName, rscInspDate);
	}

	@Override
	public List<RscOutVO> modalOutList(String rscOutCode, String rscOutDate) {
		return rscCodeMapper.modalOutList(rscOutCode, rscOutDate);
	}

	@Override
	public List<RscReturnVO> modalReturnList(String rscReturnCode, String rscReturnDate) {
		return rscCodeMapper.modalReturnList(rscReturnCode, rscReturnDate);
	}

}
