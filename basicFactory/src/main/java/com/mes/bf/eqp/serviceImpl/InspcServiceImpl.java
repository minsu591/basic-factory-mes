package com.mes.bf.eqp.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mes.bf.common.Criteria;
import com.mes.bf.eqp.mapper.InspcMapper;
import com.mes.bf.eqp.service.InspcService;
import com.mes.bf.eqp.vo.InspcVO;
import com.mes.bf.eqp.vo.MchnVO;

@Service
public class InspcServiceImpl implements InspcService{
	
	@Autowired InspcMapper mapper;

	@Override
	public List<InspcVO> findInspcList(String inspcSdate, String inspcEdate) {
		return mapper.findInspcList(inspcSdate, inspcEdate);
	}
	
	@Override
	public List<MchnVO> findNxtDate() {
		return mapper.findNxtDate();
	}
	
	@Override
	public MchnVO findNxtDate(String mchnCode) {
		return mapper.findNxtDate(mchnCode);
	}
	
	@Override
	public List<InspcVO> listInspc() {
		return mapper.listInspc();
	}

	@Override
	public int inspcInsert(InspcVO vo) {
		return mapper.inspcInsert(vo);
	}

	@Override
	public int inspcUpdate(String prikey, String updCol, String updCont) {
		return mapper.inspcUpdate(prikey, updCol, updCont);
	}

	@Override
	public List<InspcVO> findListInspc(Criteria cri) {
		return mapper.findListInspc(cri);
	}

	@Override
	public Integer findListInspcCount(Criteria cri) {
		return mapper.findListInspcCount(cri);
	}

}
