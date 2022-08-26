package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.ProcCodeMapper;
import com.mes.bf.cmn.service.ProcCodeService;
import com.mes.bf.cmn.vo.ProcCodeVO;

@Service
public class ProcCodeServiceImpl implements ProcCodeService {

	@Autowired ProcCodeMapper mapper;
	@Override
	public List<ProcCodeVO> listProcCode(String procName) {
		return mapper.listProcCode(procName);
	}
	@Override
	public int procCodeUpdate(String priKey, String updCol, String updCont) {
		return mapper.procCodeUpdate(priKey, updCol, updCont);
	}
	@Override
	public int procCodeInsert(String procName, String procRemk) {
		return mapper.procCodeInsert(procName, procRemk);
	}
	@Override
	public int procCodeDelete(String priKey) {
		return mapper.procCodeDelete(priKey);
	}

}
