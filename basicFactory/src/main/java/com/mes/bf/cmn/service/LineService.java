package com.mes.bf.cmn.service;

import java.util.List;

import com.mes.bf.cmn.vo.LineCodeHdVO;
import com.mes.bf.cmn.vo.LineCodeVO;

public interface LineService {
	List<LineCodeHdVO> listLineCodeHd(String lineName);
	List<LineCodeVO> listLineCode(String lineCode);
}
