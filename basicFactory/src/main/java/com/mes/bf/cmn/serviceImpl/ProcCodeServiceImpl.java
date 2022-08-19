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
	public List<ProcCodeVO> listProcCode() {
		return mapper.listProcCode();
	}

}
