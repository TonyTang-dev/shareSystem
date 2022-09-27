package com.starnet.Util;


import org.springframework.stereotype.Repository;

import javax.annotation.PostConstruct;
import java.sql.*;
import java.util.Properties;

@Repository("dbUtil")
public class DbUtil {

	// 需要用的驱动及配置参数
	private static String dbUrl;
	private static String driver;

	/**
	 *@description 当采用配置文件的时候，由于需要有一个入口处，而大多数都需要数据库，所以最先初始化的是数据库factory-methord
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
//	private static DbUtil dbUtil = new DbUtil();
//	private static DbUtil getInstance(){
//		return dbUtil;
//	}


	/**
	 *@description 加载驱动
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	@PostConstruct
	public void initDB(){
		Properties p = new Properties();
		try{
			p.load(this.getClass().getResourceAsStream("/dbConn.props"));

			DbUtil.driver = p.getProperty("db.driver");

			DbUtil.dbUrl = p.getProperty("db.url");
		}catch(Exception e){
			throw new RuntimeException("DB initial error");
		}

		System.out.println("数据库初始化完毕");
	}

	/**
	 *@description 加载驱动并获得连接
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public Connection getConn(){
		try{
			Class.forName(DbUtil.driver);
			return DriverManager.getConnection(dbUrl);
		}catch(Exception e){
			e.printStackTrace();
		}
		return null;
	}

	/**
	 *@description 释放所有资源
	 *@className: tang
	 *@author: TYF
	 *@date: 22-7-26
	*/
	public void releaseAll(Connection conn, PreparedStatement pstm, ResultSet rs){
		if(rs != null){
			try{
				rs.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		if(pstm != null){
			try{
				pstm.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
		if(conn != null){
			try{
				conn.close();
			}catch(SQLException e){
				e.printStackTrace();
			}
		}
	}
}
