﻿<%@page import="com.github.pagehelper.PageInfo"%>
<%@ page isELIgnored="false" %>
<%@page import="com.km.jxpt.pojo.TbUser"%>
<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<head>
<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=0.3, maximum-scale=1.0, minimum-scale=0.3">
<link rel="shortcut icon" href="https://www.keming365.com/upload/favicon.ico">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<%
	request.setCharacterEncoding("UTF-8") ;
	String appContext = request.getContextPath();
	String contextPath =request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort() + appContext;
	PageInfo pageInfo = (PageInfo)request.getAttribute("pageInfo");
	HttpSession session1 = request.getSession();
	TbUser user = new TbUser();
	if(session1!=null){
		user = (TbUser)session1.getAttribute("user");
	}
	String classifyId = null;
	String courseid = request.getParameter("courseid");
	classifyId = request.getParameter("classifyId");
	classifyId = request.getParameter("classifyId");
	if (classifyId != null) {
		classifyId = classifyId.split("\\?")[0];
	}
%>
<title>科明365VR教学云平台——VR教学资源┃在线教学┃在线实验┃在线实训┃线上-线下-混合式金课┃一流课程┃虚拟仿真项目</title>
<meta name="keywords" content="VR虚拟现实教学、虚拟仿真实验共享平台、虚拟仿真教学软件、在线教学、科明教育云平台、高校" />
<meta name="description" content="科明365VR教学云平台是国内优质的虚拟仿真教育在线学习平台。平台拥有高等教育机械类、土木类、数十个专业的1100多个教学、实验资源。每一个有志学习的人，都可以在这里学习优质教学课程，与名师零距离交流。咨询热线：4000-927-928"/>
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/common.css">
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/css/bootstrap.css">
<link rel="stylesheet" type="text/css" href="<%=contextPath%>/js/layui/css/layui.css">
<script type="text/javascript" src="<%=contextPath%>/js/layui/layui.js" ></script>
<script src="<%=contextPath%>/js/jxptUrl.js"></script>
<script src="<%=contextPath%>/js/vue.min.js" type="text/javascript" charset="utf-8"></script>
<script>
layui.use('element', function(){
	var element = layui.element;
	element.on('tab(demo)', function(data){
		if(data.index == 0 || data.index == 1 || data.index == 2 || data.index == 3){
			$(document).resize()
		}
	});
});
</script>
<style type="text/css">
.layui-nav-tree .layui-nav-bar {
    width: 4px !important;
    background-color: #1677ff !important;
    border-radius: 2px !important;
    left: 0 !important;
    transition: all 0.2s ease !important;
    display: none !important;
}

/* 添加类名来控制显示/隐藏 */
.layui-nav-tree.hide-bar .layui-nav-bar {
    opacity: 0 !important;
}

.cla{
	width: 220px;
	height: 20px;
	overflow: hidden;
	display: block;
	text-overflow: ellipsis;
	white-space: nowrap;
	cursor: pointer;
	color:black;
	text-decoration:none;
	font-size:16px;
}
[v-cloak] {
	display: none !important;
}	
.pptClick:hover{color:red}
.pptClick{text-decoration:none;color:black;font-size:16px;display:none;float:right;margin-right:20px;}
.jianjie{
	position: relative;
	width: 1200px;
	height: auto;
	margin: 0px auto 0 auto;
	overflow: hidden;
}
.course2{
	position: relative;
	width: 1200px;
	height: 900px;
	margin: 0px auto 0 auto;
	overflow: hidden;
}
/* 顶部切换按钮 */
.special-tab-btn{
	padding: 6px 18px;
	border-radius: 4px;
	border: 1px solid #1677ff;
	background: #fff;
	color: #1677ff;
	cursor: pointer;
	font-size: 15px;
	transition: all 0.2s;
	margin-left:30px;
}
.special-tab-btn.active{
	background: #1677ff;
	color: #fff;
}

/* ===================== AI+VR整体布局 ===================== */
.ai-vr-wrap{
	width: 1200px;
	margin: 0 auto;
	display: flex;
	gap: 20px;
	overflow: hidden;
	position: relative;
	min-width: 1200px;
}
/* 左侧目录整体盒子 */
.catalog-left{
	width: 220px;
	background-color: #ffffff;
	border-radius: 4px;
	overflow-y: auto;
	overflow-x:hidden;
	height:720px;
}
/* 右上角黄色免费标签 */
.free-tag{
	background-color: #fff3cd;
	color: #ffc107;
	border: 1px solid #ffda6a;
	font-size: 12px;
	padding: 4px 12px;
	border-radius: 20px;
	float: right;
	font-weight: normal;
}
/* 顶部标题栏容器 */
.catalog-top-bar{
	padding: 15px 12px;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
/* 标题+图标盒子 */
.catalog-header{
	display: flex;
	align-items: center;
	gap: 8px;
}
/* 章节目录大图标（HTML img标签，百分百显示） */
.catalog-header-icon{
	width: 24px;
	height: 24px;
	display: block;
}
/* 章节目录标题文字 */
.catalog-header-title{
	font-size: 20px;
	font-weight: 600;
	color: #333;
}
/* 标题下方分割线 */
.catalog-line{
	width: calc(100% - 24px);
	height: 1px;
	background-color: #eeeeee;
	margin: 0 auto 12px;
}

/* ========== 树形菜单基础样式 ========== */
.layui-nav-tree{
	background: transparent !important;
	width: 100% !important;
	padding: 0 10px;
}
.layui-nav-tree * {
	color: #333 !important;
	cursor: pointer;
}
/* 一级章节条目：默认灰色边框 */
.layui-nav-tree > .layui-nav-item > a{
	font-size: 15px !important;
	font-weight: 500;
	background: #fff !important;
	border: 1px solid #dcdcdc !important;
	border-radius: 8px !important;
	margin: 6px 0 !important;
	box-sizing: border-box;
	position: relative;
	padding-left: 45px !important;
	z-index: 1;
}
/* 一级章节 hover */
.layui-nav-tree > .layui-nav-item > a:hover{
	background: #f5f9ff !important;
	border-color: #1677ff !important;
	color: #1677ff !important;
}
/* 一级章节 选中展开：蓝色边框 */
.layui-nav-tree > .layui-nav-item.layui-nav-itemed > a{
	background: #f5f9ff !important;
	border: 1px solid #1677ff !important;
	color: #1677ff !important;
}

/* ========== 【核心修复】章节默认图标 + 选中图标（CSS绝对路径，JSP兼容） ========== */
/* 默认未展开：章节图标 */
.layui-nav-tree > .layui-nav-item > a::before{
	content: '';
	position: absolute;
	left: 6px;
	top: 50%;
	transform: translateY(-50%);
	width: 20px;
	height: 20px;
	/* 直接写项目绝对路径，CSS不识别jsp变量<%=contextPath%>，固定通用路径 */
	background-image: url('/images/章节.png');
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
	z-index: 2;
}
/* 展开选中状态：自动切换 章节-选中图标 */
.layui-nav-tree > .layui-nav-item.layui-nav-itemed > a::before{
	background-image: url('/images/章节-选中.png');
}

/* 二级菜单容器 */
.layui-nav-tree > .layui-nav-item > .layui-nav-child{
	background: #ffffff !important;
	margin: 8px 0 8px 15px !important;
	border: none !important;
	box-shadow: none !important;
}
/* 二级菜单条目 */
.layui-nav-tree > .layui-nav-item > .layui-nav-child > .layui-nav-item > a{
	font-size: 14px !important;
	color: #555 !important;
	background: #fff !important;
	border-left: 3px solid transparent;
	border-radius: 6px;
}
.layui-nav-tree > .layui-nav-item > .layui-nav-child > .layui-nav-item > a:hover{
	background: #e6f4ff !important;
	color: #1677ff !important;
}
/* 三级菜单容器 */
.layui-nav-tree > .layui-nav-item > .layui-nav-child > .layui-nav-item > .layui-nav-child{
	background: #ffffff !important;
	margin: 0 !important;
	border: none !important;
	box-shadow: none !important;
}
/* 三级菜单条目 */
.layui-nav-tree > .layui-nav-item > .layui-nav-child > .layui-nav-item > .layui-nav-child > dd > a{
	padding: 9px 45px !important;
	font-size: 13px !important;
	color: #666 !important;
	background: #fff !important;
	border-left: 3px solid transparent;
	border-radius: 6px;
}
.layui-nav-tree > .layui-nav-item > .layui-nav-child > .layui-nav-item > .layui-nav-child > dd > a:hover{
	background: #e6f4ff !important;
	color: #1677ff !important;
}
/* 内层菜单选中高亮 */
.layui-nav-child dd.layui-this a{
	background-color: #e6f4ff !important;
	border-left: 3px solid #1677ff !important;
	color: #1677ff !important;
	font-weight: 500;
}

/* ========================= 终极修复：树形菜单箭头 100%生效 ========================= */
/* 强制覆盖 layui 原生箭头，只在一级章节显示折叠箭头 */
.layui-nav-tree > .layui-nav-item > a .layui-nav-more {
  display: block !important;
  visibility: visible !important;
  opacity: 1 !important;
  position: absolute !important;
  right: 12px !important;
  top: 50% !important;
  width: 16px !important;
  height: 16px !important;
  border: none !important;
  background: transparent !important;
  font-size: 0 !important;
  line-height: 1 !important;
  text-align: center !important;
}

/* 默认关闭状态 → 向右箭头 */
.layui-nav-tree > .layui-nav-item > a .layui-nav-more::before {
  content: "▶" !important;
  font-size: 12px !important;
  color: #666 !important;
  font-style: normal !important;
}

/* 展开状态 → 向下箭头（核心生效） */
.layui-nav-tree > .layui-nav-item.layui-nav-itemed > a .layui-nav-more::before {
  content: "▼" !important;
  font-size: 14px !important;
  color: #1677ff !important;
  font-style: normal !important;
}

/* 隐藏原生箭头样式干扰 */
.layui-nav-more,
.layui-nav-mored {
  border: none !important;
  background: none !important;
}

/* ========== 左侧目录 窄白色滚动条 ========== */
.catalog-left::-webkit-scrollbar {
    width: 4px;
}
.catalog-left::-webkit-scrollbar-track {
    background: #ffffff;
}
.catalog-left::-webkit-scrollbar-thumb {
    background: #cccccc;
    border-radius: 2px;
}
.catalog-left::-webkit-scrollbar-thumb:hover {
    background: #aaaaaa;
}

/* 右侧内容区（你之前的课程简介完整保留） */
.catalog-right{
	flex: 1;
	background: #fff;
	border: 1px solid #eee;
	border-radius: 4px;
	padding: 25px;
	min-height: 700px;
	min-width: 930px;  /* 固定最小宽度 */
	width: 930px;      /* 固定宽度 */
}
.catalog-title{
	font-size: 18px;
	font-weight: bold;
	color: #333;
	margin-bottom: 20px;
	line-height: 1.5;
}
.catalog-sub-title{
	font-size: 16px;
	color: #666;
	margin: 15px 0;
}
.catalog-img{
	max-width: 100%;
	margin: 15px 0;
	border-radius: 2px;
}
/* 强制显示章节图标 终极方案 */
.layui-nav-tree > .layui-nav-item > a {
  position: relative !important;
}
.layui-nav-tree > .layui-nav-item > a::before {
  content: "" !important;
  position: absolute !important;
  left: 6px !important;
  top: 50% !important;
  transform: translateY(-50%) !important;
  width: 18px !important;
  height: 18px !important;
  background-image: url("/images/章节.png") !important;
  background-size: contain !important;
  background-repeat: no-repeat !important;
  background-position: center !important;
  z-index: 9999 !important;
  display: block !important;
  opacity: 1 !important;
  visibility: visible !important;
}
.layui-nav-tree > .layui-nav-item.layui-nav-itemed > a::before {
  background-image: url("/images/章节-选中.png") !important;
}
</style>
</head>
<body style="background:#F4F4F4;" >
<div id="wrapper" style="height:1400px;">
	<% if(user!=null&&!"".equals(user)&&!"null".equals(user)){ %>
	<jsp:include page="header2.jsp">
		<jsp:param value="<%=user.getName() %>" name="username"/>
	</jsp:include>
	<%}else{ %>
	<jsp:include page="header_noUser2.jsp"/>
	<%} %>

	<div style="text-align: center;">
		<img id="tpxs" src="">
	</div>
	<div class="jianjie">
	<fieldset class="layui-elem-field layui-field-title">

	<div class="layui-tab layui-tab-brief" lay-filter="demo">
		<img src="<%=contextPath %>/images/gxpt_tab.png" style="vertical-align: middle;padding-left:15px;">
		<span id="spanId" style="font-size: 20px; font-weight: bold;margin-left:5px;vertical-align: middle;"></span>
		
		<button id="aiBtn" class="special-tab-btn" style="display:none;">AI+VR课程智能体</button>
		<button id="vrBtn" class="special-tab-btn active" style="display:none;">VR资源库</button>
		<button id="knowledgeBtn" class="special-tab-btn" style="display:none;">知识图谱</button>
		
		<!-- VR专属：PPT下载+layui标签栏 -->
		<div id="vrResourceBar" style="display:block;">
			<a id="pptClick" class="pptClick" href="#" style="position:relative;z-index:9999;float:right;margin-right:20px;text-decoration:none;color:black;font-size:16px;cursor:pointer;padding:5px 10px;">教学课件下载</a>
			<ul class="layui-tab-title" style="margin-left:20px;">
				<li id="syjxId" class="layui-this">实验教学</li>
				<li id="ktjxId">课堂教学</li>
				<% if(classifyId.equals("3")){ %>
					<li>教学视频</li>
					<li>典型实景资料</li>
				<%} %>
				<% if(!classifyId.equals("50")){ %>
					<li id="jxscId">教学模型</li>
				<%} %>
			</ul>
		</div>
		
		<!-- VR资源主体内容 -->
		<div class="layui-tab-content" style="height: 900px;" id="news">
			<div id="syjxTabId" class="layui-tab-item layui-show">
				<div class="course2" >
					<div>
						<!-- 工程训练铸造实验课程 - 只在工程训练课程中显示 -->
						<div id="engineeringCastingCourses" style="display:none;margin-bottom:15px;">
							<ul class="list-inline" >
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('1237008971311611904','铸造技术VR实训教学系统')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/jdzz.png" title="铸造技术VR实训教学系统"> 
											<p class="cla" title="铸造技术VR实训教学系统">铸造技术VR实训教学系统</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('706180839112704000','铸造基本知识')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/gx/2基本知识.png" title="铸造基本知识"> 
											<p class="cla" title="铸造基本知识">铸造基本知识</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('706180669620879360','铸造基本操作')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/gx/2基本操作.png" title="铸造基本操作"> 
											<p class="cla" title="铸造基本操作">铸造基本操作</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('706180332642107392','铸造仿真实训')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/syzy/锻造技术.png" title="铸造仿真实训"> 
											<p class="cla" title="铸造仿真实训">铸造仿真实训</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('706183685270929408','铸造知识拓展')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/gx/2知识拓展.png" title="铸造知识拓展"> 
											<p class="cla" title="铸造知识拓展">铸造知识拓展</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
								<li style="margin-top:10px;">
									<div style="margin-left:5px;">
										<a href="javascript:void(0);" onclick="openVrExperiment('1236986462969266176','铸造综合考核')" class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
											<img src="https://www.keming365.com/images/gx/铸造.png" title="铸造综合考核"> 
											<p class="cla" title="铸造综合考核">铸造综合考核</p>
										</a>
										<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" title="工程训练">工程训练</span>
									</div>
								</li>
							</ul>
						</div>
						<!-- 工程训练铸造实验课程结束 -->
						
						<div style="margin-top: 10px;margin-left:5px;"></div>	
						<div style="height: 750px;">
							<div class="course">
								<ul class="list-inline" >
									<li v-for="item in items2" style="margin-top:10px;">
										<div style="margin-left:5px;">
											<a href="javascript:void(0);"  @click="enterItemBut(item.id,item.title,item.publisher,item.parentId,item.sellPoint,item.appliId,item.status,item.type,item.price)"  class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
												<img :src="item.image" :title="item.title"> <p class="cla" :title="item.title">{{item.title}}</p>
											</a>
											<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" :title="item.publisher">{{item.publisher}}</span>
											<p v-if="item.price == 0" style="color:red;font-size:12px;margin-top:-20px;text-align:right" class="cla"></p>								
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="row" id="pageId2" style="margin-top: 10px"></div>
					</div>
				</div>
			</div>

			<div id="ktjxTabId" class="layui-tab-item">
				<div class="course2" >
					<div>
						<div style="margin-top: 10px;margin-left:5px;"></div>	
						<div style="height: 750px;">
							<div class="course" >
								<ul class="list-inline" >
									<li v-for="item in items" style="margin-top:10px;" v-cloak>
										<div style="margin-left:5px;background:white;">
											<a href="javascript:void(0);"  @click="enterItemBut(item.id,item.title,item.publisher,item.parentId,item.sellPoint,item.appliId,item.status,item.type,item.price)"  class="a_hover" style="text-decoration:none;color:#111111;font-size:14px;">
												<img :src="item.image" :title="item.title"> <p class="cla" :title="item.title">{{item.title}}</p>
											</a>
											<span class="cla" style="color:#999999;font-size:12px;margin-top:5px;" :title="item.publisher">{{item.publisher}}</span>	
											<p v-if="item.price == 0" style="color:red;font-size:12px;margin-top:-20px;text-align:right" class="cla"></p>							
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="row" id="pageId" style="margin-top: 10px"></div>
					</div>
				</div>
			</div>

			<div id="jxscId" class="layui-tab-item">
				<div style="position: relative;height: 100%;overflow-x: hidden;">
					<ul class="layui-nav layui-nav-tree" style="float:left" lay-filter="LeftItem">
						<li v-for="item in items3" class="layui-nav-item layui-nav-itemed">
							<a href="javascript:void(0);" class="link-active" :data-url="'/course2?title='+item.appliId"  :data-id="item.id" :data-title="item.title">{{item.title}}</a>
						</li>
					</ul>
					<div class="layui-body" style="float:left">
						<div class="layui-tab" lay-filter="tables" lay-allowclose="true">
							<ul class="layui-tab-title"></ul>
							<div class="layui-tab-content"></div>
						</div>
					</div>
				</div>
			</div>

			<div class="layui-tab-item">
				<div class="course2" >
					<div>
						<div style="margin-top: 10px;margin-left:5px;"></div>	
						<div style="height: 750px;">
							<div class="course">
								<ul id="biuuu_city_list" class="list-inline" ></ul>
							</div>
						</div>
						<div id="demo20"></div>
					</div>
				</div>
			</div>

			<div class="layui-tab-item">
				<div class="course2" >
					<div>
						<div style="margin-top: 10px;margin-left:5px;"></div>	
						<div style="height: 750px;">
							<div class="course">
								<span style="font-size:20px;margin-left:15px;">视频</span>
								<span ><a id="gdId" href="<%=contextPath%>/videoPage" style="font-size:16px;float:right;color:black;margin-right:10px;display:none">更多</a></span>
								<ul id="biuuu_city_list2" class="list-inline" ></ul>
							</div>
							<div class="course" style="margin-top:20px;">
								<span style="font-size:20px;margin-left:15px;">图片</span>
								<ul class="list-inline" ></ul>
							</div>
						</div>
						<div class="row" id="pageId4" style="margin-top: -20px"></div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- AI+VR课程智能体 完整布局 1:1还原你图片的四层目录结构 -->
	<div id="aiVrContent" style="display:none; width:1200px; margin:0 auto;">
		<div class="ai-vr-wrap">
			<!-- 左侧：三层完整可折叠树形目录 完全匹配你截图文案 -->
			<div class="catalog-left">
				<!-- 顶部：章节目录 + 图标 + 分割线 -->
				<div style="padding:12px 15px; display:flex; align-items:center; justify-content:space-between;">
					<div style="display:flex; align-items:center; gap:8px;">
						<img src="/images/章节目录.png" style="width:22px; height:22px;">
						<span style="font-size:16px; font-weight:bold;">目录</span>
					</div>
					<span class="free-tag">免费试用</span>
				</div>
				<div style="height:1px; background:#eee; margin:0 12px 10px;"></div>

				<!-- 目录树 -->
				<ul id="courseTree" class="layui-nav layui-nav-tree" lay-filter="courseCatalog"></ul>
			</div>

			<!-- 右侧课程内容区域 -->
			<div class="catalog-right">
			<!-- 默认课程简介 -->
			<div id="courseIntro">
				<div class="catalog-title">课程概述</div>
				<p style="line-height: 1.8; font-size: 15px; color: #333;">
				《画法几何及机械制图》是机械类及相关专业专业普遍开设的一门重要技术基础课，在整个教学计划中，是机械类学生学习后继课程的基础，具有十分重要的地位。本课程主要内容：制图基本知识与技能、正投影基础、基本体、切割体、相贯体、组合体、轴测图、机件的表达、标准件和常用件、零件图、技术要求、装配图、计算机绘图基础等。
				<br><br>
				在教学方法上，采用全时空"VR+教学"模式，充分运用VR技术，将VR教学资源、3D版教材，VR教学云平台等要素融入教学的各个环节，充分调动和激发学生的学习兴趣；学生作业采用尺规制图作业自动批改系统和手动批改相结合，做到全批全改。
				<br><br>
				通过课程的学习，让学生认识到专业工程人员掌握绘制和识读工程图样的能力的重要性，为学习其他后续相关专业课程，奠定坚实的基础，最终目标是肩负起国家制造业发展的神圣使命。
				</p>

				<div class="catalog-sub-title" style="margin-top: 30px;">授课目标</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>培养仪器绘图、徒手绘图、计算机绘图的三种能力。</li>
					<li>掌握在二维平面上表达三维空间形体的方法与技能。</li>
					<li>培养空间逻辑思维能力、形象思维能力和多向思维能力。</li>
					<li>培养绘制和阅读工程图样的基本能力。</li>
					<li>培养自学能力、分析问题和解决问题的能力。</li>
					<li>培养认真负责的工作态度和严谨的工作作风。</li>
				</ul>

				<div class="catalog-sub-title" style="margin-top: 30px;">参考资料</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>[1] 段辉，张莹，陈清奎编.画法几何及机械制图（3D版）第2版 [M].北京：机械工业出版社，2025.</li>
					<li>[2] 张莹，陈清奎，段辉编.画法几何及机械制图习题集[M].北京：机械工业出版社，2025.</li>
					<li>[3] 陈清奎，段辉，牛司余编.智绘之道：机械制图学习精粹（AI&VR版）（AI&VR版）[M].济南：山东科学出版社，2024.</li>
				</ul>
			</div>

			<!-- 资源展示区域 -->
			<div id="resourceShow" style="display: none; display:flex; flex-direction:column; height:680px; width:930px;">
				<div class="res-title" style="font-size:18px;font-weight:bold;margin-bottom:15px;"></div>

				<!-- iframe资源加载 -->
				<iframe id="resIframe" width="100%" height="620px" frameborder="0" style="border:none;" allow="screen-wake-lock; fullscreen; clipboard-read; clipboard-write"></iframe>

				<!-- 【建设中提示】默认隐藏，空地址时显示 -->
				<div id="buildTip" style="display:none;width:100%;height:620px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#999;">
					该内容正在建设中
				</div>
				
				<!-- 分页容器 -->
				<div class="vr-pagination-container" style="flex-shrink:0;"></div>
			</div>
		</div>
		</div>
	</div>

	<!-- 液压与气压传动 AI+VR课程智能体 -->
	<div id="aiVrContentHydraulic" style="display:none; width:1200px; margin:0 auto;">
		<div class="ai-vr-wrap">
			<!-- 左侧：三层完整可折叠树形目录 -->
			<div class="catalog-left">
				<!-- 顶部：章节目录 + 图标 + 分割线 -->
				<div style="padding:12px 15px; display:flex; align-items:center; justify-content:space-between;">
					<div style="display:flex; align-items:center; gap:8px;">
						<img src="/images/章节目录.png" style="width:22px; height:22px;">
						<span style="font-size:16px; font-weight:bold;">目录</span>
					</div>
					<span class="free-tag">免费试用</span>
				</div>
				<div style="height:1px; background:#eee; margin:0 12px 10px;"></div>

				<!-- 目录树 -->
				<ul id="courseTreeHydraulic" class="layui-nav layui-nav-tree" lay-filter="courseCatalogHydraulic"></ul>
			</div>

			<!-- 右侧课程内容区域 -->
			<div class="catalog-right">
			<!-- 默认课程简介 -->
			<div id="courseIntroHydraulic">
				<div class="catalog-title">课程概述</div>
				<p style="line-height: 1.8; font-size: 15px; color: #333;">
				《液压与气压传动》是机械类专业的一门重要技术基础课，主要研究以液体和气体为工作介质的流体传动与控制技术。本课程系统介绍液压与气压传动的基本原理、元件结构、回路设计及应用实例，培养学生分析和解决工程实际问题的能力。
				<br><br>
				课程内容包括：液压流体力学基础、液压泵与马达、液压缸、液压控制阀、液压辅助元件、液压基本回路、气压传动元件、气压基本回路以及液压与气动系统设计等。
				<br><br>
				通过本课程的学习，学生将掌握液压与气压传动的基本理论和应用技能，为后续专业课程学习和工程实践打下坚实基础。
				</p>

				<div class="catalog-sub-title" style="margin-top: 30px;">授课目标</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>掌握液压与气压传动的基本原理和特性。</li>
					<li>熟悉各种液压与气动元件的结构、工作原理和选用方法。</li>
					<li>掌握液压与气压基本回路的组成、功能和应用。</li>
					<li>具备分析和设计简单液压与气动系统的能力。</li>
					<li>了解液压与气压传动在工业中的应用实例。</li>
				</ul>

				<div class="catalog-sub-title" style="margin-top: 30px;">参考资料</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>[1] 王积伟，章宏甲，黄谊.液压与气压传动（第5版）[M].北京：机械工业出版社，2020.</li>
					<li>[2] 左健民.液压与气压传动（第4版）[M].北京：机械工业出版社，2019.</li>
					<li>[3] 刘延俊.液压与气压传动[M].北京：化学工业出版社，2021.</li>
				</ul>
			</div>

			<!-- 资源展示区域 -->
			<div id="resourceShowHydraulic" style="display: none; display:flex; flex-direction:column; height:680px; width:930px;">
				<div class="res-title" style="font-size:18px;font-weight:bold;margin-bottom:15px;"></div>

				<!-- iframe资源加载 -->
				<iframe id="resIframeHydraulic" width="100%" height="620px" frameborder="0" style="border:none;" allow="screen-wake-lock; fullscreen; clipboard-read; clipboard-write"></iframe>

				<!-- 【建设中提示】默认隐藏，空地址时显示 -->
				<div id="buildTipHydraulic" style="display:none;width:100%;height:620px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#999;">
					该内容正在建设中
				</div>
				
				<!-- 分页容器 -->
				<div class="vr-pagination-container" style="flex-shrink:0;"></div>
			</div>
		</div>
		</div>
	</div>

	<!-- 工程训练（3D版）AI+VR课程智能体 -->
	<div id="aiVrContentEngineering" style="display:none; width:1200px; margin:0 auto;">
		<div class="ai-vr-wrap">
			<!-- 左侧：三层完整可折叠树形目录 -->
			<div class="catalog-left">
				<!-- 顶部：章节目录 + 图标 + 分割线 -->
				<div style="padding:12px 15px; display:flex; align-items:center; justify-content:space-between;">
					<div style="display:flex; align-items:center; gap:8px;">
						<img src="/images/章节目录.png" style="width:22px; height:22px;">
						<span style="font-size:16px; font-weight:bold;">目录</span>
					</div>
					<span class="free-tag">免费试用</span>
				</div>
				<div style="height:1px; background:#eee; margin:0 12px 10px;"></div>

				<!-- 目录树 -->
				<ul id="courseTreeEngineering" class="layui-nav layui-nav-tree" lay-filter="courseCatalogEngineering"></ul>
			</div>

			<!-- 右侧课程内容区域 -->
			<div class="catalog-right">
			<!-- 默认课程简介 -->
			<div id="courseIntroEngineering">
				<div class="catalog-title">课程概述</div>
				<p style="line-height: 1.8; font-size: 15px; color: #333;">
				《工程训练（3D版）》是一门综合性实践课程，旨在培养学生的工程实践能力和创新意识。课程涵盖机械制造、电工电子、数控加工等多个工程领域，通过理论学习与实践操作相结合的方式，使学生掌握工程基础知识和技能。
				<br><br>
				课程内容包括：机械加工基础、数控编程与操作、电气控制技术、焊接技术、铸造工艺、装配实训等。通过VR虚拟仿真技术，学生可以在安全、高效的环境中进行各种工程实践操作。
				<br><br>
				通过本课程的学习，学生将具备扎实的工程实践能力，为今后从事工程技术工作打下坚实基础。
				</p>

				<div class="catalog-sub-title" style="margin-top: 30px;">授课目标</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>掌握机械加工的基本原理和操作技能。</li>
					<li>熟悉数控编程和加工工艺。</li>
					<li>了解电气控制和自动化技术。</li>
					<li>培养工程实践能力和创新思维。</li>
					<li>树立安全意识和质量意识。</li>
				</ul>

				<div class="catalog-sub-title" style="margin-top: 30px;">参考资料</div>
				<ul style="line-height: 1.8; font-size: 15px; color: #333; padding-left: 20px;">
					<li>[1] 傅鹤坤.工程训练教程[M].北京：机械工业出版社，2022.</li>
					<li>[2] 张木青.工程实践与创新[M].北京：高等教育出版社，2021.</li>
					<li>[3] 李建国.机械制造工程训练[M].北京：清华大学出版社，2020.</li>
				</ul>
			</div>

			<!-- 资源展示区域 -->
			<div id="resourceShowEngineering" style="display: none; display:flex; flex-direction:column; height:680px; width:930px;">
				<div class="res-title" style="font-size:18px;font-weight:bold;margin-bottom:15px;"></div>

				<!-- iframe资源加载 -->
				<iframe id="resIframeEngineering" width="100%" height="620px" frameborder="0" style="border:none;" allow="screen-wake-lock; fullscreen; clipboard-read; clipboard-write"></iframe>

				<!-- 【建设中提示】默认隐藏，空地址时显示 -->
				<div id="buildTipEngineering" style="display:none;width:100%;height:620px;display:flex;align-items:center;justify-content:center;font-size:20px;color:#999;">
					该内容正在建设中
				</div>
			</div>
		</div>
		</div>
	</div>

	<!-- 知识图谱内容区域 -->
	<div id="knowledgeContent" style="display:none; width:1200px; margin:0 auto; overflow:hidden;">
		<div style="background:#fff; border-radius:8px; padding:20px; height:720px; box-sizing:border-box; overflow:hidden;">
			<div style="font-size:18px; font-weight:bold; margin-bottom:15px; color:#333;">知识图谱</div>
			<iframe id="knowledgeIframe" style="width:100%; height:calc(100% - 35px); border:none; display:block; overflow:hidden;" frameborder="0"></iframe>
		</div>
	</div>

	</fieldset>
	</div>
	</div>
<footer class="footer">
	<div style="height:284px;background-color:#2366d8">
		<div style="width:1200px;height:200px;padding-top: 50px;margin:0 auto;">
			<div style="height:77px;;width:465px;background:url('<%=contextPath %>/images/footer_logo.png');float:left;margin-top:26px;"></div>
			<div style="height:129px;;width:231px;background:url('<%=contextPath %>/images/二维码.png');float:right;"></div>
		</div>
		<div class="copyright" style="text-align: center">
			<span style="font-size: 16px;">©2015-2023 济南科明数码技术股份有限公司版权所有</span><br />
			<a target="_blank" style="color:#fff;display:inline-block;text-decoration:none;height:20px;line-height:20px;font-size:16px;" href="https://beian.miit.gov.cn">鲁ICP备14017714号-13</a>
			&nbsp;|&nbsp;
			<a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=37010202000872" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;font-size:16px;">
				<img src="<%=contextPath %>/images/batb.png" style="float:left;"/>
				<p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:white;">鲁公网安备 37010202000872号</p>
			</a>
		</div>
	</div>
</footer>
</body>
<script type="text/javascript" src="<%=contextPath%>/js/jxsp.js" charset="utf-8"></script>
<script type="text/javascript">
	var news = new Vue({
		el:"#news",
		data:{ items:[], items2:[], items3:[] }
	});
    // JavaScript - 光标只在一级目录显示，点击后保持位置
    $(document).ready(function() {
        var clickedMenuItem = null; // 记录点击的菜单项
        
        // 鼠标悬停时显示光标（仅在一级目录）
        $('.layui-nav-tree').bind('mousemove', function(e) {
            // 如果已经点击过，保持光标不动
            if (clickedMenuItem) return;
            
            var $tree = $(this);
            var $navBar = $tree.find('.layui-nav-bar');
            var $target = $(e.target);
            
            // 获取当前鼠标所在的一级菜单项
            var $menuItem = $target.closest('.layui-nav-tree > .layui-nav-item');
            
            // 检查是否在一级目录上
            var isFirstLevel = $target.closest('.layui-nav-child').length === 0;
            
            if (isFirstLevel && $navBar.length > 0 && $menuItem.length > 0) {
                // 在一级目录，显示光标并跟随
                $tree.removeClass('hide-bar');
                
                var treeOffset = $tree.offset();
                var menuOffset = $menuItem.offset();
                var barTop = menuOffset.top - treeOffset.top;
                
                $navBar[0].style.setProperty('top', barTop + 'px', 'important');
            } else {
                // 在二级或三级目录，隐藏光标
                $tree.addClass('hide-bar');
            }
        });
        
        // 鼠标离开整个导航树时显示光标（使用 jQuery 1.6.4 支持的 bind 方法）
        $('.layui-nav-tree').bind('mouseleave', function() {
            $(this).removeClass('hide-bar');
        });
    });

	function getAllExperiment2(startPage,type){
		var cid = localStorage.getItem("cid");
		var classifyId ="<%=classifyId %>";
		if(classifyId != null ){
			switch(classifyId) {
				case "3": $("#spanId").text("液压与气压传动"); break;
				case "6": $("#spanId").text("机械原理"); break;
				case "4": $("#spanId").text("互换性与测量技术基础"); break;
				case "57": $("#spanId").text("机械制造基础"); break;
				case "5": $("#spanId").text("画法几何与机械制图"); break;
				default: break;
			}
			cid = classifyId;
		}
		$.ajax({
			type: "POST", dataType: "json",
			data:{type:type,cid:cid,startPage:startPage,PageSize:100},
			url: getCourseAllUrl,
			success: function(res){ if(type == 3) news.items3 = convert(res.rows); }
		});
	}
	function getAllExperiment(startPage,type){
		var cid = localStorage.getItem("cid");
		var classifyId ="<%=classifyId %>";
		if(classifyId != null ){
			switch(classifyId) {
				case "3": $("#spanId").text("液压与气压传动"); break;
				case "6": $("#spanId").text("机械原理"); break;
				case "4": $("#spanId").text("互换性与测量技术基础"); break;
				case "57": $("#spanId").text("机械制造基础"); break;
				case "5": $("#spanId").text("画法几何与机械制图"); break;
				default: break;
			}
			cid = classifyId;
		}
		$.ajax({
			type: "POST", dataType: "json",
			data:{type:type,cid:cid,startPage:startPage,PageSize:20},
			url: getCourseAllUrl,
			success: function(res){
				if(type == 1){
					if(res.rows.length > 0){
						news.items = convert(res.rows);
					}
				}else{
					news.items2 = convert(res.rows);
				}
				pageInfoBar(res.pageInfo,type);
			}
		});
	}

	function pageInfoBar(pageInfo,type){
		var startNum = (pageInfo.pageNum - 1) * pageInfo.pageSize + 1;
		var endNum = pageInfo.pageNum * pageInfo.pageSize;
		if(endNum > pageInfo.total){
			endNum = pageInfo.total;
		}
		var html = "<div class='col-md-6'>当前显示 "+startNum+"-"+endNum+" 条，总共"+pageInfo.total+" 条记录，共"+pageInfo.pages+" 页</div>"
		html += "<div class='col-md-6'><nav aria-label='Page navigation'><ul class='pagination'>"
		html += "<li><a href='javascript:void(0);' onclick=getAllExperiment('1','"+type+"')>首页</a></li>"
		if (pageInfo.pageNum > 1) {
			html += "<li><a href='javascript:void(0);' onclick=getAllExperiment('"+pageInfo.prePage+"','"+type+"')>«</a></li>"
		}
		for (var i = 0; i < pageInfo.navigatepageNums.length; i++) {
			if (pageInfo.pageNum == pageInfo.navigatepageNums[i]) {
				html += "<li class='active'><a href='#'>"+pageInfo.navigatepageNums[i]+"</a></li>"
			} else {
				html += "<li><a href='javascript:void(0);' onclick=getAllExperiment('"+pageInfo.navigatepageNums[i]+"','"+type+"')>"+pageInfo.navigatepageNums[i]+"</a></li>"
			}
		}
		if (pageInfo.pageNum < pageInfo.pages) {
			html += "<li><a href='javascript:void(0);' onclick=getAllExperiment('"+pageInfo.nextPage+"','"+type+"')>»</a></li>"
		}    
		html += "<li><a href='javascript:void(0);' onclick=getAllExperiment('"+pageInfo.pages+"','"+type+"')>尾页</a></li>"
		html += "</ul></nav></div>";
		type == 1 ? document.getElementById("pageId").innerHTML=html : document.getElementById("pageId2").innerHTML=html;
	}

	function convert(items) {
		var newItems = [];
		items.forEach(function(item){
			newItems.push({ 
				id: item.id, title: item.title, sellPoint: item.sellPoint,
				image: imgUrl + item.image, publisher: item.publisher,
				appliId: item.appliId, status:item.status, type:item.type,
				parentId: item.parentId, price:item.price
			});
		});
		return newItems;
	}

	$(document).ready(function(){
		var s=localStorage.getItem("classifyId");
		var x= document.getElementById("tpxs");
		if (s == "1") x.src = "<%=contextPath %>/img/lx01.png";
		else if (s == "3") x.src = "<%=contextPath %>/img/lx03.png";
		else if(s=="2") x.src = "<%=contextPath %>/img/lx02.png";
		else if(s=="5") x.src = "<%=contextPath %>/img/lx05.png";
		else if(s=="11") x.src = "<%=contextPath %>/img/lx11.png";
		else if(s=="4") x.src = "<%=contextPath %>/img/lx04.png";
		else if(s=="8") x.src = "<%=contextPath %>/img/lx08.png";
		else if(s=="7") x.src = "<%=contextPath %>/img/lx07.png";
		else if(s=="6") x.src = "<%=contextPath %>/img/lx06.png";
		else if(s=="9") x.src = "<%=contextPath %>/img/lx09.png";
		else if(s=="12") x.src = "<%=contextPath %>/img/lx12.png";
		else if(s=="13") x.src = "<%=contextPath %>/img/lx13.png";

		var cid = localStorage.getItem("cid");	
		if(cid == "2"){$("#pptClick").show();$("#pptClick").attr("href","https://keming365.com/download_km/download365/ppt/jxzz.zip");}
		else if(cid == "3"){$("#pptClick").show();$("#pptClick").attr("href","https://keming365.com/download_km/download365/ppt/yeya.zip");}
		else if(cid == "4"){$("#pptClick").show();$("#pptClick").attr("href","https://keming365.com/download_km/download365/ppt/huhuanxing.zip");}
		else if(cid == "1"){$("#pptClick").show();$("#pptClick").attr("href","https://keming365.com/download_km/download365/ppt/jixiesheji.zip");}
		else if(cid == "5"){$("#pptClick").show();$("#pptClick").attr("href","https://keming365.com/download_km/download365/ppt/huafajihe.zip");}

		var courseName = localStorage.getItem("cName");
		$("#spanId").text(courseName);

		// 画法几何、液压与气压和工程训练显示顶部切换按钮
		var isAiVrCourse = (courseName == "画法几何与机械制图" || courseName == "液压与气压传动" || courseName == "工程训练");
		if(isAiVrCourse){
			$("#aiBtn,#vrBtn,#knowledgeBtn").show();
			
			// 工程训练课程默认显示铸造实验课程
			if(courseName === '工程训练'){
				$("#engineeringCastingCourses").show();
			}
			
			// 检查是否需要直接进入AI+VR模式（工程训练按钮点击或其他AI+VR课程）
			var aiVrMode = localStorage.getItem('aiVrMode');
			if(aiVrMode == '1' || aiVrMode == 'engineering'){
				// 自动切换到AI+VR模式
				$(".special-tab-btn").removeClass("active");
				$("#aiBtn").addClass("active");
				$("#news").hide();
				$("#vrResourceBar").hide();
				$("#knowledgeContent").hide();
				// 根据课程显示对应的AI+VR内容
				if(courseName == "画法几何与机械制图"){
					$("#aiVrContent").show();
				}else if(courseName == "液压与气压传动"){
					$("#aiVrContentHydraulic").show();
				}else if(courseName == "工程训练"){
					$("#aiVrContentEngineering").show();
				}
				// 清除标记，下次正常访问
				localStorage.removeItem('aiVrMode');
			}
		}

		// AI+VR切换
		$("#aiBtn").click(function(){
			$(".special-tab-btn").removeClass("active");
			$(this).addClass("active");
			$("#news").hide();
			$("#vrResourceBar").hide();
			$("#knowledgeContent").hide();
			$("#aiVrContent").hide();
			$("#aiVrContentHydraulic").hide();
			$("#aiVrContentEngineering").hide();
			// 恢复wrapper和body默认样式
			$("#wrapper").css({"overflow":"", "height":"1400px"});
			$("body").css("overflow-y", "");
			// 根据课程显示对应的AI+VR内容
			if(courseName == "画法几何与机械制图"){
				$("#aiVrContent").show();
				// 显示课程概述，隐藏资源展示区域
				$("#courseIntro").show();
				$("#resourceShow").hide();
				$("#buildTip").hide();
			}else if(courseName == "液压与气压传动"){
				$("#aiVrContentHydraulic").show();
				$("#courseIntroHydraulic").show();
				$("#resourceShowHydraulic").hide();
				$("#buildTipHydraulic").hide();
			}else if(courseName == "工程训练"){
				$("#aiVrContentEngineering").show();
				$("#courseIntroEngineering").show();
				$("#resourceShowEngineering").hide();
				$("#buildTipEngineering").hide();
			}
		});

		// VR资源库切换
		$("#vrBtn").click(function(){
			$(".special-tab-btn").removeClass("active");
			$(this).addClass("active");
			$("#aiVrContent").hide();
			$("#aiVrContentHydraulic").hide();
			$("#aiVrContentEngineering").hide();
			$("#knowledgeContent").hide();
			$("#news").show();
			$("#vrResourceBar").show();
			// 恢复wrapper和body默认样式
			$("#wrapper").css({"overflow":"", "height":"1400px"});
			$("body").css("overflow-y", "");
			// 只在工程训练课程中显示铸造实验课程
			if(courseName === '工程训练'){
				$("#engineeringCastingCourses").show();
			}else{
				$("#engineeringCastingCourses").hide();
			}
			layui.element.render('demo');
		});

		// 知识图谱切换（独立页面，不依赖外部AI页面）
		$("#knowledgeBtn").click(function(){
			$(".special-tab-btn").removeClass("active");
			$(this).addClass("active");
			$("#news").hide();
			$("#vrResourceBar").hide();
			$("#aiVrContent").hide();
			$("#aiVrContentHydraulic").hide();
			$("#aiVrContentEngineering").hide();
			$("#knowledgeContent").show();
			// 恢复外层滚动（jsMind内部自带拖拽缩放）
			$("#wrapper").css({"overflow":"", "height":""});
			$("body").css("overflow-y", "");
			// 根据课程加载对应的知识图谱（独立HTML页面）
			var lessonId = 2;
			if(courseName == "液压与气压传动"){
				lessonId = 1;
			}else if(courseName == "工程训练"){
				lessonId = 12;
			}
			$("#knowledgeIframe").attr('src', '/sdxx/knowledge-graph.html?lessonId=' + lessonId);
		});

		getAllExperiment(1,1);
		getAllExperiment(1,0);
		getAllExperiment2(1,3);
	});

	function enterItemBut(experimentId,experimentStr,publisher,curriculumId,sellPoint,appliId,status,zyType,price){
		localStorage.setItem("autoLogin","<%=classifyId%>");
		localStorage.setItem("zyType",zyType);
		localStorage.setItem("appliId",appliId);
		localStorage.setItem("sellPoint",sellPoint);
		localStorage.setItem("curriculumId",curriculumId);
		localStorage.setItem("experimentId",experimentId);
		localStorage.setItem("experimentStr",experimentStr);
		localStorage.setItem("publisher",publisher);
		localStorage.setItem("status",status);
		localStorage.setItem("price",price);
		window.open('https://www.keming365.com/enterItem');
	}

	function openVideo(src){
		var page = window.open();
		var html="<body style='background:black'><div style='width:1200px;margin:50px auto'><video controls controlsList='nodownload' width='100%' src='"+src+"'></video></div></body>";
		page.document.write(html);
	}
	
	function openVrExperiment(appliId, title){
		localStorage.setItem("appliId", appliId);
		localStorage.setItem("experimentStr", title);
		localStorage.setItem("autoLogin", "<%=classifyId%>");
		window.open('https://www.keming365.com/enterItem');
	}
</script>

<script>
layui.use(['element','jquery'], function(){
	var element = layui.element;
	var $ = layui.jquery;
	$('.link-active').on('click', function () {
		var dataid = $(this);
		var isExist = false;
		$('.layui-tab-title li[lay-id]').each(function(){
			if($(this).attr('lay-id') == dataid.attr('data-id')) isExist = true;
		});
		if(!isExist){
			element.tabAdd('tables', {
				title: dataid.attr('data-title'),
				content: '<iframe scrolling="auto" frameborder="0" src="'+dataid.attr('data-url')+'" style="width:100%;height:800px"></iframe>',
				id: dataid.attr('data-id')
			});
		}
		element.tabChange('tables', dataid.attr('data-id'));
	});
});
</script>

<script>
/**
 * PPT在线预览组件 v1.1（纯iframe实现，不覆盖其他页面）
 * 兼容本地服务器PPT和科明OSS云端PPT
 * 基于Microsoft Office Online预览服务
 * 所有内容完全在iframe内显示，不影响视频、测试等其他页面
 */
var PptPreviewer = (function() {
    // 默认配置
    var defaults = {
        // 预览服务地址
        previewService: 'https://view.officeapps.live.com/op/embed.aspx?src=',
        // 备用预览服务（微软直接查看）
        fallbackService: 'https://view.officeapps.live.com/op/view.aspx?src=',
        // iframe容器ID（和视频、测试共用同一个iframe）
        containerId: 'resIframe',
        // 错误提示容器ID
        errorContainerId: 'buildTip',
        // 加载超时时间（毫秒）
        timeout: 15000
    };

    // 私有方法：构建预览URL
    function buildPreviewUrl(pptUrl, useFallback) {
        var service = useFallback ? defaults.fallbackService : defaults.previewService;
        return service + encodeURIComponent(pptUrl);
    }

    // 私有方法：生成下载提示HTML（在iframe内部显示）
    function getDownloadFallbackHtml(pptUrl) {
        return '<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>PPT预览</title><style>' +
            '*{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;}' +
            'body{width:100%;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#f5f5f5;}' +
            '.icon-box{width:120px;height:120px;border-radius:50%;background:#1890ff;display:flex;align-items:center;justify-content:center;margin-bottom:20px;}' +
            '.icon-box span{font-size:48px;color:white;}' +
            'h3{color:#333;margin-bottom:10px;font-size:24px;font-weight:500;}' +
            'p{color:#666;margin-bottom:30px;font-size:16px;}' +
            '.btn-group{display:flex;gap:15px;}' +
            '.btn{padding:12px 30px;border-radius:4px;text-decoration:none;font-size:16px;cursor:pointer;border:none;transition:all 0.2s;}' +
            '.btn-primary{background:#1890ff;color:white;}' +
            '.btn-primary:hover{background:#40a9ff;}' +
            '.btn-outline{background:white;color:#1890ff;border:1px solid #1890ff;}' +
            '.btn-outline:hover{background:#e6f7ff;}' +
            '</style></head><body>' +
            '<div class="icon-box"><span>📄</span></div>' +
            '<h3>PPT预览</h3>' +
            '<p>在线预览暂时不可用，您可以下载查看或在新窗口打开</p>' +
            '<div class="btn-group">' +
            '<a href="' + pptUrl + '" target="_blank" download class="btn btn-primary">下载PPT</a>' +
            '<a href="' + buildPreviewUrl(pptUrl, true) + '" target="_blank" class="btn btn-outline">新窗口打开</a>' +
            '</div>' +
            '</body></html>';
    }

    // 公有方法：初始化组件
    function init(options) {
        // 合并用户配置
        $.extend(defaults, options || {});
    }

    // 公有方法：预览PPT（通过OSS接口获取预览URL）
    function preview(pptUrl) {
        // 空值处理
        if (!pptUrl || !pptUrl.trim()) {
            $('#' + defaults.containerId).hide();
            $('#' + defaults.errorContainerId).show();
            return;
        }

        // 重置状态
        $('#' + defaults.errorContainerId).hide();
        $('#' + defaults.containerId).show().attr('src', 'about:blank');

        var iframe = $('#' + defaults.containerId);

        // 显示加载中
        iframe.attr('srcdoc', '<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{display:flex;align-items:center;justify-content:center;height:100vh;font-family:sans-serif;color:#666;} .loading{font-size:18px;}</style></head><body><div class="loading">正在加载PPT预览...</div></body></html>');

        // 判断是否为完整URL（http开头），如果是则直接用旧方式预览
        if (pptUrl.indexOf('http') === 0) {
            var previewUrl = buildPreviewUrl(pptUrl);
            iframe.removeAttr('srcdoc').attr('src', previewUrl);
            return;
        }

        // 否则通过OSS接口获取预览URL
        // pptUrl 作为文件名，拼接成 objectName
        var objectName = 'node/courseWare/' + pptUrl;

        $.ajax({
            url: 'https://www.keming365.com/ai/api/doc-preview/oss/path',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ objectName: objectName }),
            success: function(res) {
                if (res.code === 200 && res.data) {
                    // 直接用OSS返回的预览URL
                    iframe.removeAttr('srcdoc').attr('src', res.data);
                } else {
                    iframe.attr('srcdoc', getDownloadFallbackHtml(pptUrl));
                }
            },
            error: function() {
                iframe.attr('srcdoc', getDownloadFallbackHtml(pptUrl));
            }
        });
    }

    // 公有方法：销毁组件（只清空iframe，不修改其他内容）
    function destroy() {
        $('#' + defaults.containerId).attr('src', 'about:blank').hide();
        $('#' + defaults.errorContainerId).hide();
    }

    // 暴露公有方法
    return {
        init: init,
        preview: preview,
        destroy: destroy
    };
})();
// 初始化PPT预览组件（画法几何）
$(document).ready(function() {
    PptPreviewer.init({
        containerId: 'resIframe',
        errorContainerId: 'buildTip'
    });
});
// ====================== 全局跳转函数（已修复PDF 500错误）======================
function goToEnterItem(appliId, experimentStr, publisher, zyType, status, curriculumId, experimentId) {
    // 将实验信息存储到localStorage（和enterItem页面参数完全一致）
    localStorage.setItem("appliId", appliId);
    localStorage.setItem("experimentStr", experimentStr);
    localStorage.setItem("publisher", publisher);
    localStorage.setItem("zyType", zyType);
    localStorage.setItem("status", status);
    localStorage.setItem("curriculumId", curriculumId);
    localStorage.setItem("experimentId", experimentId);
    
    // 关键修复：使用纯文本代替不存在的PDF，避免服务器报错
    localStorage.setItem("sellPoint", "本实验通过虚拟现实技术，直观展示" + experimentStr + "的核心原理和操作流程。\n\n" +
        "实验目标：\n" +
        "1. 掌握" + experimentStr + "的基本概念\n" +
        "2. 理解相关的工程原理\n" +
        "3. 熟悉实际操作步骤\n\n" +
        "点击下方\"开始学习\"按钮进入VR实验环境。");
    
    // 在新窗口打开VR资源详情页
    window.open("https://www.keming365.com/enterItem", "_blank");
}

// ====================== 完整课程数据 ======================
var courseData = [
    { title: "1.制图的基础知识与技能", children: [
        { title: "1.1 技术制图国家标准的一般规定", pptUrl: "1.1 技术制图国家标准的一般规定.pptx", videoUrl: "", vrUrl: "" },
        { title: "1.2 绘图工具的使用方法", pptUrl: "1.2 绘图工具的使用方法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963652965072896"
        },
        { title: "1.3 几何作图", pptUrl: "1.3 几何作图.pptx", videoUrl: "",
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963696963321856,https://yq.keming365.com/webclient/?appliId=1293963653690687488,https://yq.keming365.com/webclient/?appliId=1293963624888401920,https://yq.keming365.com/webclient/?appliId=1293963808938655744;https://yq.keming365.com/webclient/?appliId=1293963798503227392"
        },
        { title: "1.4 平面图形分析及画法", pptUrl: "1.4 平面图形的分析及画法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1512491571277201408" 
        }
    ]},
    { title: "2.正投影基础", defaultOpen:true, children: [
        { title: "2.1 投影的基础知识", pptUrl: "2.1投影的基础知识.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963891025379328,https://yq.keming365.com/webclient/?appliId=1293963976874393600,https://yq.keming365.com/webclient/?appliId=1293964045652590592,https://yq.keming365.com/webclient/?appliId=1293964304696999936" 
        },
        { title: "2.2 三视图的形成和投影规律", defaultOpen:true, 
          pptUrl: "2.2三视图的形成和投影规律.pptx",
          videoUrl: "https://www.keming365.com/upload/qypt/node/video/三视图的形成.mp4",
          vrUrl: "https://yq.keming365.com/webclient/?appliId=834070253582417920,https://yq.keming365.com/webclient/?appliId=834070376249032704,https://yq.keming365.com/webclient/?appliId=722476178471911424"
        },
        { title: "2.3 点的投影", pptUrl: "2.3  点的投影.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963881810493440,https://yq.keming365.com/webclient/?appliId=1293963886390673408,https://yq.keming365.com/webclient/?appliId=1293963887120482304" 
        },
        { title: "2.4 直线的投影", pptUrl: "2.4 直线的投影.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963911564886016,https://yq.keming365.com/webclient/?appliId=1293963964333424640,https://yq.keming365.com/webclient/?appliId=722475055308603392,https://yq.keming365.com/webclient/?appliId=722475251648167936,https://yq.keming365.com/webclient/?appliId=1293964000026951680,https://yq.keming365.com/webclient/?appliId=1293963997757833216,https://yq.keming365.com/webclient/?appliId=1293963988475838464,https://yq.keming365.com/webclient/?appliId=1293963999762710528" 
        },
        { title: "2.5 平面的投影", pptUrl: "2.5 平面的投影.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293964005794119680,https://yq.keming365.com/webclient/?appliId=722475664686448640,https://yq.keming365.com/webclient/?appliId=722475453977198592" 
        },
        { title: "2.6 各种几何元素之间的相互位置", pptUrl: "2.6 各种几何元素间的相对位置.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293964101583634432,https://yq.keming365.com/webclient/?appliId=1293964180054867968" 
        },
        { title: "2.7 换面法", pptUrl: "2.7 换面法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293964467184336896,https://yq.keming365.com/webclient/?appliId=1293964287210946560,https://yq.keming365.com/webclient/?appliId=1293964324758355968,https://yq.keming365.com/webclient/?appliId=1293964303778447360,https://yq.keming365.com/webclient/?appliId=1293964346304495616,https://yq.keming365.com/webclient/?appliId=1293964465703747584,https://yq.keming365.com/webclient/?appliId=1293964467184336896,https://yq.keming365.com/webclient/?appliId=1293964495508471808" 
        }
    ]},
    { title: "3.基本立体的视图", children: [
        { title: "3.1 平面立体", pptUrl: "3.1 平面立体的视图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722481994545496064,https://yq.keming365.com/webclient/?appliId=1293964575112167424,https://yq.keming365.com/webclient/?appliId=733994232435441664" 
        },
        { title: "3.2 曲面立体", pptUrl: "3.2 曲面立体.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293964693395734528,https://yq.keming365.com/webclient/?appliId=1293964556950831104,https://yq.keming365.com/webclient/?appliId=1293964624361684992" 
        },
    ]},
    { title: "4.截交线和相贯线", children: [
        { title: "4.1 截交线", pptUrl: "4.1 截交线.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293964863923552256,https://yq.keming365.com/webclient/?appliId=1293964975965995008,https://yq.keming365.com/webclient/?appliId=1293964985407373312,https://yq.keming365.com/webclient/?appliId=1293963669926838272,https://yq.keming365.com/webclient/?appliId=1293964666099204096,https://yq.keming365.com/webclient/?appliId=1293964703134908416,https://yq.keming365.com/webclient/?appliId=1293964776631697408,https://yq.keming365.com/webclient/?appliId=1293964811175985152,https://yq.keming365.com/webclient/?appliId=1293963668521746432" 
        },
        { title: "4.2 相贯线", pptUrl: "4.2 相贯线.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722485919931695104,https://yq.keming365.com/webclient/?appliId=1293964905027731456,https://yq.keming365.com/webclient/?appliId=1293964872609955840,https://yq.keming365.com/webclient/?appliId=1293963619708436480,https://yq.keming365.com/webclient/?appliId=1293964871301332992,https://yq.keming365.com/webclient/?appliId=1293964919758127104" 
        }
    ]},
    { title: "5.组合体", children: [
        { title: "5.1 组合体形体分析", pptUrl: "5.1 组合体的形体分析.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965056689569792,https://yq.keming365.com/webclient/?appliId=1293965173404467200,https://yq.keming365.com/webclient/?appliId=1293965148658073600" 
        },
        { title: "5.2 组合体画图方法", pptUrl: "5.2 组合体的画图方法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722488549676417024,https://yq.keming365.com/webclient/?appliId=1293965056689569792,https://yq.keming365.com/webclient/?appliId=1293965173404467200" 
        },
        { title: "5.3 组合体视图的尺寸注法", pptUrl: "5.3 组合体的尺寸标注方法.pptx", videoUrl: "", vrUrl: "" },
        { title: "5.4 组合体读图", pptUrl: "5.4 组合体的读图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965055636799488,https://yq.keming365.com/webclient/?appliId=722489450201874432,https://yq.keming365.com/webclient/?appliId=1293965125589401600"
        }
    ]},
    { title: "6.轴测投影图", children: [
        { title: "6.1 轴测投影概念", pptUrl: "6.1 轴测投影的概念.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965265230364672" 
        },
        { title: "6.2 正等轴测图的画法", pptUrl: "6.2 正等轴测图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965309304111104,https://yq.keming365.com/webclient/?appliId=1293965310612733952,https://yq.keming365.com/webclient/?appliId=1293965256241971200,https://yq.keming365.com/webclient/?appliId=1293965282926133248,https://yq.keming365.com/webclient/?appliId=1293965406536466432,https://yq.keming365.com/webclient/?appliId=1293965438148935680,https://yq.keming365.com/webclient/?appliId=1293965172649492480" 
        },
        { title: "6.3 斜二测投影图", pptUrl: "6.3 斜二测图的画法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965222523961344,https://yq.keming365.com/webclient/?appliId=1293965265943396352" 
        }
    ]},
    { title: "7.机件的表示方法", children: [
        { title: "7.1 视图", pptUrl: "7.1 视图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965540083105792,https://yq.keming365.com/webclient/?appliId=1293965628054437888,https://yq.keming365.com/webclient/?appliId=1293965668546248704,https://yq.keming365.com/webclient/?appliId=1293965684916617216" 
        },
        { title: "7.2 剖视图", pptUrl: "7.2 剖视图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965440162201600,https://yq.keming365.com/webclient/?appliId=722490909484122112" 
        },
        { title: "7.3 断面图", pptUrl: "7.3 断面图.pptx", videoUrl: "", vrUrl: "" },
        { title: "7.4 其他表达方法", pptUrl: "7.4 其它表达方法.pptx", videoUrl: "", vrUrl: "" },
        { title: "7.5 表示方法综合应用和看图", pptUrl: "7.5 表达方法的综合应用和读图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965653228650496,https://yq.keming365.com/webclient/?appliId=722492564678115328" 
        }
    ]},
    { title: "8.标准件和常用件", children: [
        { title: "8.1 螺纹", pptUrl: "8.1 螺纹及螺纹紧固件.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722492714532208640" 
        },
        { title: "8.2 螺纹紧固件", pptUrl: "8.2 螺纹紧固件及表示法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=734008177456054272,https://yq.keming365.com/webclient/?appliId=722493152950222848,https://yq.keming365.com/webclient/?appliId=1293965717879652352,https://yq.keming365.com/webclient/?appliId=734008531392397312,https://yq.keming365.com/webclient/?appliId=1293965735889993728,https://yq.keming365.com/webclient/?appliId=734008726645637120,https://yq.keming365.com/webclient/?appliId=1293965772338495488" 
        },
        { title: "8.3 齿轮", pptUrl: "8.3 齿轮及表示法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965793687502848,https://yq.keming365.com/webclient/?appliId=734010378119282688,https://yq.keming365.com/webclient/?appliId=722494695262912512" 
        },
        { title: "8.4 其他标准件", pptUrl: "8.4 键的表示法.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965889078558720,https://yq.keming365.com/webclient/?appliId=1293966197007581184,https://yq.keming365.com/webclient/?appliId=722495270595592192,https://yq.keming365.com/webclient/?appliId=722495365265227776,https://yq.keming365.com/webclient/?appliId=722495534715109376" 
        },
        { title: "8.5 销", pptUrl: "8.5 销.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722495841859796992,https://yq.keming365.com/webclient/?appliId=1293965802738810880" 
        },
        { title: "8.6 滚动轴承", pptUrl: "8.6 滚动轴承.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293965900046663680" 
        }
    ]},
    { title: "9.零件图", children: [
        { title: "9.1 零件图概述", pptUrl: "9.1 零件图概述.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722496323021963264" 
        },
        { title: "9.2 视图选择及尺寸标注", pptUrl: "9.2  零件图的视图选择及尺寸标注.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722498425433620480,https://yq.keming365.com/webclient/?appliId=706131932974415872" 
        },
        { title: "9.3 常见典型零件", pptUrl: "9.3 常见典型零件分析.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293966151897841664,https://yq.keming365.com/webclient/?appliId=1293965959857438720,https://yq.keming365.com/webclient/?appliId=1293965932045008896,https://yq.keming365.com/webclient/?appliId=1293965982854807552,https://yq.keming365.com/webclient/?appliId=1293965978878607360,https://yq.keming365.com/webclient/?appliId=1293966027570282496,https://yq.keming365.com/webclient/?appliId=1293966054459965440,https://yq.keming365.com/webclient/?appliId=1293966060466208768" 
        },
        { title: "9.4 零件上常见结构及尺寸标柱", pptUrl: "9.4 零件上常见结构及尺寸标柱.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293966099490013184,https://yq.keming365.com/webclient/?appliId=720648106525327360,https://yq.keming365.com/webclient/?appliId=1293966086017908736" 
        },
        { title: "9.5 读零件图", pptUrl: "9.5 读零件图.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293966137578487808" 
        },
        { title: "9.6 零件的测绘", pptUrl: "9.6 零件的测绘.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=734042081181302784,https://yq.keming365.com/webclient/?appliId=734045055605538816,https://yq.keming365.com/webclient/?appliId=734045195347165184,https://yq.keming365.com/webclient/?appliId=734045626571948032,https://yq.keming365.com/webclient/?appliId=734045338372931584" 
        }
    ]},
    { title: "10.机械图样的技术要求", children: [
        { title: "10.1 表面结构", pptUrl: "10.1 表面结构.pptx", videoUrl: "", vrUrl: "" },
        { title: "10.2 极限与配合的基本概念及标注", pptUrl: "10.2 极限与配合的基本概念及标注.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=722498621861265408,https://yq.keming365.com/webclient/?appliId=1293963831604674560" 
        },
        { title: "10.3 几何公差的基本概念及标注", pptUrl: "10.3 几何公差的基本概念及标注.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=734042258092851200,https://yq.keming365.com/webclient/?appliId=722412981601697792,https://yq.keming365.com/webclient/?appliId=722408897184268288,https://yq.keming365.com/webclient/?appliId=722409842395840512,https://yq.keming365.com/webclient/?appliId=722408225911078912,https://yq.keming365.com/webclient/?appliId=722447376526082048,https://yq.keming365.com/webclient/?appliId=722449009687396352,https://yq.keming365.com/webclient/?appliId=722452855629283328" 
        }
    ]},
    { title: "11.装配图", children: [
        { title: "11.1 装配图基本概念", pptUrl: "11.1 装配图的基本概念.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963798914269184" 
        },
        { title: "11.2 装配图表达方法", pptUrl: "11.2  装配图的表达方法.pptx", videoUrl: "", vrUrl: "" },
        { title: "11.3 画装配图的方法和步骤", pptUrl: "11.3 画装配图的方法和步骤.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963799904124928" 
        },
        { title: "11.4 装配图的尺寸标注和技术要求", pptUrl: "11.4  装配图的尺寸标注和技术要求.pptx", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1293963874772451328" 
        },
        { title: "11.5 装配图中的序号、明细栏和标题栏", pptUrl: "11.5 装配图中的序号、明细栏和标题栏.pptx", videoUrl: "", vrUrl: "" },
        { title: "11.6 常见装配结构简介", pptUrl: "11.6 常见装配结构简介.pptx", videoUrl: "", vrUrl: "" },
        { title: "11.7 装配图读图", pptUrl: "11.7 读装配图.pptx", videoUrl: "", vrUrl: "" },
        { title: "11.8 装配图拆画零件图", pptUrl: "11.8 由装配图拆画零件图.pptx", videoUrl: "", vrUrl: "" },
    ]}
];

// 液压与气压传动课程目录数据（已将PPT和视频转移到3.3叶片泵）
var hydraulicCourseData = [
    { title: "1.绪论", children: [
        { title: "1.1 液压传动的发展", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "1.2 液压传动的工作原理及液压传动系统的组成", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722083329788084224" },
        { title: "1.3 液压元件的图形符号", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722083572797669376" },
		{ title: "1.4 液压传动的优缺点及应用", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "2.液压油与液压流体力学基础", children: [
        { title: "2.1 液体的物理性质", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722083683342745600" },
        { title: "2.2 液体静力学基础", pptUrl: "", videoUrl: "", 
          vrUrl: "" },
        { title: "2.3 液体动力学基础", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722083811399041024" },
        { title: "2.4 液体流动时的压力损失", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "2.5 液体流过小孔和缝隙的流量", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722083921042341888" },
		{ title: "2.6 液压冲击和气穴现象", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "3.液压泵与液压马达", defaultOpen:true, children: [
        { title: "3.1 概述", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722084027971928064" },
        { title: "3.2 齿轮泵", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722084126605180929,http://keming365.com/user/showPPT?appliId=722084261015846912,http://keming365.com/user/showPPT?appliId=722084611982622720,http://keming365.com/user/showPPT?appliId=722084796712353792,http://keming365.com/user/showPPT?appliId=722085051642150912,http://keming365.com/user/showPPT?appliId=722085176326225920" },
        { title: "3.3 叶片泵", defaultOpen:true, 
          pptUrl: "https://www.keming365.com/file/PPT/3.3叶片泵.pptx",
          videoUrl: "https://www.keming365.com/upload/qypt/node/video/叶片泵.mp4",
          vrUrl: "https://www.keming365.com/3d/?appliId=722085285801754624;https://www.keming365.com/3d/?appliId=722085575967899648;https://www.keming365.com/3d/?appliId=722085804632965120;https://www.keming365.com/3d/?appliId=722085987672391680;https://www.keming365.com/3d/?appliId=722086186947969024;https://www.keming365.com/3d/?appliId=799659512758796288;https://www.keming365.com/3d/?appliId=722086842421215232"
        },
        { title: "3.4 柱塞泵", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722087024374317056,http://keming365.com/user/showPPT?appliId=722087198496653312,http://keming365.com/user/showPPT?appliId=722087427514040320,http://keming365.com/user/showPPT?appliId=722087623400620032,http://keming365.com/user/showPPT?appliId=722088281688244224" },
        { title: "3.5 各类液压泵的性能比较及应用", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "3.6 液压马达", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "4.液压缸", children: [
        { title: "4.1 液压缸的工作原理、类型和特点", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722088376710201344" },
        { title: "4.2 液压缸基本参数的计算", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722088915321749504,http://keming365.com/user/showPPT?appliId=722094041956614144,http://keming365.com/user/showPPT?appliId=722094151910293504,http://keming365.com/user/showPPT?appliId=722094250090561536,http://keming365.com/user/showPPT?appliId=722094471335903232,http://keming365.com/user/showPPT?appliId=722094794196647936,http://keming365.com/user/showPPT?appliId=722094932382187520,http://keming365.com/user/showPPT?appliId=722095040330989568,http://keming365.com/user/showPPT?appliId=722095224481906688" },
        { title: "4.3 液压缸的典型结构", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722095310913929216" 
        },
		{ title: "4.4 液压缸的设计", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "5.液压控制阀", children: [
		{ title: "5.1 概述", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "5.2 方向控制阀", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722095406900576256,http://keming365.com/user/showPPT?appliId=722095588690100224,http://keming365.com/user/showPPT?appliId=722095673859637248,http://keming365.com/user/showPPT?appliId=722095758341308416,http://keming365.com/user/showPPT?appliId=722095850314006528,http://keming365.com/user/showPPT?appliId=722096024125964288,http://keming365.com/user/showPPT?appliId=722096235766349824,http://keming365.com/user/showPPT?appliId=722096456986525696,http://keming365.com/user/showPPT?appliId=722096664478744576,http://keming365.com/user/showPPT?appliId=722097575938752512,http://keming365.com/user/showPPT?appliId=722097989669093376" },
        { title: "5.3 压力控制阀", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722098082346434560,http://keming365.com/user/showPPT?appliId=722098170565230592,http://keming365.com/user/showPPT?appliId=722098749618257920,http://keming365.com/user/showPPT?appliId=722099031769088000,http://keming365.com/user/showPPT?appliId=722099136765100032,http://keming365.com/user/showPPT?appliId=722099229492772864,http://keming365.com/user/showPPT?appliId=722099323361296384,http://keming365.com/user/showPPT?appliId=722099416474845184,http://keming365.com/user/showPPT?appliId=722099546657652736,http://keming365.com/user/showPPT?appliId=722099993778847744" },
        { title: "5.4 流量控制阀", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722100247148363776,http://keming365.com/user/showPPT?appliId=722100365876527104,http://keming365.com/user/showPPT?appliId=722100477528899584,http://keming365.com/user/showPPT?appliId=722100699743125504,http://keming365.com/user/showPPT?appliId=722101050852507648" },
        { title: "5.5 电液比例阀和伺服阀", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "5.6 插装阀及叠加阀", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722101207413293056" }
    ]},
    { title: "6.辅助装置", children: [
        { title: "6.1 过滤器", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "6.2 蓄能器", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722101319208271872" },
        { title: "6.3 油箱", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "6.4 热交换器", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "6.5 连接件", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722101431024222208" },
		{ title: "6.6 密封装置", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "7. 液压基本回路", children: [
        { title: "7.1 压力控制回路", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722102052242587648,http://keming365.com/user/showPPT?appliId=722103209182625792,http://keming365.com/user/showPPT?appliId=722103381371387904,http://keming365.com/user/showPPT?appliId=722103477408366592,http://keming365.com/user/showPPT?appliId=722103560883404800,http://keming365.com/user/showPPT?appliId=722103656287043584,http://keming365.com/user/showPPT?appliId=722103871190597632,http://keming365.com/user/showPPT?appliId=722104078783479808,http://keming365.com/user/showPPT?appliId=722104170311581696,http://keming365.com/user/showPPT?appliId=722104260069687296,http://keming365.com/user/showPPT?appliId=722104393591160832" },
        { title: "7.2 速度控制回路", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722104480513916928,http://keming365.com/user/showPPT?appliId=722104588211060736,http://keming365.com/user/showPPT?appliId=722104681718874112,http://keming365.com/user/showPPT?appliId=722104777143484416,http://keming365.com/user/showPPT?appliId=722104864208846848,http://keming365.com/user/showPPT?appliId=722105026440331264,http://keming365.com/user/showPPT?appliId=722105117771300864,http://keming365.com/user/showPPT?appliId=722105204790525952,http://keming365.com/user/showPPT?appliId=722105366506110976,http://keming365.com/user/showPPT?appliId=722105546714382336" },
        { title: "7.3 方向控制回路", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "7.4 多缸动作回路", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722105674338664448,http://keming365.com/user/showPPT?appliId=722105776243474432,http://keming365.com/user/showPPT?appliId=722105933110444032,http://keming365.com/user/showPPT?appliId=722106164942209024" }
    ]},
    { title: "8.典型液压系统", children: [
        { title: "8.1 液压系统图的阅读和分析方法", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "8.2 YT4543型动力滑台液压系统", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722106262208118784" },
        { title: "8.3 MLS₃-170型采煤机及其液压牵引系统", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "8.4 Q2-8型汽车起重机液压系统", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "8.5 YB32-200型压力机的液压系统", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "8.6 XS-ZY-250A型注塑机比例液压系统", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "8.7 盘式热分散机比例压力和流量复合控制液压系统", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722106486834069504" },
		{ title: "8.8 XLB1800×10000平板硫化机的液压系统", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "9.液压系统的设计与计算", children: [
        { title: "9.1 液压系统的设计步骤和方法", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "9.2 液压系统设计计算举例", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "10.液压伺服系统", children: [
        { title: "10.1 概述", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722106598234783744" },
        { title: "10.2 典型的液压伺服控制元件", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722106863532900352,http://keming365.com/user/showPPT?appliId=722107060572913664,http://keming365.com/user/showPPT?appliId=722107316677115904,http://keming365.com/user/showPPT?appliId=722107540774584320,http://keming365.com/user/showPPT?appliId=722107684052008960" },
        { title: "10.3 电液伺服阀", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722107769003442176" },
        { title: "10.4 液压伺服系统实例", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722107923664207872,http://keming365.com/user/showPPT?appliId=722108112235921408" }
    ]},
	{ title: "11.液压伺服系统", children: [
        { title: "11.1 气压传动基本知识", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "11.2 气源装置及辅助元件", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "11.3 气动执行元件", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "11.4 气动控制元件", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "11.5 气动基本回路", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "11.6 气动系统实例", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "11.7 气动系统的设计", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
	{ title: "12.液压伺服系统", children: [
        { title: "12.1 液压系统的安装", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "12.2 液压系统的调试", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "12.3 液压系统的使用、维护和保养", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "12.4 气动系统的安装调试与使用维护", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
	{ title: "13.液压系统的故障诊断", children: [
        { title: "13.1 液压系统的故障原因分析", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "13.2 液压系统的故障特征与诊断步骤", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "13.3 液压系统的故障诊断方法", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722108551127891968" },
        { title: "13.4 150kN电镗机液压系统的故障诊断实例", pptUrl: "", videoUrl: "", 
          vrUrl: "http://keming365.com/user/showPPT?appliId=722108702420631552" }
    ]}
];

// 工程训练课程目录数据
var engineeringCourseData = [
    { title: "1.工程材料基础知识", children: [
        { title: "1.1 工程材料的分类", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "1.2 金属材料", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "1.3 非金属材料", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "1.4 复合材料", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "2.铸造", defaultOpen:true, children: [
        { title: "2.1 型砂和芯砂", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "2.2 常用的造型方法", defaultOpen:true, 
          pptUrl: "https://www.keming365.com/file/PPT/2.2常用造型方法.pptx",
          videoUrl: "https://www.keming365.com/upload/qypt/node/video/铸造.mp4",
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475953117200384;https://yq.keming365.com/webclient/?appliId=1458475955033997312;https://yq.keming365.com/webclient/?appliId=1458475950038581248;https://yq.keming365.com/webclient/?appliId=1458475968803897344;https://yq.keming365.com/webclient/?appliId=1458475972192894976;https://yq.keming365.com/webclient/?appliId=1458475915620122624;https://yq.keming365.com/webclient/?appliId=1458475988752007168;https://yq.keming365.com/webclient/?appliId=1458475981906903040"
        },
        { title: "2.3 合金的熔炼", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475967432359936;https://yq.keming365.com/webclient/?appliId=1458475948079841280" 
        },
        { title: "2.4 铸件的浇筑、落砂、清理及缺陷分析", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "3.锻压", children: [
        { title: "3.1 金属加热与锻件冷却", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475970355789824;https://yq.keming365.com/webclient/?appliId=1458476030032347136" 
        },
        { title: "3.2 自由锻造", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476024147738624;https://yq.keming365.com/webclient/?appliId=1458476046960558080;https://yq.keming365.com/webclient/?appliId=1458476037473042432;https://yq.keming365.com/webclient/?appliId=1458476105466904576" 
        },
        { title: "3.3 模型锻造", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476118846734336;https://yq.keming365.com/webclient/?appliId=1458476083484557312;https://yq.keming365.com/webclient/?appliId=1458475981244203008;https://yq.keming365.com/webclient/?appliId=1458476025691242496;https://yq.keming365.com/webclient/?appliId=1458475986424168448;https://yq.keming365.com/webclient/?appliId=1458476116263043072" 
        },
        { title: "3.4 板料冲压", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476087049715712;https://yq.keming365.com/webclient/?appliId=1458476019659833344" 
        }
    ]},
    { title: "4.焊接", children: [
        { title: "4.1 焊条电弧焊", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476252674392064;https://yq.keming365.com/webclient/?appliId=1458476211566018560;https://yq.keming365.com/webclient/?appliId=1458476275785007104;https://yq.keming365.com/webclient/?appliId=1458476143765094400;https://yq.keming365.com/webclient/?appliId=1458476162186477568;https://yq.keming365.com/webclient/?appliId=1458476168721203200;https://yq.keming365.com/webclient/?appliId=1458476172244418560" 
        },
        { title: "4.2 气焊与气割", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476102707052544;https://yq.keming365.com/webclient/?appliId=1458476093915791360;https://yq.keming365.com/webclient/?appliId=1458476169606201344;https://yq.keming365.com/webclient/?appliId=1458476162358444033" 
        },
        { title: "4.3 其他焊接方法", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476151734272000" 
        },
        { title: "4.4 常见焊接缺陷及其检验方法", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "5.金属热处理", children: [
        { title: "5.1 钢的热处理工艺", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476229094014976" 
        },
        { title: "5.2 常用热处理设备", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476252091383808;https://yq.keming365.com/webclient/?appliId=1458476252091383808;https://yq.keming365.com/webclient/?appliId=1458476208390930432;https://yq.keming365.com/webclient/?appliId=1458476414046044160" 
        },
        { title: "5.3 热处理常见缺陷", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "5.4 常用硬度测试", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
    { title: "6.金属切削加工基本知识", children: [
        { title: "6.1 切削加工的基本概念", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476227579871232;https://yq.keming365.com/webclient/?appliId=1458476287717801984" 
        },
        { title: "6.2 切削加工质量", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "6.3 金属切削机床基本知识", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476311902158848;https://yq.keming365.com/webclient/?appliId=1458476342772236288;https://yq.keming365.com/webclient/?appliId=1458476498355748864;https://yq.keming365.com/webclient/?appliId=1458476351949373440;https://yq.keming365.com/webclient/?appliId=1458476357989171200;https://yq.keming365.com/webclient/?appliId=1458476388368515072;https://yq.keming365.com/webclient/?appliId=1458476406068477952" 
        },
		{ title: "6.4 常用量具", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476498896814080;https://yq.keming365.com/webclient/?appliId=1458476561010262016;https://yq.keming365.com/webclient/?appliId=1458476281250185216" 
        }
    ]},
    { title: "7.车削加工", children: [
        { title: "7.1 车床", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476378222493696;https://yq.keming365.com/webclient/?appliId=1458476488239087616;https://yq.keming365.com/webclient/?appliId=1458476539325710336" 
        },
        { title: "7.2 车刀的基本知识", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476392487321600;https://yq.keming365.com/webclient/?appliId=1458476405548384256;https://yq.keming365.com/webclient/?appliId=1458476439576772608" 
        },
        { title: "7.3 车床的夹具及工件装夹", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476430227668992;https://yq.keming365.com/webclient/?appliId=1458476438201040896;https://yq.keming365.com/webclient/?appliId=1458476429950844928;https://yq.keming365.com/webclient/?appliId=1458476445058727936;https://yq.keming365.com/webclient/?appliId=1458476461676560384" 
        },
		{ title: "7.4 车削基本工作", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476462809022464;https://yq.keming365.com/webclient/?appliId=1458476489451241472;https://yq.keming365.com/webclient/?appliId=1458476489002450944;https://yq.keming365.com/webclient/?appliId=1458476488738209792;https://yq.keming365.com/webclient/?appliId=1458476518660374528;https://yq.keming365.com/webclient/?appliId=1458476507394473984;https://yq.keming365.com/webclient/?appliId=1458476550671302656" 
        },
		{ title: "7.5 常见成形面的车削及螺纹加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476532191199232;https://yq.keming365.com/webclient/?appliId=1458476564839661568;https://yq.keming365.com/webclient/?appliId=1458476600289918976;https://yq.keming365.com/webclient/?appliId=1458476526939930624" 
        }
    ]},
    { title: "8.铣削、刨削和磨削加工", children: [
        { title: "8.1 铣削加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476546762211328;https://yq.keming365.com/webclient/?appliId=1458476613799772160;https://yq.keming365.com/webclient/?appliId=1458476777155330048;https://yq.keming365.com/webclient/?appliId=1458476745547055104;https://yq.keming365.com/webclient/?appliId=1458476798474977280;https://yq.keming365.com/webclient/?appliId=1458476804716101632;https://yq.keming365.com/webclient/?appliId=1458476807622754304;https://yq.keming365.com/webclient/?appliId=1458476559617753088;https://yq.keming365.com/webclient/?appliId=1458476565032599552;https://yq.keming365.com/webclient/?appliId=1458476564155990017;https://yq.keming365.com/webclient/?appliId=1458476597454569472;https://yq.keming365.com/webclient/?appliId=1458476586171891712;https://yq.keming365.com/webclient/?appliId=1458476595760070656;https://yq.keming365.com/webclient/?appliId=1458476609659994112;https://yq.keming365.com/webclient/?appliId=1458476597601370112;https://yq.keming365.com/webclient/?appliId=1458476615527825408;https://yq.keming365.com/webclient/?appliId=1458476647769440256;https://yq.keming365.com/webclient/?appliId=1458476682716381184;https://yq.keming365.com/webclient/?appliId=1458476719538176000;https://yq.keming365.com/webclient/?appliId=1458476657542168576" 
        },
        { title: "8.2 刨削加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476657315676160;https://yq.keming365.com/webclient/?appliId=1458476707454386176;https://yq.keming365.com/webclient/?appliId=1458476654425800704;https://yq.keming365.com/webclient/?appliId=1458476872097595392;https://yq.keming365.com/webclient/?appliId=1458476699401322496;https://yq.keming365.com/webclient/?appliId=1458476815919087616" 
        },
        { title: "8.3 磨削加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476737644986368;https://yq.keming365.com/webclient/?appliId=1458476735367479296;https://yq.keming365.com/webclient/?appliId=1458476836794138624;https://yq.keming365.com/webclient/?appliId=1458476760516526080;https://yq.keming365.com/webclient/?appliId=1458476779684495360;https://yq.keming365.com/webclient/?appliId=1458476814912454656" 
        }
    ]},
	{ title: "9.钳工", children: [
        { title: "9.1 划线", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476864057114624;https://yq.keming365.com/webclient/?appliId=1458476861913825280;https://yq.keming365.com/webclient/?appliId=1458476942020837376" 
        },
        { title: "9.2 锯削与锉削", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476918209773568;https://yq.keming365.com/webclient/?appliId=1458477035688034304;https://yq.keming365.com/webclient/?appliId=1458476836127244288;https://yq.keming365.com/webclient/?appliId=1458476851205767168;https://yq.keming365.com/webclient/?appliId=1458476824714543104" 
        },
        { title: "9.3 攻螺纹和套螺纹", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476961557905408" 
        },
        { title: "9.4 孔加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476957808197632;https://yq.keming365.com/webclient/?appliId=1458477014611656704;https://yq.keming365.com/webclient/?appliId=1458477047083958272;https://yq.keming365.com/webclient/?appliId=1458477002087464960;https://yq.keming365.com/webclient/?appliId=1458476869077696512;https://yq.keming365.com/webclient/?appliId=1458476834264973312;https://yq.keming365.com/webclient/?appliId=1458476847997124608" 
        },
		{ title: "9.5 錾削与刮削", pptUrl: "", videoUrl: "", vrUrl: "" },
		{ title: "9.6 装配和拆卸", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
	{ title: "10.电工", children: [
        { title: "10.1 安全用电", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "10.2 卧式车床的电气控制", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475886561984512;https://yq.keming365.com/webclient/?appliId=1458475888428449792" 
        },
        { title: "10.3 电工仪表简介", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476972123357184;https://yq.keming365.com/webclient/?appliId=1458475868761358336;https://yq.keming365.com/webclient/?appliId=1458475876428546048;https://yq.keming365.com/webclient/?appliId=1458475900201861120" 
        }
    ]},
	{ title: "11.数控加工", children: [
        { title: "11.1 概述", pptUrl: "", videoUrl: "", vrUrl: "" },
        { title: "11.2 数控车床", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475881432350720;https://yq.keming365.com/webclient/?appliId=1458476899041804288" 
        },
        { title: "11.3 数控铣床", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475886088028160" 
        },
	    { title: "11.4 加工中心", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458476980314832896"
        },
	    { title: "11.5 数控机床编程基础", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]},
	{ title: "12.特种加工、工业机器人及塑料成型", children: [
        { title: "12.1 特种加工", pptUrl: "", videoUrl: "", 
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1458475889128898560;https://yq.keming365.com/webclient/?appliId=1514226100429914112;https://yq.keming365.com/webclient/?appliId=1458475911304183808;https://yq.keming365.com/webclient/?appliId=1458475906690449408;https://yq.keming365.com/webclient/?appliId=1458475909613879296;https://yq.keming365.com/webclient/?appliId=1458475911073497088" 
        },
        { title: "12.2 工业机器人", pptUrl: "", videoUrl: "",
          vrUrl: "https://yq.keming365.com/webclient/?appliId=1496907482985922560" 
        },
        { title: "12.3 塑料成型", pptUrl: "", videoUrl: "", vrUrl: "" },
	    { title: "12.4 在工程训练中培养学生的创新意识和创新能力", pptUrl: "", videoUrl: "", vrUrl: "" }
    ]}
];

var itemModules = [
    { name: "① 带你学", children: [
        { name: "课程视频", type: "video" },
        { name: "课程PPT", type: "ppt" }
    ]},
    { name: "② 陪你练", children: [
        { name: "在线测验", type: "test" }
    ]},
    { name: "③ 帮你改", children: [
        { name: "在线批改", type: "correct" }
    ]},
    { name: "④ 助你学", children: [
        { name: "AI助学", type: "ai-edu" },
        { name: "VR资源", type: "vr" }
    ]}
];

// ====================== 页面切割函数 - 模块提取方式 ======================
function splitAiPage(lessonId, moduleType, iframeId) {
    // 基础URL
    var baseUrl = 'https://www.keming365.com/ai/index.html#/chapter?lessonId=' + lessonId;
    
    // 获取iframe元素
    var $iframe = $('#' + iframeId);
    
    // 设置iframe加载完成后的回调
    $iframe.off('load').on('load', function() {
        try {
            var iframeWindow = this.contentWindow;
            var iframeDoc = this.contentDocument || iframeWindow.document;
            
            // 根据模块类型显示/隐藏内容
            switch(moduleType) {
                case 'knowledge':
                    // 只显示知识图谱内容
                    showOnlyKnowledge(iframeDoc);
                    break;
                case 'ai-edu':
                    // 只显示AI+教育大模型内容
                    showOnlyAiEdu(iframeDoc);
                    break;
                default:
                    // 显示全部内容
                    showAllContent(iframeDoc);
            }
            
        } catch(e) {
            console.log('页面切割失败:', e);
        }
    });
    
    return baseUrl;
}

// 只显示知识图谱内容
function showOnlyKnowledge(doc) {
    try {
        // 找到所有.tab-item标签按钮，全部隐藏（包括知识图谱按钮自身）
        var tabItems = doc.querySelectorAll('.tab-item');
        tabItems.forEach(function(btn) {
            btn.style.display = 'none';
        });

        // 隐藏tab导航栏（去掉顶部白色空白区域）
        // 通过注入CSS强制隐藏包含.tab-item的导航容器
        var hideStyle = doc.createElement('style');
        hideStyle.textContent = '.tab-header, .tab-bar, .tab-nav, [class*="tab-header"], [class*="tab-bar"], [class*="tab-nav"] { display: none !important; }';
        doc.head.appendChild(hideStyle);
        // 同时直接隐藏tab-item的直接父容器（导航条本身）
        if(tabItems.length > 0) {
            var directParent = tabItems[0].parentElement;
            if(directParent) {
                directParent.style.display = 'none';
                // 如果祖父容器也只是导航包裹层，也隐藏
                var grandParent = directParent.parentElement;
                if(grandParent && grandParent !== doc.body && !grandParent.querySelector('#jsmind_container') && !grandParent.querySelector('.jsmind') && !grandParent.querySelector('.tab-pane')) {
                    grandParent.style.display = 'none';
                }
            }
        }
        
        // 找到知识图谱容器并确保显示
        var knowledgeContainer = doc.getElementById('jsmind_container');
        if(knowledgeContainer) {
            knowledgeContainer.style.display = 'block';
            knowledgeContainer.style.width = '100%';
            knowledgeContainer.style.height = '100%';
            
            // 确保父容器也显示
            var parent = knowledgeContainer.parentElement;
            while(parent) {
                parent.style.display = 'block';
                parent.style.width = '100%';
                parent.style.height = '100%';
                parent = parent.parentElement;
            }
        }
        
        // 隐藏其他可能的模块容器
        var otherModules = doc.querySelectorAll('[id*="container"], [class*="container"]');
        otherModules.forEach(function(container) {
            if(container.id !== 'jsmind_container' && 
               !container.classList.contains('jsmind-inner') &&
               !container.classList.contains('theme-primary')) {
                // 检查是否是知识图谱的父容器
                var hasJsMind = container.querySelector('#jsmind_container, .jsmind');
                if(!hasJsMind) {
                    container.style.display = 'none';
                }
            }
        });
        
        // 尝试点击知识图谱标签
        clickTabByLabel(doc, '知识图谱');
        
    } catch(e) {
        console.log('显示知识图谱失败:', e);
    }
}

// 只显示AI+教育大模型内容
function showOnlyAiEdu(doc) {
    try {
        // 1. 隐藏非目标Tab标签，仅保留「AI+教育大模型」
        var tabItems = doc.querySelectorAll('.tab-item');
        tabItems.forEach(function(btn) {
            var label = btn.querySelector('.tab-label');
            if(label) {
                if(label.textContent !== 'AI+教育大模型') {
                    btn.style.display = 'none';
                }
            }
        });

        // 2. 定位AI大模型的面板并主动显示、逐层撑开
        // 通过 .chat-history 特征精准匹配AI面板，替代虚构的ID
        var aiTabPane = null;
        var allPanes = doc.querySelectorAll('.tab-pane');
        allPanes.forEach(function(pane) {
            if(pane.querySelector('.chat-history')) {
                aiTabPane = pane;
            }
        });

        if(aiTabPane) {
            aiTabPane.style.display = 'block';
            aiTabPane.style.width = '100%';
            aiTabPane.style.height = '100%';

            // 向上递归撑开所有父容器，和知识图谱函数逻辑完全对齐
            var parent = aiTabPane.parentElement;
            while(parent) {
                parent.style.display = 'block';
                parent.style.width = '100%';
                parent.style.height = '100%';
                parent = parent.parentElement;
            }

            // 撑开AI内部的container容器
            var aiInnerContainer = aiTabPane.querySelector('.container');
            if(aiInnerContainer) {
                aiInnerContainer.style.display = 'block';
                aiInnerContainer.style.width = '100%';
                aiInnerContainer.style.height = '100%';
            }
        }

        // 3. 隐藏无关模块容器（已修正排除逻辑，不会误伤AI自身）
        var otherModules = doc.querySelectorAll('[id*="container"], [class*="container"]');
        otherModules.forEach(function(container) {
            // 排除规则：AI内部容器、包含AI组件的父容器、公共主题类
            var isAiSelf = container.classList.contains('container') && container.querySelector('.chat-history');
            var hasAiContent = container.querySelector('.chat-history, .input-box');
            
            if(!isAiSelf && 
               !hasAiContent &&
               !container.classList.contains('theme-primary')) {
                // 不包含AI内容，也不是知识图谱相关，就隐藏
                var hasJsMind = container.querySelector('#jsmind_container, .jsmind');
                if(!hasJsMind) {
                    container.style.display = 'none';
                }
            }
        });

        // 4. 显式隐藏知识图谱模块，和知识图谱函数形成互斥
        var knowledgeContainer = doc.getElementById('jsmind_container');
        if(knowledgeContainer) {
            knowledgeContainer.style.display = 'none';
        }
        var mindWrapper = doc.querySelector('.mind-map-wrapper');
        if(mindWrapper) {
            mindWrapper.style.display = 'none';
        }

        // 5. 触发原生Tab切换，保证组件内部状态、渲染逻辑正常执行
        clickTabByLabel(doc, 'AI+教育大模型');

        // 6. 隐藏知识图谱和AI+教育大模型按钮自身（内容保留显示）
        var tabItems2 = doc.querySelectorAll('.tab-item');
        tabItems2.forEach(function(btn) {
            var label = btn.querySelector('.tab-label');
            if(label && (label.textContent === '知识图谱' || label.textContent === 'AI+教育大模型')) {
                btn.style.display = 'none';
            }
        });

        // 7. 隐藏tab导航栏（去掉顶部白色空白区域）
        var hideStyle2 = doc.createElement('style');
        hideStyle2.textContent = '.tab-header, .tab-bar, .tab-nav, [class*="tab-header"], [class*="tab-bar"], [class*="tab-nav"] { display: none !important; }';
        doc.head.appendChild(hideStyle2);
        if(tabItems2.length > 0) {
            var directParent2 = tabItems2[0].parentElement;
            if(directParent2) {
                directParent2.style.display = 'none';
                var grandParent2 = directParent2.parentElement;
                if(grandParent2 && grandParent2 !== doc.body && !grandParent2.querySelector('.chat-history') && !grandParent2.querySelector('.input-box') && !grandParent2.querySelector('.tab-pane')) {
                    grandParent2.style.display = 'none';
                }
            }
        }

    } catch(e) {
        console.log('显示AI+教育大模型失败:', e);
    }
}

// 显示全部内容
function showAllContent(doc) {
    try {
        // 显示所有内容
        var allElements = doc.body.children;
        for(var i = 0; i < allElements.length; i++) {
            allElements[i].style.display = '';
        }
        
        // 显示知识图谱容器
        var knowledgeContainer = doc.getElementById('jsmind_container');
        if(knowledgeContainer) {
            knowledgeContainer.style.display = '';
        }
        
    } catch(e) {
        console.log('显示全部内容失败:', e);
    }
}

// 根据标签文本点击按钮
function clickTabByLabel(doc, labelText) {
    try {
        var tabItems = doc.querySelectorAll('.tab-item');
        tabItems.forEach(function(btn) {
            var label = btn.querySelector('.tab-label');
            if(label && label.textContent === labelText) {
                btn.click();
            }
        });
    } catch(e) {
        console.log('点击标签失败:', e);
    }
}

layui.use(['element','jquery'], function(){
    var element = layui.element;
    var $ = layui.jquery;

    // ====================== 通用VR卡片渲染函数（已添加18个自定义图片）======================
    // 全局变量存储VR资源分页状态
    var vrPageInfo = {};
    
    function renderVrCards(vrUrlString, containerSelector, sectionTitle) {
        // 清空旧内容（包括卡片和分页）
        $(containerSelector).find('.vr-card-container').remove();
        $(containerSelector).find('.vr-pagination').remove();
        
        // 空值处理
        if(!vrUrlString || !vrUrlString.trim()) {
            return false;
        }
        
        // 分割VR链接（同时支持分号和逗号分隔）
        var vrUrls = vrUrlString.split(/[;,]/);
        var validUrls = [];
        for(var i=0; i<vrUrls.length; i++){
            if(vrUrls[i].trim()){
                validUrls.push(vrUrls[i].trim());
            }
        }
        
        if(validUrls.length === 0) {
            return false;
        }
        
        // 每页显示9个卡片
        var pageSize = 9;
        var totalPages = Math.ceil(validUrls.length / pageSize);
        
        // 获取或初始化当前页码（每个容器独立）
        var containerKey = containerSelector;
        if(!vrPageInfo[containerKey]) {
            vrPageInfo[containerKey] = { currentPage: 1, totalPages: totalPages };
        } else {
            vrPageInfo[containerKey].totalPages = totalPages;
            // 如果当前页码超过总页数，重置为1
            if(vrPageInfo[containerKey].currentPage > totalPages) {
                vrPageInfo[containerKey].currentPage = 1;
            }
        }
        var currentPage = vrPageInfo[containerKey].currentPage;
        
        // 计算当前页的起始和结束索引
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize, validUrls.length);
        
        // 创建卡片容器
        var cardContainer = $('<div class="vr-card-container" style="display:flex;flex-wrap:wrap;gap:20px;padding:15px 0;min-height:500px;"></div>');
        
        // 循环生成当前页的卡片
        for(var j=startIndex; j<endIndex; j++){
            var url = validUrls[j];
            var index = j + 1;
            
            // 从URL中提取appliId（兼容两种URL格式）
            var appliId = '';
            if(url.indexOf('appliId=') !== -1){
                appliId = url.split('appliId=')[1];
                if(appliId.indexOf('&') !== -1){
                    appliId = appliId.split('&')[0];
                }
            } else if(url.indexOf('id=') !== -1){
                appliId = url.split('id=')[1];
                if(appliId.indexOf('&') !== -1){
                    appliId = appliId.split('&')[0];
                }
            }
            
            // ==============================================
            // 👇👇👇 所有自定义图片和名称都在这里配置 👇👇👇
            // ==============================================
            var customImage = '';
            var customName = '';
            
            // ========== 画法几何课程 ==========
            // 1.2 图1-16 图板、丁字尺及图纸的固定
            if(appliId === '1293963652965072896'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-16 图板、丁字尺及图纸的固定.png';
                customName = '图1-16 图板、丁字尺及图纸的固定';
            }

            // 1.3.1 图1-24 用丁字尺和三角板作正六边形
            if(appliId === '1293963696963321856'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-24 用丁字尺和三角板作正六边形.png';
                customName = '图1-24 用丁字尺和三角板作正六边形';
            }

            // 1.3.2 图1-25 五等份圆周并作五边形
            if(appliId === '1293963653690687488'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-25 正等分圆周并作正五边形.png';
                customName = '图1-25 正等分圆周并作正五边形';
            }

            // 1.3.3 图1-26 n等分圆周（n=7）
            if(appliId === '1293963624888401920'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-26 n等分圆周（n=7）.png';
                customName = '图1-26 n等分圆周（n=7）';
            }

            // 1.3.4 图1-28 斜度符号和作法
            if(appliId === '1293963808938655744'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-28 斜度符号和画法.png';
                customName = '图1-28 斜度符号和画法';
            }

            // 1.3.5 图1-30 锥度符号和作法
            if(appliId === '1293963798503227392'){
                customImage = 'https://www.keming365.com/images/hfjh2/图1-30 锥度符号和作法.png';
                customName = '图1-30 锥度符号和作法';
            }

            // 1.3.6 图1-36手柄的平面图形
            if(appliId === '1512491571277201408'){
                customImage = 'https://www.keming365.com/images/图1-36 手柄的平面图形.png';
                customName = '图1-36 手柄的平面图形';
            }

            // 2.1.1 图2-1 投影法分类
            if(appliId === '1293963891025379328'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-1 投影法分类.png';
                customName = '图2-1 投影法分类';
            }

            // 2.1.2 图2-2 直线和平面的实形性
            if(appliId === '1293963976874393600'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-2 直线和平面的真实性.png';
                customName = '图2-2 直线和平面的实形性';
            }

            // 2.1.3 图2-3 直线和平面的积聚性
            if(appliId === '1293964045652590592'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-3 直线和平面的积聚性.png';
                customName = '图2-3 直线和平面的积聚性';
            }

            // 2.1.4 图2-4 直线和平面的类似性
            if(appliId === '1293964304696999936'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-4 直线和平面的类似性.png';
                customName = '图2-4 直线和平面的类似性';
            }

            // 2.2.1 中职+机械制图+图3-4不同形状的物体在同一投影面可以得到的相同的投影
            if(appliId === '834070253582417920'){
                customImage = 'https://www.keming365.com/images/1618977015181.png';
                customName = '不同形状的物体在同一投影面可以得到的相同的投影';
            }

            // 2.2.2 中职 机械制图 图3-5三投影面体系
            if(appliId === '834070376249032704'){
                customImage = 'https://www.keming365.com/images/1595208648549.png';
                customName = '三投影面体系';
            }

            // 2.2.3 画法几何图1-8+三视图的形成和投影规律
            if(appliId === '722476178471911424'){
                customImage = 'https://www.keming365.com/images/图1-8 三视图的形成和投影规律.png';
                customName = '三视图的形成和投影规律';
            }

            // 2.3.1 图2-10 点的投影
            if(appliId === '1293963881810493440'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-10 点的投影.png';
                customName = '图2-10 点的投影';
            }

            // 2.3.2 图2-11 特殊位置点的投影
            if(appliId === '1293963886390673408'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-11 特殊位置点的投影.png';
                customName = '图2-11 特殊位置点的投影';
            }

            // 2.3.3 图2-12 两点的相对位置
            if(appliId === '1293963887120482304'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-12 两点的相对位置.png';
                customName = '图2-12 两点的相对位置';
            }

            // 2.4.1 图2-15 直线的投影
            if(appliId === '1293963911564886016'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-15 直线的投影.png';
                customName = '图2-15 直线的投影';
            }

            // 2.4.2 图2-16 直线上点的投影
            if(appliId === '1293963964333424640'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-16 直线上点的投影.png';
                customName = '图2-16 直线上点的投影';
            }

            // 2.4.3 平行线的投影特性
            if(appliId === '722475055308603392'){
                customImage = 'https://www.keming365.com/images/表4-1.6 平行线的投影特点.png';
                customName = '平行线的投影特性';
            }

            // 2.4.4 垂直线的投影特性
            if(appliId === '722475251648167936'){
                customImage = 'https://www.keming365.com/images/表4-2.6 垂直线的投影特点.png';
                customName = '垂直线的投影特性';
            }

            // 2.4.5 图2-19 两平行直线
            if(appliId === '1293964000026951680'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-19 两直线平行.png';
                customName = '图2-19 两直线平行';
            }

            // 2.4.6 图2-20 两相交直线
            if(appliId === '1293963997757833216'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-20 两直线相交.png';
                customName = '图2-20 两直线相交';
            }

            // 2.4.7 图2-21 两直线异面
            if(appliId === '1293963988475838464'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-21 两直线异面.png';
                customName = '图2-21 两直线异面';
            }

            // 2.4.8 图2-24直角三角形法
            if(appliId === '1293963999762710528'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-24 直角三角形法.png';
                customName = '图2-24 直角三角形法';
            }

            // 2.5.1 画法几何2-图2-27 迹线表示平面
            if(appliId === '1293964005794119680'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-27 迹线表示平面.png';
                customName = '图2-27 迹线表示平面';
            }

            // 2.5.2 表5-2.6+投影面平行面的投影特性
            if(appliId === '722475664686448640'){
                customImage = 'https://www.keming365.com/images/表5-2.6 投影面平行面的投影特性.png';
                customName = '表5-2.6 投影面平行面的投影特性';
            }

            // 2.5.3 表5-1.6+投影面垂直面的投影特性
            if(appliId === '722475453977198592'){
                customImage = 'https://www.keming365.com/images/表5-1.6 投影面垂直面的投影特性.png';
                customName = '表5-1.6 投影面垂直面的投影特性';
            }

            // 2.6.1 图2-32 直线与平面平行举例
            if(appliId === '1293964101583634432'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-32 直线与平面平行举例.png';
                customName = '图2-32 直线与平面平行举例';
            }

            // 2.6.2 画法几何2-图2-34利用积聚性求交点
            if(appliId === '1293964180054867968'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-34 利用积聚性求交点.png';
                customName = '图2-34 利用积聚性求交点';
            }
            
            // 2.7.1 画法几何2-图2-52投影面垂直面变换为投影面平行面
            if(appliId === '1293964467184336896'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-52 投影面垂直面变换为投影面平行面.png';
                customName = '图2-52 投影面垂直面变换为投影面平行面';
            }
            
            // 2.7.2 画法几何2-图2-45 点的一次换面（换V面）
            if(appliId === '1293964287210946560'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-45 点的一次换面.png';
                customName = '图2-45 点的一次换面';
            }

            // 2.7.3 画法几何2-图2-46 点的二次换面
            if(appliId === '1293964324758355968'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-46 点的二次换面.png';
                customName = '图2-46 点的二次换面';
            }

            // 2.7.4 画法几何2-图2-49 将正平线变为投影面垂直线
            if(appliId === '1293964303778447360'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-49 将正平线变为投影面垂直线.png';
                customName = '图2-49 将正平线变为投影面垂直线';
            }

            // 2.7.5 画法几何2-图2-50 直线的二次换面
            if(appliId === '1293964346304495616'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-50 直线的二次换面.png';
                customName = '图2-50 直线的二次换面';
            }

            // 2.7.6 画法几何2-图2-51 求平面ABC的α角
            if(appliId === '1293964465703747584'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-51 求平面ABC的α角.png';
                customName = '图2-51 求平面ABC的α角';
            }

            // 2.7.7 画法几何2-图2-52 投影面垂直面变换为投影面平行面
            if(appliId === '1293964467184336896'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-52 投影面垂直面变换为投影面平行面.png';
                customName = '图2-52 投影面垂直面变换为投影面平行面';
            }

            // 2.7.8 画法几何2-图2-55 求平面△ABC的实形和β角
            if(appliId === '1293964495508471808'){
                customImage = 'https://www.keming365.com/images/hfjh2/图2-55 求平面三角形ABC的实形和β角.png';
                customName = '图2-55 求平面三角形ABC的实形和β角';
            }
            
            // 3.1.1 画法几何图9-1基本体
            if(appliId === '722481994545496064'){
                customImage = 'https://www.keming365.com/images/图9-1 基本体.png';
                customName = '图9-1基本体';
            }
            // 3.1.2 图2-画法几何2-图3-2 正六棱柱三视图的画图步骤
            if(appliId === '1293964575112167424'){
                customImage = 'https://www.keming365.com/images/hfjh2/图3-2 正六棱柱三视图的画图步骤.png';
                customName = '图3-2 正六棱柱三视图的画图步骤';
            }
            // 3.1.3 G画法几何图2-16三棱锥表面取点的作图方法与步骤
            if(appliId === '733994232435441664'){
                customImage = 'https://www.keming365.com/images/1595208306689.png';
                customName = '图2-16 三棱锥表面取点的作图方法与步骤';
            }
            // 3.2.1 画法几何2-图3-8 圆柱三视图的画图步骤
            if(appliId === '1293964693395734528'){
                customImage = 'https://www.keming365.com/images/hfjh2/图3-8 圆柱三视图的画图步骤.png';
                customName = '图3-8 圆柱三视图的画图步骤';
            }
            // 3.2.2 画法几何2-图3-11 圆锥三视图的画图步骤
            if(appliId === '1293964556950831104'){
                customImage = 'https://www.keming365.com/images/hfjh2/图3-11 圆锥三视图的画图步骤.png';
                customName = '图3-11 圆锥三视图的画图步骤';
            }
            // 3.2.3 画法几何2-图3-14 球面的形成及三视图
            if(appliId === '1293964624361684992'){
                customImage = 'https://www.keming365.com/images/hfjh2/图3-14 球面的形成及三视图.png';
                customName = '图3-14 球面的形成及三视图';
            }

            // 4.1.1 画法几何2-图4-2 平面立体切割体画法示例（一）
            if(appliId === '1293964863923552256'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-2 平面立体切割体画法示例（一）.png';
                customName = '图4-2 平面立体切割体画法示例（一）';
            }

            // 4.1.2 画法几何2-图4-3 平面立体切割体画法示例 （二）
            if(appliId === '1293964975965995008'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-3 平面立体切割体画法示例 （二）.png';
                customName = '图4-3 平面立体切割体画法示例（二）';
            }

            // 4.1.3 画法几何2-图4-5 平面立体切割体画法示例（四）
            if(appliId === '1293964985407373312'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-5 平面立体切割体画法示例（四）.png';
                customName = '图4-5 平面立体切割体画法示例（四）';
            }

            // 4.1.4 画法几何2-图 4-8 平面斜切圆柱
            if(appliId === '1293963669926838272'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-8 平面斜切圆柱.png';
                customName = '图4-8 平面斜切圆柱';
            }

            // 4.1.5 画法几何2-图4-10 开槽圆柱筒三视图画图步骤
            if(appliId === '1293964666099204096'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-10 开槽圆柱筒三视图画图步骤.png';
                customName = '图4-10 开槽圆柱筒三视图画图步骤';
            }

            // 4.1.6 画法几何2-图4-13 圆锥截交线的画法
            if(appliId === '1293964703134908416'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-13 圆锥截交线的画法.png';
                customName = '图4-13 圆锥截交线的画法';
            }

            // 4.1.7 画法几何2-图4-14 圆锥切割体
            if(appliId === '1293964776631697408'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-14 圆锥切割体.png';
                customName = '图4-14 圆锥切割体';
            }

            // 4.1.8 画法几何2-图4-16 开槽半球三视图的画法
            if(appliId === '1293964811175985152'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-16 开槽半球三视图的画法.png';
                customName = '图4-16 开槽半球三视图的画法';
            }

            // 4.1.9 画法几何2-图 4-18 顶针表面交线的画法
            if(appliId === '1293963668521746432'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-18 顶针表面交线的画法.png';
                customName = '图4-18 顶针表面交线的画法';
            }

            // 4.2.1 画法几何图9-39相贯线的形式
            if(appliId === '722485919931695104'){
                customImage = 'https://www.keming365.com/images/图9-39 相贯线的形式.png';
                customName = '图9-39 相贯线的形式';
            }

            // 4.2.2 画法几何2-图4-20相贯线的作图方法
            if(appliId === '1293964905027731456'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-20_相贯线的作图方法.png';
                customName = '图4-20 相贯线的作图方法';
            }

            // 4.2.3 画法几何2-图4-21 两圆柱相交的三种情况
            if(appliId === '1293964872609955840'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-21 两圆柱相交的三种情况.png';
                customName = '图4-21 两圆柱相交的三种情况';
            }

            // 4.2.4 画法几何2-图 4-23 相贯线为平面曲线
            if(appliId === '1293963619708436480'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-23 相贯线为平面曲线.png';
                customName = '图4-23 相贯线为平面曲线';
            }

            // 4.2.5 画法几何2-图4-22 圆柱面于圆锥面相贯线的作图方法
            if(appliId === '1293964871301332992'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-22 圆柱面于圆锥面相贯线的作图方法.png';
                customName = '图4-22 圆柱面于圆锥面相贯线的作图方法';
            }

            // 4.2.6 画法几何2-图4-26 圆锥台与半球相交相贯线的画图步骤
            if(appliId === '1293964919758127104'){
                customImage = 'https://www.keming365.com/images/hfjh2/图4-26 圆锥台与半球相交相贯线的画图步骤.png';
                customName = '图4-26 圆锥台与半球相交相贯线的画图步骤';
            }

            // 5.1.1 画法几何2-图5-2 叠加形式
            if(appliId === '1293965056689569792'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-2 叠加形式.png';
                customName = '图5-2 叠加形式';
            }

            // 5.1.2 画法几何2-图5-3 挖切形式
            if(appliId === '1293965173404467200'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-3 挖切形式.png';
                customName = '图5-3 挖切形式';
            }

            // 5.1.3 画法几何2-图5-4 形体间的表面连接关系
            if(appliId === '1293965148658073600'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-4 形体间的表面连接关系.png';
                customName = '图5-4 形体间的表面连接关系';
            }

            // 5.2.1 画法几何图5-10支架及其形体分析
            if(appliId === '722488549676417024'){
                customImage = 'https://www.keming365.com/images/图10-10 支架及其形体分析.png';
                customName = '图5-10 支架及其形体分析';
            }

            // 5.2.2 画法几何2-图5-2 叠加形式
            if(appliId === '1293965056689569792'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-2 叠加形式.png';
                customName = '图5-2 叠加形式';
            }

            // 5.2.3 画法几何2-图5-3 挖切形式
            if(appliId === '1293965173404467200'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-3 挖切形式.png';
                customName = '图5-3 挖切形式';
            }

            // 5.4.1 画法几何2-图5-22 线框及图线读图
            if(appliId === '1293965055636799488'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-22 线框及图线读图.png';
                customName = '图5-22 线框及图线读图';
            }

            // 5.4.2 画法几何图10-26夹铁的立体图
            if(appliId === '722489450201874432'){
                customImage = 'https://www.keming365.com/images/图10-26  夹铁的立体图.png';
                customName = '图10-26 夹铁的立体图';
            }

            // 5.4.3 画法几何2-图5-27 线面分析法读图
            if(appliId === '1293965125589401600'){
                customImage = 'https://www.keming365.com/images/hfjh2/图5-27 线面分析法读图.png';
                customName = '图5-27 线面分析法读图';
            }

            // 6.1.1 画法几何2-图6-2 轴测图的形成
            if(appliId === '1293965265230364672'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-2 轴测图的形成.png';
                customName = '图6-2 轴测图的形成';
            }

            // 6.2.1 画法几何2-图6-3 正等测图的轴间角和简化轴向变形系数
            if(appliId === '1293965309304111104'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-3 正等测图的轴间角和简化轴向变形系数.png';
                customName = '图6-3 正等测图的轴间角和简化轴向变形系数';
            }

            // 6.2.2 画法几何2-图6-6 坐标法
            if(appliId === '1293965310612733952'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-6 坐标法.png';
                customName = '图6-6 坐标法';
            }

            // 6.2.3 画法几何2-图6-5 切割法
            if(appliId === '1293965256241971200'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-5 切割法.png';
                customName = '图6-5 切割法';
            }

            // 6.2.4 画法几何2-图6-4 叠加法
            if(appliId === '1293965282926133248'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-4 叠加法.png';
                customName = '图6-4 叠加法';
            }

            // 6.2.5 画法几何2-图6-7+圆的正等测投影
            if(appliId === '1293965406536466432'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-7 圆的正等测投影.png';
                customName = '图6-7 圆的正等测投影';
            }

            // 6.2.6 画法几何2-图6-9+圆柱的正等测图
            if(appliId === '1293965438148935680'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-9 圆柱的正等测图.png';
                customName = '图6-9 圆柱的正等测图';
            }

            // 6.2.7 画法几何2-图6-11 组合体正等测图画法
            if(appliId === '1293965172649492480'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-11 组合体正等测图画法.png';
                customName = '图6-11 组合体正等测图画法';
            }

            // 6.3.1 画法几何2-图6-12 斜二测图的轴间角和轴向伸缩系数
            if(appliId === '1293965222523961344'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-12 斜二测图的轴间角和轴向伸缩系数.png';
                customName = '图6-12 斜二测图的轴间角和轴向伸缩系数';
            }

            // 6.3.2 画法几何2-图6-14 形体的斜二测图
            if(appliId === '1293965265943396352'){
                customImage = 'https://www.keming365.com/images/hfjh2/图6-14 形体的斜二测图.png';
                customName = '图6-14 形体的斜二测图';
            }

            // 7.1.1 画法几何2-图7-2 基本视图
            if(appliId === '1293965540083105792'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-2 基本视图.png';
                customName = '图7-2 基本视图';
            }

            // 7.1.2 画法几何2-图7-3 基本投影面展开
            if(appliId === '1293965628054437888'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-3 基本投影面展开.png';
                customName = '图7-3 基本投影面展开';
            }

            // 7.1.3 画法几何2-图7-7 机件的基本视图和局部视图
            if(appliId === '1293965668546248704'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-7 机件的基本视图和局部视图.png';
                customName = '图7-7 机件的基本视图和局部视图';
            }

            // 7.1.4 画法几何2-图7-9 局部视图和斜视图应用示例
            if(appliId === '1293965684916617216'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-9 局部视图和斜视图应用示例.png';
                customName = '图7-9 局部视图和斜视图应用示例';
            }

            // 7.2.1 画法几何2-图7-10 视图与剖视图
            if(appliId === '1293965440162201600'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-10 视图与剖视图.png';
                customName = '图7-10 视图与剖视图';
            }

            // 7.2.2 画法几何图12-12 全剖视图与半剖视图
            if(appliId === '722490909484122112'){
                customImage = 'https://www.keming365.com/images/图12-12 全剖视图与半剖视图.png';
                customName = '图12-12 全剖视图与半剖视图';
            }

            // 7.5.1 画法几何2-图7-56 托架的表达方案
            if(appliId === '1293965653228650496'){
                customImage = 'https://www.keming365.com/images/hfjh2/图7-56 托架的表达方案.png';
                customName = '图7-56 托架的表达方案';
            }

            // 7.5.2 画法几何图12-58+四通管的轴测剖视图
            if(appliId === '722492564678115328'){
                customImage = 'https://www.keming365.com/images/图12-58 四通管的轴测剖视图.png';
                customName = '图12-58 四通管的轴测剖视图';
            }

            // 8.1.1 画法几何图13-1+螺纹加工方法
            if(appliId === '722492714532208640'){
                customImage = 'https://www.keming365.com/images/图13-1 螺纹加工方法.png';
                customName = '图13-1 螺纹加工方法';
            }

            // 8.2.1 画法几何图6-24常用的螺纹紧固件
            if(appliId === '734008177456054272'){
                customImage = 'https://www.keming365.com/images/1595059264131.png';
                customName = '图6-24常用的螺纹紧固件';
            }

            // 8.2.2 画法几何图13-17+螺纹紧固件联接的基本形式
            if(appliId === '722493152950222848'){
                customImage = 'https://www.keming365.com/images/图13-17 螺纹紧固件联接的基本形式.png';
                customName = '图13-17 螺纹紧固件联接的基本形式';
            }

            // 8.2.3 画法几何图8-15 螺栓连接装配图
            if(appliId === '1293965717879652352'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-15 螺栓连接装配图.png';
                customName = '图8-15 螺栓连接装配图';
            }

            // 8.2.4 画法几何图6-28螺柱的连接画法和作图要点
            if(appliId === '734008531392397312'){
                customImage = 'https://www.keming365.com/images/1595059192294.png';
                customName = '图6-28 螺柱的连接画法和作图要点';
            }

            // 8.2.5 画法几何图8-16 螺柱连接装配图
            if(appliId === '1293965735889993728'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-16  螺柱连接装配图.png';
                customName = '图8-16 螺柱连接装配图';
            }

            // 8.2.6 G画法几何+图6-29内六角圆柱头螺钉的连接画法和作图要点
            if(appliId === '734008726645637120'){
                customImage = 'https://www.keming365.com/images/1595059152177.png';
                customName = '图6-29 内六角圆柱头螺钉的连接画法和作图要点';
            }

            // 8.2.6 画法几何图8-17 螺钉连接
            if(appliId === '1293965772338495488'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-17 螺钉连接.png';
                customName = '图8-17 螺钉连接';
            }

            // 8.3.1 画法几何图8-20 齿轮传动
            if(appliId === '1293965793687502848'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-20 齿轮传动.png';
                customName = '图8-20 齿轮传动';
            }

            // 8.3.2 G画法几何+图6-73齿轮的组成
            if(appliId === '734010378119282688'){
                customImage = 'https://www.keming365.com/images/1595058818588.png';
                customName = '图6-73 齿轮的组成';
            }

            // 8.3.3 画法几何图13-28+直齿圆柱齿轮啮合剖视图画法
            if(appliId === '722494695262912512'){
                customImage = 'https://www.keming365.com/images/图13-28 直齿圆柱齿轮啮合剖视图画法.png';
                customName = '图13-28 直齿圆柱齿轮啮合剖视图画法';
            }

            // 8.4.1 画法几何2-图8-30 键
            if(appliId === '1293965889078558720'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-30 键.png';
                customName = '图8-30 键';
            }


            // 8.4.2 画法几何2-表8-7 常用键的型式、标记和键连接示例
            if(appliId === '1293966197007581184'){
                customImage = 'https://www.keming365.com/images/hfjh2/表8-7 常用键的型式、标记和键连接示例.png';
                customName = '表8-7 常用键的型式、标记和键连接示例';
            }

            // 8.4.3 画法几何图13-38平键联接的画法
            if(appliId === '722495270595592192'){
                customImage = 'https://www.keming365.com/images/图13-38平键联接的画法.png';
                customName = '图13-38 平键联接的画法';
            }

            // 8.4.4 画法几何图13-39半圆键联接的画法
            if(appliId === '722495365265227776'){
                customImage = 'https://www.keming365.com/images/图13-39半圆键联接的画法.png';
                customName = '图13-39 半圆键联接的画法';
            }

            // 8.4.5 画法几何图13-40+钩头楔键联接的画法
            if(appliId === '722495534715109376'){
                customImage = 'https://www.keming365.com/images/图13-40 钩头楔键联接的画法.png';
                customName = '图13-40+钩头楔键联接的画法';
            }

            // 8.5.1 画法几何图13-42+销联接的画法
            if(appliId === '722495841859796992'){
                customImage = 'https://www.keming365.com/images/图13-42 销联接的画法.png';
                customName = '图13-42+销联接的画法';
            }

            // 8.5.2 画法几何2-图8-32 销连接的画法
            if(appliId === '1293965802738810880'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-32 销连接的画法.png';
                customName = '图8-32 销连接的画法';
            }
            
            // 8.6.1 画法几何2-图8-33 滚动轴承的结构
            if(appliId === '1293965900046663680'){
                customImage = 'https://www.keming365.com/images/hfjh2/图8-33 滚动轴承的结构.png';
                customName = '图8-33 滚动轴承的结构';
            }

            // 9.1.1 画法几何图14-1+齿轮油泵中的零件
            if(appliId === '722496323021963264'){
                customImage = 'https://www.keming365.com/images/图14-1 齿轮油泵中的零件.png';
                customName = '图14-1 齿轮油泵中的零件';
            }

            // 9.2.1 车削-基本操作
            if(appliId === '706131932974415872'){
                customImage = 'https://www.keming365.com/images/gx/7基本操作.png';
                customName = '车削-基本操作';
            }

            // 9.2.2 画法几何图14-37+踏脚实物图
            if(appliId === '722498425433620480'){
                customImage = 'https://www.keming365.com/images/图14-37 踏脚实物图.png';
                customName = '图14-37 踏脚实物图';
            }

            // 9.3.1 画法几何2-图9-8常见轴套类零件
            if(appliId === '1293966151897841664'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-8 常见轴套类零件.png';
                customName = '图9-8 常见轴套类零件';
            }

            // 9.3.2 画法几何2-图9-10柱塞阀零件图
            if(appliId === '1293965959857438720'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-10 柱塞阀零件图.png';
                customName = '图9-10 柱塞阀零件图';
            }

            // 9.3.3 画法几何2-图9-11常见轮盘类零件
            if(appliId === '1293965932045008896'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-11 常见轮盘类零件.png';
                customName = '图9-11 常见轮盘类零件';
            }

            // 9.3.4 画法几何2-图9-13端盖零件图
            if(appliId === '1293965982854807552'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-13 端盖零件图.png';
                customName = '图9-13 端盖零件图';
            }
            // 9.3.5 画法几何2-图9-14常见叉架类零件
            if(appliId === '1293965978878607360'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-14 常见叉架类零件.png';
                customName = '图9-14 常见叉架类零件';
            }

            // 9.3.6 画法几何2-图9-15托架零件图及直观图
            if(appliId === '1293966027570282496'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-15 托架零件图及直观图.png';
                customName = '图9-15 托架零件图及直观图';
            }

            // 9.3.7 画法几何2-图9-16常见箱体类零件
            if(appliId === '1293966054459965440'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-16 常见箱体类零件.png';
                customName = '图9-16 常见箱体类零件';
            }

            // 9.3.8 画法几何2-图9-18铣刀头座体零件图
            if(appliId === '1293966060466208768'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-18 铣刀头座体零件图.png';
                customName = '图9-18 铣刀头座体零件图';
            }

            // 9.4.1 画法几何2-图9-21过渡线
            if(appliId === '1293966099490013184'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-21 过渡线.png';
                customName = '图9-21 过渡线';
            }

            // 9.4.2 工训铸造图3-20+整模造型过程
            if(appliId === '720648106525327360'){
                customImage = 'https://www.keming365.com/images/gx/图3-20 整模造型过程.png';
                customName = '图3-20 整模造型过程';
            }

            // 9.4.3 倒角和倒圆
            if(appliId === '1293966086017908736'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-23 倒角和倒圆.png';
                customName = '图9-23 倒角和倒圆';
            }

            // 9.5.1 画法几何2-图9-30刹车支架的三维图
            if(appliId === '1293966137578487808'){
                customImage = 'https://www.keming365.com/images/hfjh2/图9-30 刹车支架的三维图.png';
                customName = '图9-30 刹车支架的三维图';
            }

            // 9.6.1 G画法几何+图7-20外径千分尺的使用
            if(appliId === '734042081181302784'){
                customImage = 'https://www.keming365.com/images/1595057827681.png';
                customName = '图7-20 外径千分尺的使用';
            }

            // 9.6.2 G画法几何+图7-96测量凹槽和线性尺寸
            if(appliId === '734045055605538816'){
                customImage = 'https://www.keming365.com/images/1595056962232.png';
                customName = '图7-96 测量凹槽和线性尺寸';
            }

            // 9.6.3 G画法几何+图7-97测量直径尺寸
            if(appliId === '734045195347165184'){
                customImage = 'https://www.keming365.com/images/1595056910657.png';
                customName = '图7-97 直径尺寸测量';
            }
            // 9.6.4 G画法几何+图7-100孔中心距测量方法
            if(appliId === '734045626571948032'){
                customImage = 'https://www.keming365.com/images/1595056780625.png';
                customName = '图7-100 孔中心距测量方法';
            }
            // 9.6.5 G画法几何+图7-98拓印法
            if(appliId === '734045338372931584'){
                customImage = 'https://www.keming365.com/images/1595056867278.png';
                customName = '图7-98 拓印法';
            }


            // 10.2.1 画法几何图15-18+配合种类
            if(appliId === '722498621861265408'){
                customImage = 'https://www.keming365.com/images/图15-18 配合种类.png';
                customName = '图15-18 配合种类';
            }

            // 10.2.2 画法几何2-图10-29配合的种类
            if(appliId === '1293963831604674560'){
                customImage = 'https://www.keming365.com/images/hfjh2/图10-29 配合的种类.png';
                customName = '图10-29 配合的种类';
            }
            
            // 10.3.1 G画法几何+图7-22圆柱度公差带定义、标注及解释
            if(appliId === '734042258092851200'){
                customImage = 'https://www.keming365.com/images/1595057767359.png';
                customName = '图7-22 圆柱度公差带定义、标注及解释';
            }

            // 10.3.2 互换性4-26线对基准体系的平行度公差(三)
            if(appliId === '722412981601697792'){
                customImage = 'https://www.keming365.com/images/4-26线对基准体系的平行度公差（三）.png';
                customName = '图4-26 线对基准体系的平行度公差（三）';
            }

            // 10.3.3 互换性4-18平面度公差
            if(appliId === '722408897184268288'){
                customImage = 'https://www.keming365.com/images/4-18平面度公差.png';
                customName = '图4-18 平面度公差';
            }

            // 10.3.4 互换性4-19圆度公差
            if(appliId === '722409842395840512'){
                customImage = 'https://www.keming365.com/images/4-19圆度公差.png';
                customName = '图4-19 圆度公差';
            }

            // 10.3.5 互换性4-17任意方向上的直线度公差
            if(appliId === '722408225911078912'){
                customImage = 'https://www.keming365.com/images/4-17任意方向上的直线度公差.png';
                customName = '图4-17 任意方向上的直线度公差';
            }

            // 10.3.6 互换性4-30面对基准面的平行度公差
            if(appliId === '722447376526082048'){
                customImage = 'https://www.keming365.com/images/4-30面对基准面的平行度公差.png';
                customName = '4-30面对基准面的平行度公差';
            }

            // 10.3.7 互换性4-34面对基准线的垂直度公差
            if(appliId === '722449009687396352'){
                customImage = 'https://www.keming365.com/images/4-34面对基准线的垂直度公差.png';
                customName = '4-34 对面基准线的垂直度公差';
            }

            // 10.3.8 互换性4-49径向圆跳动公差
            if(appliId === '722452855629283328'){
                customImage = 'https://www.keming365.com/images/4-49径向圆跳动公差.png';
                customName = '4-49 径向圆跳动公差';
            }
            
            // 11.1.1 画法几何2-图11-2%20球阀立体图
            if(appliId === '1293963798914269184'){
                customImage = 'https://www.keming365.com/images/hfjh2/图11-2 球阀立体图.png';
                customName = '图11-2 球阀立体图';
            }

            // 11.3.1 画法几何2-图11-10%20滑动轴承装配图
            if(appliId === '1293963799904124928'){
                customImage = 'https://www.keming365.com/images/hfjh2/图11-10 滑动轴承装配图.png';
                customName = '图11-10 滑动轴承装配图';
            }

            // 11.4.1 画法几何2-图11-24%20齿轮油泵装配图
            if(appliId === '1293963874772451328'){
                customImage = 'https://www.keming365.com/images/hfjh2/图11-24 齿轮油泵装配图.png';
                customName = '图11-24 齿轮油泵装配图';
            }
            
            // ========== 工程训练课程 ==========
            // 2.2.1 砂型的组成 (新appliId)
            if(appliId === '1458475953117200384'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-4砂型的组成.png';
                customName = '图2-4 砂型的组成';
            }

            // 2.2.2 轴承座铸件整模造型基本过程 (新appliId)
            if(appliId === '1458475955033997312'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-5轴承座铸件整模造型基本过程.png';
                customName = '图2-5 轴承座铸件整模造型基本过程';
            }
            
            // 2.2.3 分模造型基本过程 (新appliId)
            if(appliId === '1458475950038581248'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-6分模造型基本过程.png';
                customName = '图2-6 分模造型基本过程';
            }
            
            // 2.2.4 挖砂造型基本过程 (新appliId)
            if(appliId === '1458475968803897344'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-7挖砂造型基本过程.png';
                customName = '图2-7 挖砂造型基本过程';
            }
            
            // 2.2.5 支架铸件活块造型的基本过程 (新appliId)
            if(appliId === '1458475972192894976'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-9支架铸件活块造型的基本过程.png';
                customName = '图2-9 支架铸件活块造型的基本过程';
            }
            
            // 2.2.6 绳轮的三箱造型的基本过程 (新appliId)
            if(appliId === '1458475915620122624'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-10绳轮的三箱造型的基本过程.png';
                customName = '图2-10 绳轮的三箱造型的基本过程';
            }
            
            // 2.2.7 带轮刮板造型基本过程 (新appliId)
            if(appliId === '1458475988752007168'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-12带轮刮板造型基本过程.png';
                customName = '图2-12 带轮刮板造型基本过程';
            }
            // 2.2.8 震压式机械造型过程 (新appliId)
            if(appliId === '1458475981906903040'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-14震压式机械造型过程.png';
                customName = '图2-14 震压式机械造型过程';
            }

            // 2.3.1 图2-22 冲天炉的构造
            if(appliId === '1458475967432359936'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-22冲天炉的构造.png';
                customName = '图2-22 冲天炉的构造';
            }

            // 2.3.2 图2-23 中频感应电炉示意图
            if(appliId === '1458475948079841280'){
                customImage = 'https://www.keming365.com/images/gcxljc/图2-23中频感应电炉示意图.png';
                customName = '图2-23 中频感应电炉示意图';
            }

            // 3.1.1 图3-1 曲轴
            if(appliId === '1458475970355789824'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-1曲轴.png';
                customName = '图3-1 曲轴';
            }

            // 3.1.2 图3-2 反射炉结构示意图
            if(appliId === '1458476030032347136'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-2反射炉结构示意图.png';
                customName = '图3-2 反射炉结构示意图';
            }

            // 3.2.1 图3-3 空气锤结构示意图
            if(appliId === '1458476024147738624'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-3空气锤结构示意图.png';
                customName = '图3-3 空气锤结构示意图';
            }

            // 3.2.2 图3-4 镦粗
            if(appliId === '1458476046960558080'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-4镦粗.png';
                customName = '图3-4 镦粗';
            }

            // 3.2.3 图3-5 在平砧，上拔长坯料的翻转方法
            if(appliId === '1458476037473042432'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-5在平砧上拔长坯料的翻转方法.png';
                customName = '图3-5 在平砧上拔长坯料的翻转方法';
            }

            // 3.2.4 图3-7 冲孔    
            if(appliId === '1458476105466904576'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-7冲孔.png';
                customName = '图3-7 冲孔';
            }

            // 3.3.1 图3-8 锤上锻模
            if(appliId === '1458476118846734336'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-8锤上锻模.png';
                customName = '图3-8 锤上锻模';
            }

            // 3.3.2 图3-9 带连皮及飞边的模锻
            if(appliId === '1458476083484557312'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-9带连皮及飞边的模锻体.png';
                customName = '图3-9 带连皮及飞边的模锻体';
            }

            // 3.3.3 图3-11 扣模
            if(appliId === '1458475981244203008'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-11扣模.png';
                customName = '图3-11 扣模';
            }

            // 3.3.4 图3-12 开式套模示意图
            if(appliId === '1458476025691242496'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-12开式套模示意图.png';
                customName = '图3-12 开式套模示意图';
            }

            // 3.3.5 图3-13 闭式套模示意图
            if(appliId === '1458475986424168448'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-13闭式套模示意图.png';
                customName = '图3-13 闭式套模示意图';
            }

            // 3.3.6 图3-14 合模
            if(appliId === '1458476116263043072'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-14合模.png';
                customName = '图3-14 合模';
            }

            // 3.4.1 图3-16 开式双柱压力机
            if(appliId === '1458476087049715712'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-16开式双柱压力机.png';
                customName = '图3-16 开式双柱压力机';
            }

            // 3.4.2 图3-17 典型冲模结构
            if(appliId === '1458476019659833344'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-17典型冲模结构.png';
                customName = '图3-17 典型冲模结构';
            }

            // 4.1.1 图4-2 焊条电弧焊的焊接过程
            if(appliId === '1458476252674392064'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-2焊条电弧焊的焊接过程.png';
                customName = '图4-2 焊条电弧焊的焊接过程';
            }

            // 4.1.2 图4-3 交流弧焊机
            if(appliId === '1458476211566018560'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-3交流弧焊机.png';
                customName = '图4-3 交流弧焊机';
            }

            // 4.1.3 图4-4 整流式直流弧焊机
            if(appliId === '1458476275785007104'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-4整流式直流弧焊机.png';
                customName = '图4-4 整流式直流弧焊机';
            }

            // 4.1.4 图4-5 焊条 
            if(appliId === '1458476143765094400'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-5焊条.png';
                customName = '图4-5 焊条';
            }

            // 4.1.5 图4-6 焊接接头形式
            if(appliId === '1458476162186477568'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-6焊接接头形式.png';
                customName = '图4-6 焊接接头形式';
            }

            // 4.1.6 图4-7 对接接头坡口形状
            if(appliId === '1458476168721203200'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-7对接接头坡口形状.png';
                customName = '图4-7 对接接头坡口形状';
            }
            // 4.1.7 图4-8 对接焊缝的空间位置
            if(appliId === '1458476172244418560'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-8对接焊缝的空间位置.png';
                customName = '图4-8 对接焊缝的空间位置';
            }
            // 4.2.1 图4-11 气焊示意图
            if(appliId === '1458476102707052544'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-11气焊示意图.png';
                customName = '图4-11 气焊示意图';
            }
            // 4.2.2 图4-12 气焊设备及其连接
            if(appliId === '1458476093915791360'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-12气焊设备及其连接.png';
                customName = '图4-12 气焊设备及其连接';
            }
            // 4.2.3 图4-13 焊炬
            if(appliId === '1458476169606201344'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-13焊炬.png';
                customName = '图4-13 焊炬';
            }

            // 4.2.4 图4-16 割炬及气割过程
            if(appliId === '1458476162358444033'){
                customImage = 'https://www.keming365.com/images/gcxljc/图4-16割炬及气割过程.png';
                customName = '图4-16 割炬及气割过程';
            }

            // 4.3.1 图4-18 氩弧焊示意图
            if(appliId === '1458476151734272000'){
                customImage = 'https://www.keming365.com/images/gcxljc/图3-14合模.png';
                customName = '图3-14 合模';
            }

            // 5.1.1 图5-1 减速器
            if(appliId === '1458476229094014976'){
                customImage = 'https://www.keming365.com/images/gcxljc/图5-1减速器.png';
                customName = '图5-1 减速器';
            }

            // 5.2.1 图5-3 中温箱式电阻炉
            if(appliId === '1458476252091383808'){
                customImage = 'https://www.keming365.com/images/gcxljc/图5-3中温箱式电阻炉.png';
                customName = '图5-3 中温箱式电阻炉';
            }

            // 5.2.2 图5-4 中温井式电阻炉
            if(appliId === '1458476208390930432'){
                customImage = 'https://www.keming365.com/images/gcxljc/图5-4中温井式电阻炉.png';
                customName = '图5-4 中温井式电阻炉';
            }

            // 5.2.3 图5-5 电极盐浴炉
            if(appliId === '1458476414046044160'){
                customImage = 'https://www.keming365.com/images/gcxljc/图5-5电极盐浴炉.png';
                customName = '图5-5 电极盐浴炉';
            }

            // 6.1.1 图6-1 切削加工的工件
            if(appliId === '1458476227579871232'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-1切削加工的工件.png';
                customName = '图6-1 切削加工的工件';
            }

            // 6.1.2 图6-2 机械加工的主要方法
            if(appliId === '1458476287717801984'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-2机械加工的主要方法.png';
                customName = '图6-2 机械加工的主要方法';
            }

            // 6.3.1 图6-4 V带传动
            if(appliId === '1458476311902158848'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-4V带传动.png';
                customName = '图6-4 V带传动';
            }

            // 6.3.2 图6-5 齿轮传动
            if(appliId === '1458476342772236288'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-5齿轮传动.png';
                customName = '图6-5 齿轮传动';
            }

            // 6.3.3 图6-6 蜗杆传动
            if(appliId === '1458476498355748864'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-6蜗杆传动.png';
                customName = '图6-6 蜗杆传动';
            }

            // 6.3.4 图6-7 机床齿轮箱变速机构
            if(appliId === '1458476351949373440'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-7机床齿轮箱变速机构.png';
                customName = '图6-7 机床齿轮箱变速机构';
            }

            // 6.3.5 图6-8 齿轮齿条传动
            if(appliId === '1458476357989171200'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-8齿轮齿条传动.png';
                customName = '图6-8 齿轮齿条传动';
            }

            // 6.3.6 图6-9 丝杠螺母传动
            if(appliId === '1458476388368515072'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-9丝杠螺母传动.png';
                customName = '图6-9 丝杠螺母传动';
            }

            // 6.3.7 图6-10 机械传动系统
            if(appliId === '1458476406068477952'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-10机械传动系统.png';
                customName = '图6-10 机械传动系统';
            }

            // 6.4.1 图6-11 游标卡尺
            if(appliId === '1458476498896814080'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-11游标卡尺.png';
                customName = '图6-11 游标卡尺';
            }

            // 6.4.2 图6-15 外径千分尺
            if(appliId === '1458476561010262016'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-15外径千分尺.png';
                customName = '图6-15 外径千分尺';
            }

            // 6.4.3 图6-17 百分表
            if(appliId === '1458476281250185216'){
                customImage = 'https://www.keming365.com/images/gcxljc/图6-17百分表.png';
                customName = '图6-17 百分表';
            }

            // 7.1.1 图7-1 各种表面
            if(appliId === '1458476378222493696'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-1各种表面.png';
                customName = '图7-1 各种表面';
            }

            // 7.1.2 图7-2 C6140卧式车床示意图
            if(appliId === '1458476488239087616'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-2C6140卧式车床示意图.png';
                customName = '图7-2 C6140卧式车床示意图';
            }

            // 7.1.3 图7-9 立式车床示意图
            if(appliId === '1458476539325710336'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-9立式车床.png';
                customName = '图7-9 立式车床';
            }

            // 7.2.1 图7-11 常用车刀
            if(appliId === '1458476392487321600'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-11常用车刀.png';
                customName = '图7-11 常用车刀';
            }

            // 7.2.2 图7-12 车刀的结构形式
            if(appliId === '1458476405548384256'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-12车刀的结构形式.png';
                customName = '图7-12 车刀的结构形式';
            }

            // 7.2.3 图7-13 车刀的组成
            if(appliId === '1458476439576772608'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-13车刀的组成.png';
                customName = '图7-13 车刀的组成';
            }
            
            // 7.3.1 图7-14 自定心卡盘结构
            if(appliId === '1458476430227668992'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-14自定心卡盘结构.png';
                customName = '图7-14 自定心卡盘结构';
            }

            // 7.3.2 图7-15 单动卡盘及适合装夹的零件
            if(appliId === '1458476438201040896'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-15单动卡盘及适合装夹的零件.png';
                customName = '图7-15 单动卡盘及适合装夹的零件';
            }

            // 7.3.4 图7-18 顶尖
            if(appliId === '1458476429950844928'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-18顶尖.png';
                customName = '图7-18 顶尖';
            }

            // 7.3.4 图7-23 中心架与跟刀架
            if(appliId === '1458476445058727936'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-23中心架与跟刀架.png';
                customName = '图7-23 中心架与跟刀架';
            }

            // 7.3.4 图7-24 用心轴安装工件
            if(appliId === '1458476461676560384'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-24用心轴安装工件.png';
                customName = '图7-24 用心轴安装工件';
            }

            // 7.4.1 图7-28 车外圆的形式
            if(appliId === '1458476462809022464'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-28车外圆的形式.png';
                customName = '图7-28 车外圆的形式';
            }

            // 7.4.2 图7-30 端面车刀的选择
            if(appliId === '1458476489451241472'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-30端面车刀的选择.png';
                customName = '图7-30 端面车刀的选择';
            }

            // 7.4.3 图7-32 车刀的选择
            if(appliId === '1458476489002450944'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-32车刀的选择.png';
                customName = '图7-32 车刀的选择';
            }

            // 7.4.4 图7-33 切槽刀与切断刀
            if(appliId === '1458476488738209792'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-33切槽刀与切断刀.png';
                customName = '图7-33 切槽刀与切断刀';
            }

            // 7.4.5 图7-35 转动小刀架法车锥面
            if(appliId === '1458476518660374528'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-35转动小刀架法车锥面.png';
                customName = '图7-35 转动小刀架法车锥面';
            }

            // 7.4.6 图7-36 滚花
            if(appliId === '1458476507394473984'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-36滚花.png';
                customName = '图7-36 滚花';
            }

            // 7.4.7 图7-37 滚花刀花纹种类
            if(appliId === '1458476550671302656'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-37滚花刀花纹种类.png';
                customName = '图7-37 滚花刀花纹种类';
            }

            // 7.5.1 图7-38 用普通车刀车成形面
            if(appliId === '1458476532191199232'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-38用普通车刀车成形面.png';
                customName = '图7-38 用普通车刀车成形面';
            }

            // 7.5.2 图7-39 用靠模车成型面
            if(appliId === '1458476564839661568'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-39用靠模车成形面.png';
                customName = '图7-39 用靠模车成形面';
            }

            // 7.5.3 图7-40 用样板刀车成型面
            if(appliId === '1458476600289918976'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-40用样板刀车成形面.png';
                customName = '图7-40 用样板刀车成形面';
            }

            // 7.5.4 图7-44 螺纹量规
            if(appliId === '1458476526939930624'){
                customImage = 'https://www.keming365.com/images/gcxljc/图7-44螺纹量规.png';
                customName = '图7-44 螺纹量规';
            }

            // 8.1.1 图8-1 铣削加工范围
            if(appliId === '1458476546762211328'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-1铣削加工范围.png';
                customName = '图8-1 铣削加工范围';
            }

            // 8.1.2 图8-2 铣削运动与铣削用量
            if(appliId === '1458476613799772160'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-2铣削运动与铣削用量.png';
                customName = '图8-2 铣削运动与铣削用量';
            }

            // 8.1.3 图8-3 X6132卧式万能铣床
            if(appliId === '1458476777155330048'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-3X6132卧式万能铣床.png';
                customName = '图8-3 X6132卧式万能铣床';
            }

            // 8.1.4 图8-4 X5032立式铣床
            if(appliId === '1458476745547055104'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-4X5032立式铣床.png';
                customName = '图8-4 X5032立式铣床';
            }

            // 8.1.5 图8-5 龙门铣床
            if(appliId === '1458476798474977280'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-5龙门铣床.png';
                customName = '图8-5 龙门铣床';
            }

            // 8.1.6 图8-6 带柄铣刀
            if(appliId === '1458476804716101632'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-6带柄铣刀.png';
                customName = '图8-6 带柄铣刀';
            }

            // 8.1.7 图8-7 带孔铣刀
            if(appliId === '1458476807622754304'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-7带孔铣刀.png';
                customName = '图8-7 带孔铣刀';
            }

            // 8.1.8 图8-10 面铣刀的安装
            if(appliId === '1458476559617753088'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-10面铣刀的安装.png';
                customName = '图8-10 面铣刀的安装';
            }

            // 8.1.9 图8-11 机用虎钳
            if(appliId === '1458476565032599552'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-11机用虎钳.png';
                customName = '图8-11 机用虎钳';
            }

            // 8.1.10 图8-12 回转工作台
            if(appliId === '1458476564155990017'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-12回转工作台.png';
                customName = '图8-12 回转工作台';
            }

            // 8.1.11 图8-13 万能铣头    
            if(appliId === '1458476597454569472'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-13万能铣头.png';
                customName = '图8-13 万能铣头';
            }

            // 8.1.12 图8-14 万能分度头结构
            if(appliId === '1458476586171891712'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-14万能分度头结构.png';
                customName = '图8-14 万能分度头结构';
            }

            // 8.1.13 图8-16 顺铣和逆铣
            if(appliId === '1458476595760070656'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-16顺铣和逆铣.png';
                customName = '图8-16 顺铣和逆铣';
            }

            // 8.1.14 图8-18 对刀方法
            if(appliId === '1458476609659994112'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-18对刀方法.png';
                customName = '图8-18 对刀方法';
            }

            // 8.1.15 图8-19 铣T形槽
            if(appliId === '1458476597601370112'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-19铣T形槽.png';
                customName = '图8-19 铣T形槽';
            }

            // 8.1.16 图8-21 成形法加工齿轮
            if(appliId === '1458476615527825408'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-21成形法加工齿轮.png';
                customName = '图8-21 成形法加工齿轮';
            }

            // 8.1.17 图8-22 铣齿加工
            if(appliId === '1458476647769440256'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-22铣齿加工.png';
                customName = '图8-22 铣齿加工';
            }

            // 8.1.18 图8-23 滚齿加工原理
            if(appliId === '1458476682716381184'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-23滚齿加工原理.png';
                customName = '图8-23 滚齿加工原理';
            }

            // 8.1.19 图8-24 滚齿机
            if(appliId === '1458476719538176000'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-24滚齿机.png';
                customName = '图8-24 滚齿机';
            }

            // 8.1.20 图8-25 插齿加工原理
            if(appliId === '1458476657542168576'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-25插齿加工原理.png';
                customName = '图8-25 插齿加工原理';
            }

            // 8.2.1 图8-27 牛头刨床的切削用量
            if(appliId === '1458476657315676160'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-27牛头刨床的切削用量.png';
                customName = '图8-27 牛头刨床的切削用量';
            }

            // 8.2.2 图8-28 牛头刨床外形
            if(appliId === '1458476707454386176'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-28牛头刨床外形.png';
                customName = '图8-28 牛头刨床外形';
            }

            // 8.2.3 图8-29 刀架
            if(appliId === '1458476654425800704'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-29刀架.png';
                customName = '图8-29 刀架';
            }

            // 8.2.4 图8-31 牛头刨床的曲柄摇杆机构工作原理图
            if(appliId === '1458476872097595392'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-31牛头刨床的曲柄摇杆机构工作原理图.png';
                customName = '图8-31 牛头刨床的曲柄摇杆机构工作原理图';
            }

            // 8.2.5 图8-33 双柱龙门刨床
            if(appliId === '1458476699401322496'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-33双柱龙门刨床.png';
                customName = '图8-33 双柱龙门刨床';
            }

            // 8.2.6 图8-34 插床外形图
            if(appliId === '1458476815919087616'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-34插床外形图.png';
                customName = '图8-34 插床外形图';
            }

            // 8.3.1 图8-46 常见的几种磨削方法
            if(appliId === '1458476737644986368'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-46常见的几种磨削方法.png';
                customName = '图8-46 常见的几种磨削方法';
            }

            // 8.3.2 图8-47 磨削运动
            if(appliId === '1458476735367479296'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-47磨削运动.png';
                customName = '图8-47 磨削运动';
            }

            // 8.3.3 图8-48 M1432B万能外圆磨床
            if(appliId === '1458476836794138624'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-48M1432B万能外圆磨床.png';
                customName = '图8-48 M1432B万能外圆磨床';
            }

            // 8.3.4 图8-49 M2110C内圆磨床
            if(appliId === '1458476760516526080'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-49M2110C内圆磨床.png';
                customName = '图8-49 M2110C内圆磨床';
            }

            // 8.3.5 图8-50 M7120D平面磨床
            if(appliId === '1458476779684495360'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-50M7120D平面磨床.png';
                customName = '图8-50 M7120D平面磨床';
            }

            // 8.3.6 图8-51 万能外圆磨床液压传动原理示意图
            if(appliId === '1458476814912454656'){
                customImage = 'https://www.keming365.com/images/gcxljc/图8-51万能外圆磨床液压传动原理示意图.png';
                customName = '图8-51 万能外圆磨床液压传动原理示意图';
            }

            // 9.1.1 图9-4 划线盘及高度游标尺的应用
            if(appliId === '1458476864057114624'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-4划线盘及高度游标尺的应用.png';
                customName = '图9-4 划线盘及高度游标尺的应用';
            }

            // 9.1.2 图9-5 划线基准类型
            if(appliId === '1458476861913825280'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-5划线基准类型.png';
                customName = '图9-5 划线基准类型';
            }

            // 9.1.3 图9-6 轴承座的划线
            if(appliId === '1458476942020837376'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-6轴承座的划线.png';
                customName = '图9-6 轴承座的划线';
            }

            // 9.2.1 图9-8 锉刀各部分名称
            if(appliId === '1458476918209773568'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-8锉刀各部分名称.png';
                customName = '图9-8 锉刀各部分名称';
            }

            // 9.2.2 图9-12 锉削时的步法与姿势
            if(appliId === '1458477035688034304'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-12锉削时的步法与姿势.png';
                customName = '图9-12 锉削时的步法与姿势';
            }

            // 9.2.3 图9-13平面锉削方法
            if(appliId === '1458476836127244288'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-13平面锉削方法.png';
                customName = '图9-13 平面锉削方法';
            }

            // 9.2.4 图9-14 外圆弧面的锉削
            if(appliId === '1458476851205767168'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-14外圆弧面的锉削.png';
                customName = '图9-14 外圆弧面的锉削';
            }

            // 9.2.5 图9-15 内圆弧面的锉削
            if(appliId === '1458476824714543104'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-15内圆弧面的锉削.png';
                customName = '图9-15 内圆弧面的锉削';
            }

            // 9.3.1 图9-16 丝锥构造
            if(appliId === '1458476961557905408'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-16丝锥构造.png';
                customName = '图9-16 丝锥构造';
            }

            // 9.4.1 图9-18 台式钻床
            if(appliId === '1458476957808197632'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-18台式钻床.png';
                customName = '图9-18 台式钻床';
            }

            // 9.4.2 图9-19 立式钻床
            if(appliId === '1458477014611656704'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-19立式钻床.png';
                customName = '图9-19 立式钻床';
            }

            // 9.4.3 图9-20 摇臂钻床    
            if(appliId === '1458477047083958272'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-20摇臂钻床.png';
                customName = '图9-20 摇臂钻床';
            }

            // 9.4.4 图9-21 麻花钻的构造
            if(appliId === '1458477002087464960'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-21麻花钻的构造.png';
                customName = '图9-21 麻花钻的构造';
            }

            // 9.4.5 图9-22 扩孔钻及扩孔
            if(appliId === '1458476869077696512'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-22扩孔钻及扩孔.png';
                customName = '图9-22 扩孔钻及扩孔';
            }

            // 9.4.6 图9-23 铰刀的构造
            if(appliId === '1458476834264973312'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-23铰刀的构造.png';
                customName = '图9-23 铰刀的构造';
            }

            // 9.4.7 图9-24 卧式镗床
            if(appliId === '1458476847997124608'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-24卧式镗床.png';
                customName = '图9-24 卧式镗床';
            }

            // 10.2.1 图10-7 按钮
            if(appliId === '1458475886561984512'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-7按钮.png';
                customName = '图10-7 按钮';
            }

            // 10.2.2 图10-8 交流接触器的结构和外形
            if(appliId === '1458475888428449792'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-8交流接触器的结构和外形.png';
                customName = '图10-8 交流接触器的结构和外形';
            }

            // 10.3.1 图10-12 500-B型万用表
            if(appliId === '1458476972123357184'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-12500-B型万用表外形.png';
                customName = '图10-12 500-B型万用表外形';
            }
            // 10.3.2 图10-13 电流表的接法
            if(appliId === '1458475868761358336'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-13电流表的接法.png';
                customName = '图10-13 电流表的接法';
            }

            // 10.3.3 图10-14 电压表的接法
            if(appliId === '1458475876428546048'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-14电压表的接法.png';
                customName = '图10-14 电压表的接法';
            }

            // 10.3.4 图10-15 UJ31型直流电位差计面板图
            if(appliId === '1458475900201861120'){
                customImage = 'https://www.keming365.com/images/gcxljc/图10-15UJ31型直流电位差计面板图.png';
                customName = '图10-15 UJ31型直流电位差计面板图';
            }

            // 11.2.1 刀架的结构
            if(appliId === '1458475881432350720'){
                customImage = 'https://www.keming365.com/images/gcxljc/图11-3刀架的结构.png';
                customName = '图11-3 刀架的结构';
            }

            // 11.2.2 图11-4 CK6136数控车床
            if(appliId === '1458476899041804288'){
                customImage = 'https://www.keming365.com/images/gcxljc/图11-4CK6136数控车床.png';
                customName = '图11-4 CK6136数控车床';
            }

            // 11.3.1 图11-9 XK713型立式铣床
            if(appliId === '1458475886088028160'){
                customImage = 'https://www.keming365.com/images/gcxljc/图11-9XK713型立式铣床.png';
                customName = '图11-9 XK713型立式铣床';
            }

            // 11.4.1 图11-12 XH714立式加工中心及扩孔
            if(appliId === '1458476980314832896'){
                customImage = 'https://www.keming365.com/images/gcxljc/图9-22扩孔钻及扩孔.png';
                customName = '图9-22 扩孔钻及扩孔';
            }

            // 12.1.1 图12-1 拨叉
            if(appliId === '1458475889128898560'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-1拨叉.png';
                customName = '图12-1 拨叉';
            }

            // 12.1.2 图12-2 电火花加工工作原理
            if(appliId === '1514226100429914112'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-2电火花加工工作原理.png';
                customName = '图12-2 电火花加工工作原理';
            }

            // 12.1.5 图12-5  电解加工工作原理
            if(appliId === '1458475911304183808'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-5电解加工.png';
                customName = '图12-5 电解加工工作原理';
            }

            // 12.1.6 图12-6 电解加工应用实例
            if(appliId === '1458475906690449408'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-6电解加工应用实例.png';
                customName = '图12-6 电解加工应用实例';
            }

            // 12.1.7 图12-7 超声波加工原理
            if(appliId === '1458475909613879296'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-7超声波加工原理.png';
                customName = '图12-7 超声波加工原理';
            }

            // 12.1.8 图12-9 激光加工原理示意图
            if(appliId === '1458475911073497088'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-9激光加工原理示意图.k.png';
                customName = '图12-9 激光加工原理示意图';
            }

            // 12.2.1 图12-11 工业机器人作业系统
            if(appliId === '1496907482985922560'){
                customImage = 'https://www.keming365.com/images/gcxljc/图12-11工业机器人作业系统.f.png';
                customName = '图12-11 工业机器人作业系统';
            }
            
            // ========== 液压与气压 ==========
            // 1.2.1 图1-1 简单机床的液压传动系统
            if(appliId === '722083329788084224'){
                customImage = 'https://www.keming365.com/images/gx/1.1简单机床的液压传动系统.png';
                customName = '图1-1 简单机床的液压传动系统';
            }

            // 1.3.1 图1-2简单机床的液压传动系统原理图
            if(appliId === '722083572797669376'){
                customImage = 'https://www.keming365.com/images/1.2简单机床的液压传统.png';
                customName = '图1-2简单机床的液压传动系统原理图';
            }

            // 2.1.1 图2-2液体的黏性
            if(appliId === '722083683342745600'){
                customImage = 'https://www.keming365.com/images/gx/2.2液体的黏性.png';
                customName = '图2-2液体的黏性';
            }

            // 2.3.1 图2-11 雷诺实验装置
            if(appliId === '722083811399041024'){
                customImage = 'https://www.keming365.com/images/gx/2.11雷诺实验.png';
                customName = '图2-11 雷诺实验装置';
            }

            // 2.5.1 图2-18 薄壁小孔的液流
            if(appliId === '722083921042341888'){
                customImage = 'https://www.keming365.com/images/gx/2.18薄壁小孔.png';
                customName = '图2-18 薄壁小孔的液流';
            }

            // 3.1.1 图3-1 容积式泵的工作原理
            if(appliId === '722084027971928064'){
                customImage = 'https://www.keming365.com/images/gx/3.1 容积式泵的工作原理.png';
                customName = '图3-1 容积式泵的工作原理';
            }

            // 3.2.1 图3-3 外啮合齿轮泵
            if(appliId === '722084126605180929'){
                customImage = 'https://www.keming365.com/images/gx/3.3外啮合齿轮泵.png';
                customName = '图3-3 外啮合齿轮泵';
            }

            // 3.2.2 图3-6 外啮合齿轮泵的工作原理
            if(appliId === '722084261015846912'){
                customImage = 'https://www.keming365.com/images/gx/3.6外啮合齿轮泵工作原理.png';
                customName = '图3-6 外啮合齿轮泵的工作原理';
            }

            // 3.2.3 图3-8 齿轮泵的困油现象
            if(appliId === '722084611982622720'){
                customImage = 'https://www.keming365.com/images/4.齿轮泵困油现象.png';
                customName = '图3-8 齿轮泵的困油现象';
            }

            // 3.2.4 图3-10 齿轮泵的间隙泄露
            if(appliId === '722084796712353792'){
                customImage = 'https://www.keming365.com/images/gx/3.10间隙泄露.png';
                customName = '图3-10 齿轮泵的间隙泄露';
            }

            // 3.2.5 图3-12 内啮合渐开线齿轮泵的工作原理
            if(appliId === '722085051642150912'){
                customImage = 'https://www.keming365.com/images/3.内啮合齿轮泵.png';
                customName = '图3-12 内啮合渐开线齿轮泵的工作原理';
            }

            // 3.2.6 图3-13 内啮合摆线齿轮泵的工作原理
            if(appliId === '722085176326225920'){
                customImage = 'https://www.keming365.com/images/gx/3.13内啮合摆线齿轮泵.png';
                customName = '图3-13 内啮合摆线齿轮泵的工作原理';
            }

            // 3.3.1 图3-15 单作用叶片泵的工作原理
            if(appliId === '722085285801754624'){
                customImage = 'https://www.keming365.com/images/gx/3.15单作用叶片泵的工作原理.png';
                customName = '图3-15 单作用叶片泵的工作原理';
            }
            
            // 3.3.2 图3-16 单作用叶片泵的转子和配流盘结构
            if(appliId === '722085575967899648'){
                customImage = 'https://www.keming365.com/images/gx/3.16转子与配流盘.png';
                customName = '图3-16 转子和配流盘结构';
            }
            
            // 3.3.3 图3-18 双作用叶片泵的结构简图
            if(appliId === '722085804632965120'){
                customImage = 'https://www.keming365.com/images/gx/3.18双作用叶片泵的结构简图.png';
                customName = '图3-18 双作用叶片泵的结构简图';
            }
            
            // 3.3.4 图3-19 双作用叶片泵的工作原理
            if(appliId === '722085987672391680'){
                customImage = 'https://www.keming365.com/images/3.19双作用叶片泵的工作原理.png';
                customName = '图3-19 双作用叶片泵的工作原理';
            }
            
            // 3.3.5 图3-23 子母叶片和阶梯叶片
            if(appliId === '722086186947969024'){
                customImage = 'https://www.keming365.com/images/gx/3.23子母叶片和阶梯叶片.png';
                customName = '图3-23 子母叶片和阶梯叶片';
            }
            
            // 3.3.6 图3-24 外反馈限压式变量叶片泵的工作原理
            if(appliId === '799659512758796288'){
                customImage = 'https://www.keming365.com/images/gx/3.24外反馈限压变量叶片泵.png';
                customName = '图3-24 外反馈限压式变量叶片泵';
            }
            
            // 3.3.7 图3-26 外反馈限压式变量叶片泵的结构
            if(appliId === '722086842421215232'){
                customImage = 'https://www.keming365.com/images/gx/3.26外反馈限压式变量叶片泵.png';
                customName = '图3-26 外反馈限压式变量叶片泵的结构';
            }

            // 3.4.1 图3-27 径向柱塞泵的工作原理
            if(appliId === '722087024374317056'){
                customImage = 'https://www.keming365.com/images/gx/3.27径向柱塞泵工作原理.png';
                customName = '图3-27 径向柱塞泵的工作原理';
            }

            // 3.4.2 图3-28 斜盘式轴向柱塞泵的工作原理
            if(appliId === '722087198496653312'){
                customImage = 'https://www.keming365.com/images/gx/3.28斜盘式轴向柱塞泵工作原理.png';
                customName = '图3-28 斜盘式轴向柱塞泵的工作原理';
            }

            // 3.4.3 图3-31 SCY14-1型手动变量轴向柱塞泵的结构简图
            if(appliId === '722087427514040320'){
                customImage = 'https://www.keming365.com/images/yy-lwzy/4.SCY14-1型轴向柱塞泵.png';
                customName = '图3-31 SCY14-1型手动变量轴向柱塞泵的结构简图';
            }

            // 3.4.4 图3-32 滑靴静压支承原理
            if(appliId === '722087623400620032'){
                customImage = 'https://www.keming365.com/images/gx/3.32滑靴静压支承原理.png';
                customName = '图3-32 滑靴静压支承原理';
            }

            // 3.4.5 图3-33 图3-33 压力补偿变量机构
            if(appliId === '722088281688244224'){
                customImage = 'https://www.keming365.com/images/gx/3.33压力补偿变量机构.png';
                customName = '图3-33 压力补偿变量机构';
            }

            // 4.1.1 图4-1 液压缸的工作原理
            if(appliId === '722088376710201344'){
                customImage = 'https://www.keming365.com/images/gx/4.1液压缸工作原理.png';
                customName = '图4-1 液压缸的工作原理';
            }

            // 4.2.1 图4-4 差动连接器工作原理
            if(appliId === '722088915321749504'){
                customImage = 'https://www.keming365.com/images/gx/4.4差动连接.png';
                customName = '图4-4 差动连接器工作原理';
            }

            // 4.2.2 图4-5 往复式柱塞缸
            if(appliId === '722094041956614144'){
                customImage = 'https://www.keming365.com/images/gx/4.5往复式柱塞缸.png';
                customName = '图4-5 往复式柱塞缸';    
            }

            // 4.2.3 图4-6 摆动缸
            if(appliId === '722094151910293504'){
                customImage = 'https://www.keming365.com/images/gx/4.6摆动缸.png';
                customName = '图4-6 摆动缸';
            }

            // 4.2.4 图4-7 串联液压缸
            if(appliId === '722094250090561536'){
                customImage = 'https://www.keming365.com/images/gx/4.7串联液压缸 5.png';
                customName = '图4-7 串联液压缸';
            }

            // 4.2.5 图4-8 不连续动作型增压缸
            if(appliId === '722094471335903232'){
                customImage = 'https://www.keming365.com/images/gx/4.8不连续动作型增压缸.png';
                customName = '图4-8 不连续动作型增压缸';
            }

            // 4.2.6 图4-9 增速缸的工作原理
            if(appliId === '722094794196647936'){
                customImage = 'https://www.keming365.com/images/gx/4.9增速缸的工作原理.png';
                customName = '图4-9 增速缸的工作原理';
            }

            // 4.2.7 图4-10 多位液压缸的工作原理
            if(appliId === '722094932382187520'){
                customImage = 'https://www.keming365.com/images/gx/4.10多位液压缸的工作原理.png';
                customName = '图4-10 多位液压缸的工作原理';
            }

            // 4.2.8 图4-11 双作用式伸缩缸
            if(appliId === '722095040330989568'){
                customImage = 'https://www.keming365.com/images/gx/4.11双作用式伸缩缸.png';
                customName = '图4-11 双作用式伸缩缸';
            }

            // 4.2.9 图4-12 齿轮齿条缸
            if(appliId === '722095224481906688'){
                customImage = 'https://www.keming365.com/images/gx/4.12齿轮齿条缸.png';
                customName = '图4-12 齿轮齿条缸';
            }

            // 4.3.1 图4-13 双作用单杆活塞液压缸的结构
            if(appliId === '722095310913929216'){
                customImage = 'https://www.keming365.com/images/gx/4.13双作用单杆活塞液压缸结构.png';
                customName = '图4-13 双作用单杆活塞液压缸的结构';
            }

            // 5.2.1 图5-1 普通直通式单向阀
            if(appliId === '722095406900576256'){
                customImage = 'https://www.keming365.com/images/gx/5.1普通直通式单向阀.png';
                customName = '图5-1 普通直通式单向阀';
            }

            // 5.2.2 图5-4 普通液控单向阀
            if(appliId === '722095588690100224'){
                customImage = 'https://www.keming365.com/images/gx/5.4普通液控单向阀.png';
                customName = '图5-4 普通液控单向阀';
            }

            // 5.2.3 图5-7 双向液压锁
            if(appliId === '722095673859637248'){
                customImage = 'https://www.keming365.com/images/gx/5.7双向液压锁.png';
                customName = '图5-7 双向液压锁';
            }

            // 5.2.4 图5-8 滑阀式换向阀的工作原理图
            if(appliId === '722095758341308416'){
                customImage = 'https://www.keming365.com/images/gx/5.8滑阀式换向阀.png';    
                customName = '图5-8 滑阀式换向阀的工作原理图';
            }

            // 5.2.5 图5-10 转阀式换向阀的工作原理图
            if(appliId === '722095850314006528'){
                customImage = 'https://www.keming365.com/images/gx/5.10转阀式换向阀.png';
                customName = '图5-10 转阀式换向阀的工作原理图';
            }

            // 5.2.6 图5-13 二位三通机动换向阀
            if(appliId === '722096024125964288'){
                customImage = 'https://www.keming365.com/images/gx/5.13二位三通换向阀.png';
                customName = '图5-13 二位三通机动换向阀';
            }

            // 5.2.7 图5-16 二位二通电磁换向阀
            if(appliId === '722096235766349824'){
                customImage = 'https://www.keming365.com/images/gx/5.16二位二通电磁换向阀.png';
                customName = '图5-16 二位二通电磁换向阀';
            }

            // 5.2.8 图5-17 三位四通电磁换向阀
            if(appliId === '722096456986525696'){
                customImage = 'https://www.keming365.com/images/gx/5.17三位四通电磁换向阀.png';
                customName = '图5-17 三位四通电磁换向阀';
            }

            // 5.2.9 图5-18 三位四通液动换向阀
            if(appliId === '722096664478744576'){
                customImage = 'https://www.keming365.com/images/gx/5.18三位四通液动换向阀.png';
                customName = '图5-18 三位四通液动换向阀';
            }

            // 5.2.10 图5-19 三位四通电液换向阀
            if(appliId === '722097575938752512'){
                customImage = 'https://www.keming365.com/images/gx/5.19三位四通电液换向阀.png';
                customName = '图5-19 三位四通电液换向阀';
            }

            // 5.2.11 图5-20 三位四通手动换向阀
            if(appliId === '722097989669093376'){
                customImage = 'https://www.keming365.com/images/gx/5.20三位四通手动换向阀.png';
                customName = '图5-20 三位四通手动换向阀';
            }

            // 5.3.1 图5-25a 直动式低压溢流阀的结构
            if(appliId === '722098082346434560'){
                customImage = 'https://www.keming365.com/images/gx/5.25a直动式溢流阀结构.png';
                customName = '图5-25a 直动式低压溢流阀的结构';
            }

            // 5.3.2 图5-25c 直动式低压溢流阀的工作原理图
            if(appliId === '722098170565230592'){
                customImage = 'https://www.keming365.com/images/gx/5.25c直动式溢流阀.png';
                customName = '图5-25c 直动式低压溢流阀的工作原理图';
            }

            // 5.3.3 图5-27c 三节同心先导式溢流阀的工作原理图
            if(appliId === '722098749618257920'){
                customImage = 'https://www.keming365.com/images/gx/5.27c先导式溢流阀工作原理.png';
                customName = '图5-27c 三节同心先导式溢流阀的工作原理图';
            }

            // 5.3.4 图5-36a 传统型先导式减压阀的结构图
            if(appliId === '722099031769088000'){
                customImage = 'https://www.keming365.com/images/gx/5.36a先导式减压发结构图.png';
                customName = '图5-36a 传统型先导式减压阀的结构图';
            }

            // 5.3.5 图5-36c 传统型先导式减压阀的工作原理图
            if(appliId === '722099136765100032'){
                customImage = 'https://www.keming365.com/images/gx/5.36c 传统型先导式减压阀工作原理.png';
                customName = '图5-36c 传统型先导式减压阀的工作原理图';
            }

            // 5.3.6 图5-42 高压直动式顺序阀
            if(appliId === '722099229492772864'){
                customImage = 'https://www.keming365.com/images/gx/5.42直动式顺序阀.png';
                customName = '图5-42 高压直动式顺序阀';
            }

            // 5.3.7 图5-43a 阀芯的位置状态
            if(appliId === '722099323361296384'){
                customImage = 'https://www.keming365.com/images/gx/5.43a直动式顺序阀工作原理.png';
                customName = '图5-43a 阀芯的位置状态';
            }

            // 5.3.8 图5-44 高压先导式顺序阀
            if(appliId === '722099416474845184'){
                customImage = 'https://www.keming365.com/images/gx/5.44高压先导顺序阀.png';
                customName = '图5-44 高压先导式顺序阀';
            }

            // 5.3.9 图5-46a 薄膜式压力继电器的结构
            if(appliId === '722099546657652736'){
                customImage = 'https://www.keming365.com/images/gx/5.46a薄膜式压力继电器结构.png';
                customName = '图5-46a 薄膜式压力继电器的结构';
            }

            // 5.3.10 图5-46c 薄膜式压力继电器的工作原理
            if(appliId === '722099993778847744'){
                customImage = 'https://www.keming365.com/images/gx/5.46c薄膜式压力继电器.png';
                customName = '图5-46c 薄膜式压力继电器的工作原理';
            }

            // 5.4.1 图5-50a 普通节流阀的结构
            if(appliId === '722100247148363776'){
                customImage = 'https://www.keming365.com/images/gx/5.50c普通节流阀结构.png';
                customName = '图5-50a 普通节流阀的结构';
            }

            // 5.4.2 图5-50c 普通节流阀的工作原理
            if(appliId === '722100365876527104'){
                customImage = 'https://www.keming365.com/images/gx/5.50普通节流阀.png';
                customName = '图5-50c 普通节流阀的工作原理';
            }

            // 5.4.3 图5-51a 单向节流阀的结构
            if(appliId === '722100477528899584'){
                customImage = 'https://www.keming365.com/images/gx/5.51c单向节流阀结构.png';
                customName = '图5-51a 单向节流阀的结构';
            }

            // 5.4.4 图5-51c 单向节流阀的工作原理
            if(appliId === '722100699743125504'){
                customImage = 'https://www.keming365.com/images/gx/5.51单向节流阀.png';
                customName = '图5-51c 单向节流阀的工作原理';
            }

            // 5.4.5 图5-52 调速阀
            if(appliId === '722101050852507648'){
                customImage = 'https://www.keming365.com/images/gx/5.52调速阀.png';
                customName = '图5-52 调速阀';
            }

            // 5.6.1 图5-62 插装阀结构原理图
            if(appliId === '722101207413293056'){
                customImage = 'https://www.keming365.com/images/gx/5.62插装阀结构原理图.png';
                customName = '图5-62 插装阀结构原理图';
            }

            // 6.2.1 图6-7 弹簧式蓄能器
            if(appliId === '722101319208271872'){
                customImage = 'https://www.keming365.com/images/gx/6.7弹簧式蓄能器.png';
                customName = '图6-7 弹簧式蓄能器';
            }

            // 6.5.1 图6-14 常用管接头
            if(appliId === '722101431024222208'){
                customImage = 'https://www.keming365.com/images/gx/6.14常用管接头.png';
                customName = '图6-14 常用管接头';
            }

            // 7.1.1 图7-1 单级压力回路
            if(appliId === '722102052242587648'){
                customImage = 'https://www.keming365.com/images/gx/7.1 单级调压回路.png';
                customName = '图7-1 单级压力回路';
            }

            // 7.1.2 图7-2 远程调压回路
            if(appliId === '722103209182625792'){
                customImage = 'https://www.keming365.com/images/gx/7.2 远程调压回路.png';
                customName = '图7-2 远程调压回路';
            }

            // 7.1.3 图7-3 二级调压回路
            if(appliId === '722103381371387904'){
                customImage = 'https://www.keming365.com/images/gx/7.3 二级调压回路.png';
                customName = '图7-3 二级调压回路';
            }

            // 7.1.4 图7-4 减压回路
            if(appliId === '722103477408366592'){
                customImage = 'https://www.keming365.com/images/gx/7.4减压回路.png';
                customName = '图7-4 减压回路';
            }

            // 7.1.5 图7-5 利用换向阀的卸荷回路
            if(appliId === '722103560883404800'){
                customImage = 'https://www.keming365.com/images/gx/7.5 利用换向阀的卸荷回路.png';   
                customName = '图7-5 利用换向阀的卸荷回路';
            }

            // 7.1.6 图7-7 利用二位二通电磁阀的卸荷回路
            if(appliId === '722103656287043584'){
                customImage = 'https://www.keming365.com/images/gx/7.7采用二位二通阀的卸荷回路.png';
                customName = '图7-7 利用二位二通电磁阀的卸荷回路';
            }

            // 7.1.7 图7-8 利用先导式溢流阀和二位二通电磁阀的卸荷回路
            if(appliId === '722103871190597632'){
                customImage = 'https://www.keming365.com/images/gx/7.8利用先导式溢流阀和二位二通阀的卸荷回路.png';
                customName = '图7-8 利用先导式溢流阀和二位二通电磁阀的卸荷回路';
            }

            // 7.1.8 图7-9 利用先导式溢流阀和蓄能器的保压卸荷回路
            if(appliId === '722104078783479808'){
                customImage = 'https://www.keming365.com/images/gx/7.9 采用先导式溢流阀和蓄能器的保压卸荷回路.png';
                customName = '图7-9 利用先导式溢流阀和蓄能器的保压卸荷回路';
            }

            // 7.1.9 图7-10 用增压缸的增压回路
            if(appliId === '722104170311581696'){
                customImage = 'https://www.keming365.com/images/gx/7.10用增压缸的增压回路.png';
                customName = '图7-10 用增压缸的增压回路';
            }

            // 7.1.10 图7-12 采用单向顺序阀组成的平衡回路
            if(appliId === '722104260069687296'){
                customImage = 'https://www.keming365.com/images/gx/7.12 采用单向顺序发组成的平衡回路.png';
                customName = '图7-12 采用单向顺序阀组成的平衡回路';
            }

            // 7.1.11 图7-13 采用液控单向顺序阀的平衡回路
            if(appliId === '722104393591160832'){
                customImage = 'https://www.keming365.com/images/gx/7.13 采用液控单向顺序阀的平衡回路.png';
                customName = '图7-13 采用液控单向顺序阀的平衡回路';
            }

            // 7.2.1 图7-14 节流阀进油路节流调速回路
            if(appliId === '722104480513916928'){
                customImage = 'https://www.keming365.com/images/gx/7.14 节流阀进油路节流调速回路.png';
                customName = '图7-14 节流阀进油路节流调速回路';
            }

            // 7.2.2 图7-16 节流阀回油路节流调速回路
            if(appliId === '722104588211060736'){
                customImage = 'https://www.keming365.com/images/gx/7.16 节流阀回油路节流调速回路.png';
                customName = '图7-16 节流阀回油路节流调速回路';
            }

            // 7.2.3 图7-17 节流阀旁油路节流调速回路
            if(appliId === '722104681718874112'){
                customImage = 'https://www.keming365.com/images/gx/7.17 节流阀旁油路节流调速回路.png';
                customName = '图7-17 节流阀旁油路节流调速回路';
            }

            // 7.2.4 图7-19 调速阀进油路调速回路
            if(appliId === '722104777143484416'){
                customImage = 'https://www.keming365.com/images/gx/7.19调速阀进油路调速回路.png';
                customName = '图7-19 调速阀进油路调速回路';
            }

            // 7.2.5 图7-21 变量泵和液压缸组成的开式容积调速回路
            if(appliId === '722104864208846848'){
                customImage = 'https://www.keming365.com/images/gx/7.21变量泵-液压缸式开式容积调速回路.png';
                customName = '图7-21 变量泵和液压缸组成的开式容积调速回路';
            }

            // 7.2.6 图7-28 差动连接的快速运动回路
            if(appliId === '722105026440331264'){
                customImage = 'https://www.keming365.com/images/gx/7.28 差动连接的快速运动回路.png';
                customName = '图7-28 差动连接的快速运动回路';
            }

            // 7.2.7 图7-29 双泵供油的快速运动回路
            if(appliId === '722105117771300864'){
                customImage = 'https://www.keming365.com/images/gx/7.29 双泵供油的快速运动回路.png';
                customName = '图7-29 双泵供油的快速运动回路';
            }

            // 7.2.8 图7-30 使用蓄能器的快速运动回路
            if(appliId === '722105204790525952'){
                customImage = 'https://www.keming365.com/images/gx/7.30 使用蓄能器的快速运动回路.png';
                customName = '图7-30 使用蓄能器的快速运动回路';
            }

            // 7.2.9 图7-32 用行程阀与节流阀并联的速度换接回路
            if(appliId === '722105366506110976'){
                customImage = 'https://www.keming365.com/images/gx/7.32 采用行程阀的速度换接回路.png';
                customName = '图7-32 用行程阀与节流阀并联的速度换接回路';
            }

            // 7.2.10 图7-33 用两个调速阀的速度换接回路 
            if(appliId === '722105546714382336'){
                customImage = 'https://www.keming365.com/images/gx/7.33  采用两个调速阀的速度换接回路.png';
                customName = '图7-33 用两个调速阀的速度换接回路';
            }

            // 7.4.1 图7-37 采用两个单向顺序阀的压力控制顺序动作回路
            if(appliId === '722105674338664448'){
                customImage = 'https://www.keming365.com/images/gx/7.37采用单向顺序阀的顺序动作回路.png';
                customName = '图7-37 采用两个单向顺序阀的压力控制顺序动作回路';
            }

            // 7.4.2 图7-38 利用行程开关控制的顺序动作回路
            if(appliId === '722105776243474432'){
                customImage = 'https://www.keming365.com/images/gx/7.38 采用电磁换向阀的顺序动作回路.png';
                customName = '图7-38 用行程开关控制的顺序动作回路';
            }

            // 7.4.3 图7-39 带补偿装置的串联液压缸回路
            if(appliId === '722105933110444032'){
                customImage = 'https://www.keming365.com/images/gx/7.39 带补偿装置的串联液压缸回路.png';
                customName = '图7-39 带补偿装置的串联液压缸回路';
            }

            // 7.4.4 图7-40 调速阀控制的同步回路
            if(appliId === '722106164942209024'){
                customImage = 'https://www.keming365.com/images/gx/7.40 调速阀控制的回路.png';
                customName = '图7-40 调速阀控制的同步回路';
            }

            // 8.2.1 图8-1 YT4543型动力滑台液压系统图
            if(appliId === '722106262208118784'){
                customImage = 'https://www.keming365.com/images/gx/8.1 YT4543型动力滑台液压系统图.png';
                customName = '图8-1 YT4543型动力滑台液压系统图';
            }

            // 8.7.1 图8-10 盘式热分散机的液压原理图
            if(appliId === '722106486834069504'){
                customImage = 'https://www.keming365.com/images/gx/8.10盘式热分散机的液压原理图.png';
                customName = '图8-10 盘式热分散机的液压原理图';
            }

            // 10.1.1 图10-1 车床液压仿形刀架的工作原理
            if(appliId === '722106598234783744'){
                customImage = 'https://www.keming365.com/images/gx/10.1车床液压仿形刀架的工作原理.png';
                customName = '图10-1 车床液压仿形刀架的工作原理';
            }
            // 10.2.1 图10-4 单边滑阀的工作原理
            if(appliId === '722106863532900352'){
                customImage = 'https://www.keming365.com/images/gx/10.4单边滑阀的工作原理图.png';
                customName = '图10-4 单边滑阀的工作原理';
            }

            // 10.2.2 图10-5 双边滑阀的工作原理
            if(appliId === '722107060572913664'){
                customImage = 'https://www.keming365.com/images/gx/10.5 双边滑阀的工作原理.png';
                customName = '图10-5 双边滑阀的工作原理';
            }

            // 10.2.3 图10-6 四边滑阀的工作原理
            if(appliId === '722107316677115904'){
                customImage = 'https://www.keming365.com/images/gx/10.6 四边滑阀的工作原理.png';
                customName = '图10-6 四边滑阀的工作原理';
            }

            // 10.2.4 图10-8 射流管阀的工作原理 
            if(appliId === '722107540774584320'){
                customImage = 'https://www.keming365.com/images/gx/10.8射流管阀的工作原理.png';
                customName = '图10-8 射流管阀的工作原理';
            }

            // 10.2.5 图10-9 喷嘴挡板阀的工作原理
            if(appliId === '722107684052008960'){
                customImage = 'https://www.keming365.com/images/gx/10.9喷嘴挡板阀的工作原理.png';
                customName = '图10-9 喷嘴挡板阀的工作原理';
            }

            // 10.3.1 图10-10 电液伺服阀的结构原理
            if(appliId === '722107769003442176'){
                customImage = 'https://www.keming365.com/images/gx/10.10电液伺服阀的结构原理.png';
                customName = '图10-10 电液伺服阀的结构原理';
            }

            // 10.4.1 图10-11 机械手手臂伸缩电液伺服系统原理图
            if(appliId === '722107923664207872'){
                customImage = 'https://www.keming365.com/images/gx/10.11机械手手臂伸缩电液伺服系统原理图.png';
                customName = '图10-11 机械手手臂伸缩电液伺服系统原理图';
            }

            // 10.4.2 图10-14 机液位置控制伺服系统
            if(appliId === '722108112235921408'){
                customImage = 'https://www.keming365.com/images/gx/10.14机液位置控制伺服系统.png';
                customName = '图10-14 机液位置控制伺服系统';
            }

            // 13.3.1 图13-3  Q16型汽车起重机液压系统伸缩臂原理图 
            if(appliId === '722108551127891968'){
                customImage = 'https://www.keming365.com/images/gx/13.3 Q16型汽车起重机液压系统伸缩臂原理图.png';
                customName = '图13-3 Q16型汽车起重机液压系统伸缩臂原理图';
            }

            // 13.4.1 图13-7  150kN电镦机液压原理图 
            if(appliId === '722108702420631552'){
                customImage = 'https://www.keming365.com/images/gx/13.8 150KN点吨级液压原理图.png';
                customName = '图13-8 150KN点吨级液压原理图';
            }

            // ==============================================
            // 👆👆👆 所有自定义图片和名称都在这里配置 👆👆👆
            // ==============================================
            
            // 确定最终使用的图片和名称
            var imageUrl = customImage || 'https://www.keming365.com/assets/img/vr_default.jpg';
            var experimentName = customName || (sectionTitle + ' - VR资源' + index);
            
            // 纯字符串拼接生成卡片HTML
            var cardHtml = '<div class="vr-card" style="width:220px;height:180px;border:1px solid #e8e8e8;border-radius:8px;overflow:hidden;cursor:pointer;transition:all 0.2s ease;background:#fff;">' +
                '<div style="height:130px;display:flex;align-items:center;justify-content:center;background:#f8f9fa;">' +
                '<img src="' + imageUrl + '" style="max-width:100%;max-height:100%;object-fit:cover;" alt="' + experimentName + '">' +
                '</div>' +
                '<div style="height:50px;display:flex;align-items:center;justify-content:center;padding:0 10px;font-size:14px;color:#333;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' +
                experimentName +
                '</div>' +
                '</div>';
            
            var card = $(cardHtml);
            
            // 绑定点击事件：跳转到enterItem详情页
            (function(appliIdVal, experimentNameVal) {
                card.on('click', function() {
                    // 自动判断课程ID
                    var curriculumId = '5'; // 默认画法几何
                    if(appliIdVal.startsWith('batch_')){
                        curriculumId = '6'; // 工程训练
                    } else if(appliIdVal.length === 18 || appliIdVal.length === 19){
                        curriculumId = '7'; // 液压与气压传动
                    }
                    
                    goToEnterItem(
                        appliIdVal,                // VR应用ID
                        experimentNameVal,         // 实验名称
                        '科明数码',                // 课程提供商
                        '0',                       // 资源类型(0=实验)
                        '1',                       // 状态(1=可访问)
                        curriculumId,              // 课程ID(自动判断)
                        appliIdVal                 // 实验ID
                    );
                });
            })(appliId, experimentName);
            
            // hover效果（和原始VR资源库完全一致）
            card.on('mouseenter', function() {
                $(this).css({
                    'transform': 'scale(1.02)',
                    'box-shadow': '0 4px 12px rgba(0,0,0,0.1)',
                    'border-color': '#1677ff'
                });
            });
            
            card.on('mouseleave', function() {
                $(this).css({
                    'transform': 'scale(1)',
                    'box-shadow': 'none',
                    'border-color': '#e8e8e8'
                });
            });
            
            cardContainer.append(card);
        }
        
        // 插入到容器
        $(containerSelector).append(cardContainer);
        
        // 如果资源数量超过一页，显示分页
        if(totalPages > 1) {
            renderVrPagination(totalPages, currentPage, containerSelector, vrUrlString, sectionTitle);
        }
        
        return true;
    }
    
    // VR资源分页函数
    function renderVrPagination(totalPages, currentPage, containerSelector, vrUrlString, sectionTitle) {
        var paginationHtml = '<div class="vr-pagination" style="display:flex;justify-content:center;align-items:center;padding:20px 0;gap:10px;border-top:1px solid #eee;margin-top:auto;">';
        
        // 上一页
        paginationHtml += '<button ' + (currentPage <= 1 ? 'disabled' : '') + ' style="padding:6px 12px;background:#0066cc;color:white;border:none;border-radius:3px;cursor:pointer;">上一页</button>';
        
        // 页码按钮
        for(var i=1; i<=totalPages; i++) {
            var bgColor = (i === currentPage) ? '#004499' : '#0066cc';
            paginationHtml += '<button style="padding:6px 12px;background:' + bgColor + ';color:white;border:none;border-radius:3px;cursor:pointer;">' + i + '</button>';
        }
        
        // 下一页
        paginationHtml += '<button ' + (currentPage >= totalPages ? 'disabled' : '') + ' style="padding:6px 12px;background:#0066cc;color:white;border:none;border-radius:3px;cursor:pointer;">下一页</button>';
        
        paginationHtml += '</div>';
        
        var pagination = $(paginationHtml);
        $(containerSelector).append(pagination);
        
        // 绑定分页点击事件
        pagination.find('button').unbind('click').bind('click', function() {
            var btnText = $(this).text().trim();
            
            if(btnText === '上一页') {
                if(currentPage > 1) {
                    vrPageInfo[containerSelector].currentPage = currentPage - 1;
                    renderVrCards(vrUrlString, containerSelector, sectionTitle);
                }
            } else if(btnText === '下一页') {
                if(currentPage < totalPages) {
                    vrPageInfo[containerSelector].currentPage = currentPage + 1;
                    renderVrCards(vrUrlString, containerSelector, sectionTitle);
                }
            } else if(!isNaN(btnText)) {
                var page = parseInt(btnText);
                if(page !== currentPage) {
                    vrPageInfo[containerSelector].currentPage = page;
                    renderVrCards(vrUrlString, containerSelector, sectionTitle);
                }
            }
        });
    }
    var treeEl = document.getElementById('courseTree');
    var html = '';

    // 判断章节是否有内容
    function hasContent(section) {
        return section.pptUrl && section.pptUrl !== '' || 
               section.videoUrl && section.videoUrl !== '' || 
               section.vrUrl && section.vrUrl !== '';
    }

    // 循环生成四层树形菜单
    for(var i=0; i<courseData.length; i++){
        var chapter = courseData[i];
        var chapterOpen = chapter.defaultOpen ? 'layui-nav-itemed' : '';
        var chapterHasContent = false;
        for(var j=0; j<chapter.children.length; j++){
            if(hasContent(chapter.children[j])){
                chapterHasContent = true;
                break;
            }
        }
        var chapterBold = chapterHasContent ? 'style="font-weight:600;"' : '';
        html += '<li class="layui-nav-item ' + chapterOpen + '">';
        html += '<a href="javascript:;" '+chapterBold+'>'+chapter.title+'</a>';
        html += '<dl class="layui-nav-child">';

        for(var j=0; j<chapter.children.length; j++){
            var section = chapter.children[j];
            var secOpen = section.defaultOpen ? 'layui-nav-itemed' : '';
            var sectionJson = JSON.stringify(section).replace(/'/g, "\\'");
            var sectionBold = hasContent(section) ? 'style="font-weight:600;"' : '';
            html += '<li class="layui-nav-item '+secOpen+'" data-section=\''+sectionJson+'\'>';
            html += '<a '+sectionBold+'>'+section.title+'</a>';
            html += '<dl class="layui-nav-child">';

            for(var k=0; k<itemModules.length; k++){
                var mod = itemModules[k];
                var moduleBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                html += '<li class="layui-nav-item">';
                html += '<a '+moduleBold+'>'+mod.name+'</a>';
                html += '<dl class="layui-nav-child">';

                for(var m=0; m<mod.children.length; m++){
                    var fun = mod.children[m];
                    var active = (section.defaultActive === fun.type) ? 'class="layui-this"' : '';
                    var itemData = JSON.stringify(fun).replace(/'/g, "\\'");
                    var itemBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                    html += '<dd '+active+'><a data-type="'+fun.type+'" data-item=\''+itemData+'\''+itemBold+'>'+fun.name+'</a></dd>';
                }
                html += '</dl></li>';
            }
            html += '</dl></li>';
        }
        html += '</dl></li>';
    }

    treeEl.innerHTML = html;
    element.render('nav');

    // 画法几何点击事件
    $(document).off('click','#courseTree a[data-type]').on('click','#courseTree a[data-type]',function(){
        var type = $(this).attr('data-type');
        var resName = $(this).text().trim();
        var sectionJson = $(this).parents('[data-section]').attr('data-section');
        
        // 空值保护
        if(!sectionJson){
            $('#resIframe').hide();
            $('#buildTip').show();
            return;
        }

        var sectionData = JSON.parse(sectionJson);
        var url = '';
        
        // 统一重置状态
        $('#courseIntro').hide();
        $('#resourceShow').show();
        $('.res-title').text(resName);
        $('#buildTip').hide();
        $('#resIframe').hide();
        $('.vr-card-container').remove();
        $('#resourceShow .quiz-js-container').remove();

        // VR资源特殊处理
        if(type === 'vr'){
            var hasCards = renderVrCards(sectionData.vrUrl, '#resourceShow', sectionData.title);
            if(!hasCards) {
                $('#buildTip').show();
            }
            return;
        }

        // 其他资源处理
        if(type === 'test'){
            // 使用JavaScript测试系统
            $('#buildTip').hide();
            $('#resIframe').hide();
            $('#resourceShow').show();
            $('.res-title').text('在线测验');
            
            // 从章节标题提取章节编号（如 "3.2 曲面立体" -> "3_2"）
            var chapterFilter = '';
            if(sectionData.title && sectionData.title.match(/^(\d+)\.(\d+)/)){
                chapterFilter = RegExp.$1 + '_' + RegExp.$2;
            }
            
            // 动态加载quiz.js并渲染
            if (typeof QuizSystem === 'undefined') {
                $.getScript('/js/quiz.js?' + new Date().getTime(), function() {
                    QuizSystem.renderQuiz('huafa', 'resourceShow', chapterFilter);
                });
            } else {
                QuizSystem.renderQuiz('huafa', 'resourceShow', chapterFilter);
            }
            return;
        }  else if(type === 'ppt'){
            $('#resourceShow .quiz-js-container').remove();
            $('#resourceShow #resIframe').show();
            $('#resourceShow .res-title').show();
            PptPreviewer.preview(sectionData.pptUrl);
            return;
        } else if(type === 'correct'){
            $('#resourceShow .quiz-js-container').remove();
            $('#resourceShow #resIframe').show();
            $('#resourceShow .res-title').show();
            url = location.protocol + '//' + location.host + '/sdxx/correct-huafa.html';
        } else if(type === 'knowledge'){
            $('#resourceShow .quiz-js-container').remove();
            $('#resourceShow #resIframe').show();
            $('#resourceShow .res-title').show();
            url = '/sdxx/knowledge-graph.html?lessonId=2';
        } else if(type === 'ai-edu'){
            $('#resourceShow .quiz-js-container').remove();
            $('#resourceShow #resIframe').show();
            $('#resourceShow .res-title').show();
            url = '/sdxx/ai-chat.html?lessonId=2';
        } else {
            $('#resourceShow .quiz-js-container').remove();
            $('#resourceShow #resIframe').show();
            $('#resourceShow .res-title').show();
            url = sectionData[type + 'Url'];
        }

        if(url !== null && url !== undefined && url.trim() !== ""){
            $('#resIframe').show();
            $('#resIframe').removeAttr('srcdoc');
            $('#resIframe').attr('src', url);
            $('#buildTip').hide();
        }else{
            $('#resIframe').hide();
            $('#resIframe').removeAttr('srcdoc');
            $('#resIframe').attr('src','');
            $('#buildTip').show();
        }
    });

    // 点击章、节标题，返回课程简介
    $(document).on('click','#courseTree .layui-nav-item > a',function(){
        if($(this).attr('data-type')) return;
        $('#resourceShow .quiz-js-container').remove();
        $('#resourceShow').hide();
        $('#courseIntro').show();
        $('#resIframe').attr('src','');
        $('.vr-card-container').remove();
    });

    // ====================== 液压与气压传动 ======================
    var treeElHydraulic = document.getElementById('courseTreeHydraulic');
    var htmlHydraulic = '';

    for(var i=0; i<hydraulicCourseData.length; i++){
        var chapter = hydraulicCourseData[i];
        var chapterOpen = chapter.defaultOpen ? 'layui-nav-itemed' : '';
        var chapterHasContent = false;
        for(var j=0; j<chapter.children.length; j++){
            if(hasContent(chapter.children[j])){
                chapterHasContent = true;
                break;
            }
        }
        var chapterBold = chapterHasContent ? 'style="font-weight:600;"' : '';
        htmlHydraulic += '<li class="layui-nav-item ' + chapterOpen + '">';
        htmlHydraulic += '<a href="javascript:;" '+chapterBold+'>'+chapter.title+'</a>';
        htmlHydraulic += '<dl class="layui-nav-child">';

        for(var j=0; j<chapter.children.length; j++){
            var section = chapter.children[j];
            var secOpen = section.defaultOpen ? 'layui-nav-itemed' : '';
            var sectionJsonHydraulic = JSON.stringify(section).replace(/'/g, "\\'");
            var sectionBold = hasContent(section) ? 'style="font-weight:600;"' : '';
            htmlHydraulic += '<li class="layui-nav-item '+secOpen+'" data-section-hydraulic=\''+sectionJsonHydraulic+'\'>';
            htmlHydraulic += '<a '+sectionBold+'>'+section.title+'</a>';
            htmlHydraulic += '<dl class="layui-nav-child">';

            for(var k=0; k<itemModules.length; k++){
                var mod = itemModules[k];
                var moduleBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                htmlHydraulic += '<li class="layui-nav-item">';
                htmlHydraulic += '<a '+moduleBold+'>'+mod.name+'</a>';
                htmlHydraulic += '<dl class="layui-nav-child">';

                for(var m=0; m<mod.children.length; m++){
                    var fun = mod.children[m];
                    var active = (section.defaultActive === fun.type) ? 'class="layui-this"' : '';
                    var itemDataHydraulic = JSON.stringify(fun).replace(/'/g, "\\'");
                    var itemBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                    htmlHydraulic += '<dd '+active+'><a data-type="'+fun.type+'" data-item-hydraulic=\''+itemDataHydraulic+'\''+itemBold+'>'+fun.name+'</a></dd>';
                }
                htmlHydraulic += '</dl></li>';
            }
            htmlHydraulic += '</dl></li>';
        }
        htmlHydraulic += '</dl></li>';
    }

    treeElHydraulic.innerHTML = htmlHydraulic;
    element.render('nav');

    // 初始状态：默认显示课程简介，隐藏资源和建设中
    $('#courseIntroHydraulic').show();
    $('#resourceShowHydraulic').hide();
    $('#buildTipHydraulic').hide();

    // 液压点击事件
    $(document).off('click','#courseTreeHydraulic a[data-type]').on('click','#courseTreeHydraulic a[data-type]',function(){
        var type = $(this).attr('data-type');
        var resName = $(this).text().trim();
        var sectionJson = $(this).parents('[data-section-hydraulic]').attr('data-section-hydraulic');
        
        // 空值保护
        if(!sectionJson){
            showBuildTipHydraulic();
            return;
        }

        var sectionData = JSON.parse(sectionJson);
        var url = '';
        
        // 统一重置状态
        $('#courseIntroHydraulic').hide();
        $('#resourceShowHydraulic').show();
        $('#resourceShowHydraulic .res-title').text(resName);
        $('#buildTipHydraulic').hide();
        $('#resIframeHydraulic').hide();
        $('.vr-card-container').remove();

        // VR资源特殊处理
        if(type === 'vr'){
            var hasCards = renderVrCards(sectionData.vrUrl, '#resourceShowHydraulic', sectionData.title);
            if(!hasCards) {
                showBuildTipHydraulic();
            }
            return;
        }

        // 其他资源处理
        if(type === 'test'){
            // 使用JavaScript测试系统
            $('#buildTipHydraulic').hide();
            $('#resIframeHydraulic').hide();
            $('#resourceShowHydraulic').show();
            $('#resourceShowHydraulic .res-title').text('在线测验');
            
            // 从章节标题提取章节编号（如 "3.2 曲面立体" -> "3_2"）
            var chapterFilter = '';
            if(sectionData.title && sectionData.title.match(/^(\d+)\.(\d+)/)){
                chapterFilter = RegExp.$1 + '_' + RegExp.$2;
            }
            
            // 动态加载quiz.js并渲染
            if (typeof QuizSystem === 'undefined') {
                $.getScript('/js/quiz.js?' + new Date().getTime(), function() {
                    QuizSystem.renderQuiz('hydraulic', 'resourceShowHydraulic', chapterFilter);
                });
            } else {
                QuizSystem.renderQuiz('hydraulic', 'resourceShowHydraulic', chapterFilter);
            }
            return;
        } else if(type === 'ppt'){
            $('#resourceShowHydraulic .quiz-js-container').remove();
            $('#resourceShowHydraulic #resIframeHydraulic').show();
            $('#resourceShowHydraulic .res-title').show();
            $('#buildTipHydraulic').hide();
            $('#resIframeHydraulic').show();
            $('#resIframeHydraulic').attr('src', 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(sectionData.pptUrl));
            return;
        } else if(type === 'correct'){
            $('#resourceShowHydraulic .quiz-js-container').remove();
            $('#resourceShowHydraulic #resIframeHydraulic').show();
            $('#resourceShowHydraulic .res-title').show();
            url = location.protocol + '//' + location.host + '/sdxx/correct-hydraulic.html';
        } else if(type === 'knowledge'){
            $('#resourceShowHydraulic .quiz-js-container').remove();
            $('#resourceShowHydraulic #resIframeHydraulic').show();
            $('#resourceShowHydraulic .res-title').show();
            url = '/sdxx/knowledge-graph.html?lessonId=1';
        } else if(type === 'ai-edu'){
            $('#resourceShowHydraulic .quiz-js-container').remove();
            $('#resourceShowHydraulic #resIframeHydraulic').show();
            $('#resourceShowHydraulic .res-title').show();
            url = '/sdxx/ai-chat.html?lessonId=1';
        } else {
            $('#resourceShowHydraulic .quiz-js-container').remove();
            $('#resourceShowHydraulic #resIframeHydraulic').show();
            $('#resourceShowHydraulic .res-title').show();
            url = sectionData[type + 'Url'];
        }

        loadResourceHydraulic(url, resName);
    });

    function loadResourceHydraulic(url, resName){
        if(url !== null && url !== undefined && url.trim() !== ""){
            $('#resIframeHydraulic').show();
            $('#resIframeHydraulic').removeAttr('srcdoc');
            $('#resIframeHydraulic').attr('src', url);
            $('#buildTipHydraulic').hide();
        }else{
            showBuildTipHydraulic();
        }
    }

    function showBuildTipHydraulic(){
        $('#resIframeHydraulic').hide();
        $('#resIframeHydraulic').attr('src','');
        $('#buildTipHydraulic').show();
    }

    $(document).on('click','#courseTreeHydraulic .layui-nav-item > a',function(){
        if($(this).attr('data-type')) return;
        $('#resourceShowHydraulic .quiz-js-container').remove();
        $('#resourceShowHydraulic').hide();
        $('#courseIntroHydraulic').show();
        $('#resIframeHydraulic').attr('src','');
        $('.vr-card-container').remove();
    });

    // ====================== 工程训练 ======================
    var treeElEngineering = document.getElementById('courseTreeEngineering');
    var htmlEngineering = '';

    for(var i=0; i<engineeringCourseData.length; i++){
        var chapter = engineeringCourseData[i];
        var chapterOpen = chapter.defaultOpen ? 'layui-nav-itemed' : '';
        var chapterHasContent = false;
        for(var j=0; j<chapter.children.length; j++){
            if(hasContent(chapter.children[j])){
                chapterHasContent = true;
                break;
            }
        }
        var chapterBold = chapterHasContent ? 'style="font-weight:600;"' : '';
        htmlEngineering += '<li class="layui-nav-item ' + chapterOpen + '">';
        htmlEngineering += '<a href="javascript:;" '+chapterBold+'>'+chapter.title+'</a>';
        htmlEngineering += '<dl class="layui-nav-child">';

        for(var j=0; j<chapter.children.length; j++){
            var section = chapter.children[j];
            var secOpen = section.defaultOpen ? 'layui-nav-itemed' : '';
            var sectionJsonEngineering = JSON.stringify(section).replace(/'/g, "\\'");
            var sectionBold = hasContent(section) ? 'style="font-weight:600;"' : '';
            htmlEngineering += '<li class="layui-nav-item '+secOpen+'" data-section-engineering=\''+sectionJsonEngineering+'\'>';
            htmlEngineering += '<a '+sectionBold+'>'+section.title+'</a>';
            htmlEngineering += '<dl class="layui-nav-child">';

            for(var k=0; k<itemModules.length; k++){
                var mod = itemModules[k];
                var moduleBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                htmlEngineering += '<li class="layui-nav-item">';
                htmlEngineering += '<a '+moduleBold+'>'+mod.name+'</a>';
                htmlEngineering += '<dl class="layui-nav-child">';

                for(var m=0; m<mod.children.length; m++){
                    var fun = mod.children[m];
                    var active = (section.defaultActive === fun.type) ? 'class="layui-this"' : '';
                    var itemDataEngineering = JSON.stringify(fun).replace(/'/g, "\\'");
                    var itemBold = hasContent(section) ? 'style="font-weight:600;"' : '';
                    htmlEngineering += '<dd '+active+'><a data-type="'+fun.type+'" data-item-engineering=\''+itemDataEngineering+'\''+itemBold+'>'+fun.name+'</a></dd>';
                }
                htmlEngineering += '</dl></li>';
            }
            htmlEngineering += '</dl></li>';
        }
        htmlEngineering += '</dl></li>';
    }

    treeElEngineering.innerHTML = htmlEngineering;
    element.render('nav');

    // 初始状态：默认显示课程简介，隐藏资源和建设中
    $('#courseIntroEngineering').show();
    $('#resourceShowEngineering').hide();
    $('#buildTipEngineering').hide();

    // 工程训练点击事件
    $(document).off('click','#courseTreeEngineering a[data-type]').on('click','#courseTreeEngineering a[data-type]',function(){
        var type = $(this).attr('data-type');
        var resName = $(this).text().trim();
        var sectionJson = $(this).parents('[data-section-engineering]').attr('data-section-engineering');
        
        // 空值保护
        if(!sectionJson) {
            showBuildTipEngineering();
            return;
        }

        var sectionData = JSON.parse(sectionJson);
        var url = '';
        
        // 统一重置状态
        $('#courseIntroEngineering').hide();
        $('#resourceShowEngineering').show();
        $('#resourceShowEngineering .res-title').text(resName);
        $('#buildTipEngineering').hide();
        $('#resIframeEngineering').hide();
        $('.vr-card-container').remove();

        // VR资源特殊处理
        if(type === 'vr'){
            var hasCards = renderVrCards(sectionData.vrUrl, '#resourceShowEngineering', sectionData.title);
            if(!hasCards) {
                showBuildTipEngineering();
            }
            return;
        }

        // 其他资源处理
        if(type === 'test'){
            // 使用JavaScript测试系统
            $('#buildTipEngineering').hide();
            $('#resIframeEngineering').hide();
            $('#resourceShowEngineering').show();
            $('#resourceShowEngineering .res-title').text('在线测验');
            
            // 从章节标题提取章节编号（如 "3.2 曲面立体" -> "3_2"）
            var chapterFilter = '';
            if(sectionData.title && sectionData.title.match(/^(\d+)\.(\d+)/)){
                chapterFilter = RegExp.$1 + '_' + RegExp.$2;
            }
            
            // 动态加载quiz.js并渲染
            if (typeof QuizSystem === 'undefined') {
                $.getScript('/js/quiz.js?' + new Date().getTime(), function() {
                    QuizSystem.renderQuiz('engineering', 'resourceShowEngineering', chapterFilter);
                });
            } else {
                QuizSystem.renderQuiz('engineering', 'resourceShowEngineering', chapterFilter);
            }
            return;
        } else if(type === 'ppt'){
            $('#resourceShowEngineering .quiz-js-container').remove();
            $('#resourceShowEngineering #resIframeEngineering').show();
            $('#resourceShowEngineering .res-title').show();
            $('#buildTipEngineering').hide();
            $('#resIframeEngineering').show();
            $('#resIframeEngineering').attr('src', 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(sectionData.pptUrl));
            return;
        } else if(type === 'correct'){
            $('#resourceShowEngineering .quiz-js-container').remove();
            $('#resourceShowEngineering #resIframeEngineering').show();
            $('#resourceShowEngineering .res-title').show();
            url = location.protocol + '//' + location.host + '/sdxx/correct-engineering.html';
        } else if(type === 'knowledge'){
            $('#resourceShowEngineering .quiz-js-container').remove();
            $('#resourceShowEngineering #resIframeEngineering').show();
            $('#resourceShowEngineering .res-title').show();
            url = '/sdxx/knowledge-graph.html?lessonId=12';
        } else if(type === 'ai-edu'){
            $('#resourceShowEngineering .quiz-js-container').remove();
            $('#resourceShowEngineering #resIframeEngineering').show();
            $('#resourceShowEngineering .res-title').show();
            // url = '/sdxx/ai-chat.html?lessonId=2';
            url = '/sdxx/ai-chat.html?lessonId=12';
        } else {
            $('#resourceShowEngineering .quiz-js-container').remove();
            $('#resourceShowEngineering #resIframeEngineering').show();
            $('#resourceShowEngineering .res-title').show();
            url = sectionData[type + 'Url'];
        }

        loadResourceEngineering(url, resName);
    });

    function loadResourceEngineering(url, resName){
        if(url !== null && url !== undefined && url.trim() !== ""){
            $('#resIframeEngineering').show();
            $('#resIframeEngineering').removeAttr('srcdoc');
            $('#resIframeEngineering').attr('src', url);
            $('#buildTipEngineering').hide();
        }else{
            showBuildTipEngineering();
        }
    }

    function showBuildTipEngineering(){
        $('#resIframeEngineering').hide();
        $('#resIframeEngineering').attr('src','');
        $('#buildTipEngineering').show();
    }

    $(document).on('click','#courseTreeEngineering .layui-nav-item > a',function(){
        if($(this).attr('data-type')) return;
        $('#resourceShowEngineering .quiz-js-container').remove();
        $('#resourceShowEngineering').hide();
        $('#courseIntroEngineering').show();
        $('#resIframeEngineering').attr('src','');
        $('.vr-card-container').remove();
    });
});
</script>
</html>