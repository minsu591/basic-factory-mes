package com.mes.bf.cmn.vo;

import java.util.List;

import lombok.Data;

@Data
public class BomInsertVO {
	private List<BomVO> boms;
	private List<BomRscVO> rscs;
}
