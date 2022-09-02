package com.mes.bf.cmn.vo;

import java.util.List;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("bomRscIns")
public class BomRscInsVO {
	private BomVO bom;
	private List<BomRscVO> bomRscs;
}
