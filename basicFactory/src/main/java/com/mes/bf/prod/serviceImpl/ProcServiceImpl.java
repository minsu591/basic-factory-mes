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

	@Autowired
	ProcMapper mapper;

	@Override
	public List<VfindMchnVO> findMchn(String mchnCode, String mchnName) {
		return mapper.findMchn(mchnCode, mchnName);
	}

	@Override
	public List<ProcCodeVO> findProcCode(String procCdCode, String procCdName) {
		return mapper.findProcCode(procCdCode, procCdName);
	}

	@Override
	public List<VFindProcPerformVO> findProcPerform(String workSdate, String workEdate, String procCdName,
			String mchnName, String empId) {
		return mapper.findProcPerform(workSdate, workEdate, procCdName, mchnName, empId);
	}

}
