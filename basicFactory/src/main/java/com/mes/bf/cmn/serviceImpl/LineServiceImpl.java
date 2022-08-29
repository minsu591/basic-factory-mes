package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.LineMapper;
import com.mes.bf.cmn.service.LineService;
import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

@Service
public class LineServiceImpl implements LineService {
	@Autowired LineMapper mapper;
	@Override
	public List<LineCodeHdVO> listLineCodeHd(String lineName) {
		return mapper.listLineCodeHd(lineName);
	}
	@Override
	public List<LineCodeVO> listLineCode(String lineCode) {
		return mapper.listLineCode(lineCode);
	}
	@Override
	public int lineCodeHdInsert(String lineName) {
		return mapper.lineCodeHdInsert(lineName);
	}
	@Override
	public int lineCodeHdUpdate(String priKey, String updCol, String updCont) {
		return mapper.lineCodeHdUpdate(priKey, updCol, updCont);
	}
	@Override
	public int lineCodeHdDelete(String priKey) {
		return mapper.lineCodeHdDelete(priKey);
	}
	@Override
	public int lineCodeInsert(LineCodeVO line) {
		return mapper.lineCodeInsert(line);
	}
	@Override
	public int lineCodeUpdate(String priKey, String updCol, String updCont) {
		return mapper.lineCodeUpdate(priKey, updCol, updCont);
	}
	@Override
	public int lineCodeDelete(String priKey) {
		return mapper.lineCodeDelete(priKey);
	}

}
