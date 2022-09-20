package com.mes.bf.cmn.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.mes.bf.cmn.vo.EmpVO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String uri = request.getRequestURI();
		log.debug("================================");
		log.debug(uri);
		log.debug("================================");
		HttpSession session = request.getSession();
		EmpVO emp = (EmpVO) session.getAttribute("emp");
		String linkDept = uri.split("/")[1];
		if(emp == null) {
			response.sendRedirect("/cmn/login");
			return false;
		}else if(!linkDept.equals("common") && emp.getEmpPos().equals("직원") && !linkDept.equals(emp.getDeptLinkCode())) {
			response.sendRedirect("/cmn/login");
			return false;
		}
		
		return HandlerInterceptor.super.preHandle(request, response, handler);
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		HandlerInterceptor.super.postHandle(request, response, handler, modelAndView);
	}

}
