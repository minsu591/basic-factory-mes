package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.mapper.ProcMapper;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.VFindProcPerformVO;

@Service
public class ProcServiceImpl implements ProcService {

	@Autowired ProcMapper mapper;
	
	@Override
	public List<VfindMchnVO> findAllMchn() {
		return mapper.findAllMchn();
	}

	@Override
	public List<ProcCodeVO> findAllProcCode() {
		return mapper.findAllProcCode();
	}

	@Override
	public List<VFindProcPerformVO> findAllProcPerform() {
		return mapper.findAllProcPerform();
	}

	@Override
	public ProcCodeVO findProcCode(String procCdCode, String procCdName) {
		return mapper.findProcCode(procCdCode, procCdName);
	}

	@Override
	public VfindMchnVO findMchn(String mchnCode, String mchnName) {
		return mapper.findMchn(mchnCode, mchnName);
	}

}
