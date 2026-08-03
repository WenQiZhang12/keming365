<%@page import="com.km.jxpt.pojo.TbUser"%>
<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<html>
<head>
<meta name="viewport" content="width=device-width, user-scalable=yes, initial-scale=0.3, maximum-scale=1.0, minimum-scale=0.3">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="shortcut icon" href="https://www.keming365.com/upload/favicon.ico">
<%
	request.setCharacterEncoding("UTF-8");
	String appContext = request.getContextPath();
	String contextPath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+appContext;
	TbUser user = null;
	if(session.getAttribute("user") != null){
		user = (TbUser)session.getAttribute("user");
	}
%>
<title>科明365VR教学云平台</title>
<link rel="stylesheet" type="text/css" href="<%=contextPath %>/css/common.css">
<style type='text/css'>
* {margin:0;padding:0;box-sizing:border-box;}
body {font-family: "Microsoft YaHei", Arial, sans-serif;background-color: #f5f5f5;color:#333;}
#wrapper {width:100%;min-height:100vh;}

.banner {
    width: 100%;
    height: 220px;
    background: linear-gradient(135deg, #0066cc 0%, #0088ee 100%);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
}
.banner-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-position: center;
}
.banner-title {
    position: relative;
    z-index: 10;
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
    letter-spacing: 8px;
}

.main-content {
    width: 1200px;
    margin: 40px auto;
    min-height: 500px;
}

.category-section {
    margin-bottom: 40px;
}
.category-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-bottom: 25px;
    padding-left: 15px;
    border-left: 4px solid #0066cc;
}
.view-more {
    font-size: 14px;
    font-weight: normal;
    color: #0066cc;
    cursor: pointer;
}

.textbook-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
}

.textbook-card {
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
}
.textbook-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.textbook-cover {
    width: 100%;
    height: 360px;
    overflow: hidden;
    position: relative;
}
.textbook-cover img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}
.textbook-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    width: 80px;
    height: 30px;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
}

.textbook-info {
    padding: 15px;
}
.textbook-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.textbook-author {
    font-size: 13px;
    color: #999;
    line-height: 1.5;
}
</style>
</head>
<body>
<div id="wrapper">
    <% if(user!=null){ %>
        <jsp:include page="header2.jsp"></jsp:include>
    <%}else{%>
        <jsp:include page="header_noUser2.jsp"></jsp:include>
    <%}%>

    <div class="banner">
        <div class="banner-bg" style="background-image: url('<%=contextPath %>/images/szjc/13数字教材banner.png')"></div>
    </div>

    <div class="main-content">
        <div class="category-section">
            <div class="category-title">
                <span>机械工程</span>
                <span class="view-more">查看更多</span>
            </div>
            <div class="textbook-grid">
                <div class="textbook-card" onclick="openCourse('jiaocai1')">
                    <div class="textbook-cover">
                        <div class="textbook-badge" style="background-image: url('<%=contextPath %>/images/szjc/数字教材标签.png')"></div>
                        <img src="<%=contextPath %>/images/szjc/画法几何与机械制图缩略图.png" alt="画法几何与机械制图">
                    </div>
                    <div class="textbook-info">
                        <div class="textbook-name">画法几何与机械制图</div>
                        <div class="textbook-author">主编：段辉 张莹 陈清奎</div>
                    </div>
                </div>

                <div class="textbook-card" onclick="openCourse('jiaocai2')">
                    <div class="textbook-cover">
                        <div class="textbook-badge" style="background-image: url('<%=contextPath %>/images/szjc/数字教材标签.png')"></div>
                        <img src="<%=contextPath %>/images/szjc/液压与气压传动缩略图.png" alt="液压与气压传动">
                    </div>
                    <div class="textbook-info">
                        <div class="textbook-name">液压与气压传动</div>
                        <div class="textbook-author">主编：陈清奎 刘延俊 成红梅</div>
                    </div>
                </div>

                <div class="textbook-card" onclick="openCourse('jiaocai3')">
                    <div class="textbook-cover">
                        <div class="textbook-badge" style="background-image: url('<%=contextPath %>/images/szjc/数字教材标签.png')"></div>
                        <img src="<%=contextPath %>/images/szjc/工程训练缩略图.png" alt="工程训练">
                    </div>
                    <div class="textbook-info">
                        <div class="textbook-name">工程训练</div>
                        <div class="textbook-author">主编：赵越超 董世知 范培卿</div>
                    </div>
                </div>

                <div class="textbook-card" onclick="openCourse('jiaocai4')">
                    <div class="textbook-cover">
                        <div class="textbook-badge" style="background-image: url('<%=contextPath %>/images/szjc/数字教材标签.png')"></div>
                        <img src="<%=contextPath %>/images/szjc/机械设计缩略图.png" alt="机械设计">
                    </div>
                    <div class="textbook-info">
                        <div class="textbook-name">机械设计</div>
                        <div class="textbook-author">主编：张继忠 赵彦峻 徐 楠</div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <jsp:include page="foot.jsp"></jsp:include>
</div>
<script src="<%=contextPath %>/js/jquery-2.0.0.js"></script>
<script>
function openCourse(courseName) {
    window.location.href = 'http://60.216.119.138:3000/login';
}
</script>
</body>
</html>