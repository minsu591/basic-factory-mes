package com.mes.bf.prod.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mes.bf.cmn.vo.ProcCodeVO;
import com.mes.bf.eqp.vo.MchnVO;
import com.mes.bf.eqp.vo.VfindMchnVO;
import com.mes.bf.prod.mapper.ProcMapper;
import com.mes.bf.prod.service.ProcService;
import com.mes.bf.prod.vo.ProcManageVO;
import com.mes.bf.prod.vo.ProcessPerformVO;
import com.mes.bf.prod.vo.ProcessVO;
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

	@Override
	public List<ProcManageVO> findProcManage() {
		return mapper.findProcManage();
	}

	@Override
	public List<ProcessVO> findProcess(int instProdNo) {
		return mapper.findProcess(instProdNo);
	}

	@Override
	public List<MchnVO> selectMchn(String finPrdCdCode) {
		return mapper.selectMchn(finPrdCdCode);
	}

	@Override
	public void updateProcVol(ProcessVO vo) {
		mapper.updateProcVol(vo);
	}

	@Override
	@Transactional
	public void updateFltyVol(ProcessVO vo) {
		mapper.updateFltyVol(vo);
		mapper.updateProcVol(vo);
	}

	@Override
	public void updateMchnStts(MchnVO vo) {
		mapper.updateMchnStts(vo);	
	}


	@Override
	public void updateProcCheck(ProcessVO vo) {
		mapper.updateProcCheck(vo);
	}

	@Override
	public void insertProcPerform(ProcessPerformVO vo) {
		mapper.insertProcPerform(vo);
	}

	@Override
	public void updateProcInDtlVol(ProcessVO vo) {
		mapper.updateProcInDtlVol(vo);
	}

	@Override
	public ProcessPerformVO getProcPerform(int processNo) {
		return mapper.getProcPerform(processNo);
	}

	@Override
	public void updateachieRate(ProcessVO vo) {
		mapper.updateachieRate(vo);
	}

}
