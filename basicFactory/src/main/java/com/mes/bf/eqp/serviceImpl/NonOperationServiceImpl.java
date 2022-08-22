package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.NonOpVO;
import com.mes.bf.eqp.mapper.NonOperationMapper;
import com.mes.bf.eqp.service.NonOperationService;
import com.mes.bf.eqp.vo.FindNonOpHIstoryVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.NonOpHistoryVO;
import com.mes.bf.eqp.vo.VfindMchnVO;

@Service
public class NonOperationServiceImpl implements NonOperationService {

	@Autowired
	NonOperationMapper mapper;

	@Override
	public List<VfindMchnVO> findMchn(String procCdName) {

		return mapper.findMchn(procCdName);
	}

	@Override
	public List<NonOpVO> findNonOp(String nonOpCode, String nonOpName) {
		return mapper.findNonOp(nonOpCode, nonOpName);
	}

	@Override
	public List<FindNonOpHIstoryVO> findNonOpHistory(String sDate, String eDate, String mchnName, String nonOpCode) {
		return mapper.findNonOpHistory(sDate, eDate, mchnName, nonOpCode);
	}

	@Override
	public int startMchnStatusUpdate(String mchnCode) {
		// mapper.mchnStatusUpdate(mchnCode);
		return mapper.startMchnStatusUpdate(mchnCode);
	}

	@Override
	public int endMchnStatusUpdate(String mchnCode) {
		return mapper.endMchnStatusUpdate(mchnCode);
	}

	@Override
	public int findInputNo() {
		return mapper.findInputNo();
	}

	@Override
	public void insertNonOpHistory(NonOpHistoryVO vo) {
		mapper.insertNonOpHistory(vo);
	}

}
