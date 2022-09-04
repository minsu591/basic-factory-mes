package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.BomMapper;
import com.mes.bf.cmn.service.BomService;
import com.mes.bf.cmn.vo.BomRscDtlVO;
import com.mes.bf.cmn.vo.BomRscVO;
import com.mes.bf.cmn.vo.BomVO;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

@Service
public class BomServiceImpl implements BomService {
	@Autowired BomMapper mapper;
	@Override
	public List<BomVO> listBom(String finName) {
		return mapper.listBom(finName);
	}
	@Override
	public List<BomRscDtlVO> findBomRsc(String bomCode) {
		return mapper.findBomRsc(bomCode);
	}
	@Override
	public int bomCodeDelete(List<String> bomDelList) {
		return mapper.bomCodeDelete(bomDelList);
	}
	@Override
	public int bomCodeInsert(BomVO bom) {
		return mapper.bomCodeInsert(bom);
	}
	@Override
	public int bomCodeUpdate(String priKey, String updCol, String updCont) {
		return mapper.bomCodeUpdate(priKey, updCol, updCont);
	}
	@Override
	public int bomRscDelete(List<String> rscDelList) {
		return mapper.bomRscDelete(rscDelList);
	}
	@Override
	public int bomRscInsert(BomRscVO bomRsc,String type) {
		return mapper.bomRscInsert(bomRsc, type);
	}
	@Override
	public int bomRscUpdate(String priKey, String updCol, String updCont) {
		return mapper.bomRscUpdate(priKey, updCol, updCont);
	}
	@Override
	public List<LineCodeVO> findProcForLine(String lineCode) {
		return mapper.findProcForLine(lineCode);
	}
	@Override
	public List<LineCodeHdVO> findLine() {
		return mapper.findLine();
	}

}
