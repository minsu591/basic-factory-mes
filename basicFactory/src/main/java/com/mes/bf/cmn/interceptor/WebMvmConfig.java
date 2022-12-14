package com.mes.bf.cmn.interceptor;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvmConfig implements WebMvcConfigurer {

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new LoginInterceptor())
				.addPathPatterns("/prod/**","/cmn/**","/eqp/**","/rsc/**","/sls/**","/common/**")
				.excludePathPatterns("/cmn/login","/cmn/login/check","/cmn/login/reset","/cmn/login/reset/**");
		//		.excludePathPatterns("/css/**","/fonts/**","/plugin/**");
	}
}
