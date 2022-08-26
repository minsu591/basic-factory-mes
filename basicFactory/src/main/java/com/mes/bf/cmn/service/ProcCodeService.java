package com.mes.bf.cmn.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mes.bf.cmn.vo.ProcCodeVO;

@Service
public interface ProcCodeService {
	List<ProcCodeVO> listProcCode(String procName);
	int procCodeUpdate(String priKey, String updCol, String updCont);
}
