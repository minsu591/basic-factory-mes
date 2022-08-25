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

}
