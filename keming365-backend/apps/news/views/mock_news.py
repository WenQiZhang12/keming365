# -*- coding: utf-8 -*-
"""
apps.news.views.mock_news - Mock新闻数据视图（开发环境使用）
"""

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class MockNewsListView(APIView):
    """GET /api/v1/news/ - Mock新闻列表数据"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        mock_data = [
            {
                "id": "1",
                "title": "科明365VR教学平台升级公告",
                "content": "<p>科明365VR教学平台已完成全面升级，新增多项功能。</p>",
                "coverImg": "",
                "time": "2024-06-15T10:30:00",
                "browsetimes": 1234,
                "priority": 10
            },
            {
                "id": "2",
                "title": "2024年教材培训活动开始",
                "content": "<p>教材培训活动正式开始，所有课程享受8折优惠。</p>",
                "coverImg": "",
                "time": "2024-06-10T09:00:00",
                "browsetimes": 856,
                "priority": 9
            },
            {
                "id": "3",
                "title": "新增虚拟实验室",
                "content": "<p>平台新增虚拟实验室，学生可以身临其境地进行科学实验。</p>",
                "coverImg": "",
                "time": "2024-06-05T14:20:00",
                "browsetimes": 623,
                "priority": 8
            },
            {
                "id": "4",
                "title": "暑期培训计划发布",
                "content": "<p>2024年度暑期培训计划正式发布，欢迎各位同学报名参加。</p>",
                "coverImg": "",
                "time": "2024-05-28T11:00:00",
                "browsetimes": 445,
                "priority": 7
            },
            {
                "id": "5",
                "title": "在线答疑系统上线",
                "content": "<p>全新在线答疑系统持续上线，为您提供优质的学习支持。</p>",
                "coverImg": "",
                "time": "2024-05-20T16:30:00",
                "browsetimes": 987,
                "priority": 6
            }
        ]
        
        return Response({"results": mock_data, "count": len(mock_data)})


class MockNewsDetailView(APIView):
    """GET /api/v1/news/<pk>/ - Mock新闻详情数据"""
    permission_classes = [AllowAny]
    
    def get(self, request, pk):
        news_details = {
            "1": {
                "id": "1",
                "title": "科明365VR教学平台升级公告",
                "content": "<h1>科明365VR教学平台升级公告</h1><p>尊敬的用户，科明365VR教学平台已于2024年6月15日完成全面升级。</p><p>本次升级新增了以下功能：</p><ul><li>全新的VR实验场景</li><li>智能学习推荐系统</li><li>在线考试模块</li><li>数据统计分析功能</li></ul><p>感谢您的支持与使用！</p>",
                "coverImg": "",
                "time": "2024-06-15T10:30:00",
                "browsetimes": 1234
            },
            "2": {
                "id": "2",
                "title": "2024年教材培训活动开始",
                "content": "<h1>2024年教材培训活动开始</h1><p>2024年度教材培训活动正式启动，活动期间所有课程享受8折优惠。</p><p>活动时间：2024年6月10日 - 2024年8月31日</p>",
                "coverImg": "",
                "time": "2024-06-10T09:00:00",
                "browsetimes": 856
            },
            "3": {
                "id": "3",
                "title": "新增虚拟实验室",
                "content": "<h1>新增虚拟实验室</h1><p>平台新增虚拟实验室模块，涵盖物理、化学、生物等多个学科的实验内容。</p>",
                "coverImg": "",
                "time": "2024-06-05T14:20:00",
                "browsetimes": 623
            },
            "4": {
                "id": "4",
                "title": "暑期培训计划发布",
                "content": "<h1>暑期培训计划发布</h1><p>2024年度暑期培训计划正式发布，包含多种学科的精品课程。</p>",
                "coverImg": "",
                "time": "2024-05-28T11:00:00",
                "browsetimes": 445
            },
            "5": {
                "id": "5",
                "title": "在线答疑系统上线",
                "content": "<h1>在线答疑系统上线</h1><p>全新在线答疑系统已上线，支持实时问答和问题提交。</p>",
                "coverImg": "",
                "time": "2024-05-20T16:30:00",
                "browsetimes": 987
            }
        }
        
        news = news_details.get(pk, news_details["1"])
        return Response(news)
