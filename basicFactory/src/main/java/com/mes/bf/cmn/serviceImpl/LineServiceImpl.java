package com.mes.bf.cmn.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.cmn.mapper.LineMapper;
import com.mes.bf.cmn.service.LineService;
import com.mes.bf.cmn.vo.LineCodeHdVO;

@Service
public class LineServiceImpl implements LineService {
	@Autowired LineMapper mapper;
	@Override
	public List<LineCodeHdVO> listLineCodeHd() {
		return mapper.listLineCodeHd();
	}

}
