package com.starnet.controller;

import com.starnet.service.UserService;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import javax.annotation.Resource;

@Controller
@EnableScheduling
public class TimerTaskController {
	@Resource(name = "userService")
	private UserService userService;

	/**
	 *@description 定时刷新积分排名
	 *@className: tang
	 *@author: TYF
	 *@date: 22-8-19
	*/
	@Scheduled(cron = "* 1 * * * ?")
	public void addBaseCount(){
		System.out.println("[INFO]=>重排名");
		userService.reRankCredit();
	}
}
