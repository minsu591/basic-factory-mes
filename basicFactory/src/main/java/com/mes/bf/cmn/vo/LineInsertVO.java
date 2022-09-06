package com.mes.bf.cmn.vo;

import java.util.List;

import lombok.Data;

@Data
public class LineInsertVO {
	private List<LineCodeHdVO> line;
	private List<LineCodeVO> lineDtl;
}
