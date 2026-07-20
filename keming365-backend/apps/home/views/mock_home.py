# -*- coding: utf-8 -*-
"""
apps.home.views.mock_home - Mock数据视图（开发环境使用）
"""

from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView


class MockClassifyView(APIView):
    """GET /api/v1/home/classify/ - Mock分类数据"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        mock_data = [
            {"id": "1", "className": "机械工程", "sortOrder": 1, "status": 1},
            {"id": "2", "className": "工程训练", "sortOrder": 2, "status": 1},
            {"id": "3", "className": "力学", "sortOrder": 3, "status": 1},
            {"id": "4", "className": "土木工程", "sortOrder": 4, "status": 1},
            {"id": "5", "className": "装配式建筑", "sortOrder": 5, "status": 1},
            {"id": "6", "className": "大学物理", "sortOrder": 6, "status": 1},
            {"id": "7", "className": "能源动力", "sortOrder": 7, "status": 1},
            {"id": "8", "className": "水利工程", "sortOrder": 8, "status": 1},
            {"id": "9", "className": "生物工程", "sortOrder": 9, "status": 1},
            {"id": "10", "className": "文化艺术", "sortOrder": 10, "status": 1},
            {"id": "11", "className": "航海类", "sortOrder": 11, "status": 1},
            {"id": "12", "className": "学前教育/康养", "sortOrder": 12, "status": 1},
        ]
        return Response(mock_data)


class MockExperimentsView(APIView):
    """GET /api/v1/courses/experiments/ - Mock实验数据"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        classify_id = request.query_params.get('classifyId')
        
        experiments = {
            "1": [{"id": "p1", "title": "牛顿第一定律实验", "publisher": "物理教研组", "price": 0, "image": "", "type": 1, "parentId": "1"},
                  {"id": "p2", "title": "摩擦力测量实验", "publisher": "物理教研组", "price": 50, "image": "", "type": 1, "parentId": "1"},
                  {"id": "p3", "title": "电路串联并联实验", "publisher": "物理教研组", "price": 30, "image": "", "type": 1, "parentId": "1"},
                  {"id": "p4", "title": "光的折射实验", "publisher": "物理教研组", "price": 0, "image": "", "type": 1, "parentId": "1"},
                  {"id": "p5", "title": "磁场与电流实验", "publisher": "物理教研组", "price": 80, "image": "", "type": 1, "parentId": "1"}],
            "2": [{"id": "c1", "title": "酸碱中和反应", "publisher": "化学教研组", "price": 0, "image": "", "type": 1, "parentId": "2"},
                  {"id": "c2", "title": "氧气制取实验", "publisher": "化学教研组", "price": 40, "image": "", "type": 1, "parentId": "2"},
                  {"id": "c3", "title": "溶液配制实验", "publisher": "化学教研组", "price": 20, "image": "", "type": 1, "parentId": "2"},
                  {"id": "c4", "title": "金属活动性实验", "publisher": "化学教研组", "price": 0, "image": "", "type": 1, "parentId": "2"},
                  {"id": "c5", "title": "有机化合物鉴定", "publisher": "化学教研组", "price": 60, "image": "", "type": 1, "parentId": "2"}],
            "3": [{"id": "b1", "title": "细胞结构观察", "publisher": "生物教研组", "price": 0, "image": "", "type": 1, "parentId": "3"},
                  {"id": "b2", "title": "光合作用实验", "publisher": "生物教研组", "price": 35, "image": "", "type": 1, "parentId": "3"},
                  {"id": "b3", "title": "DNA提取实验", "publisher": "生物教研组", "price": 55, "image": "", "type": 1, "parentId": "3"},
                  {"id": "b4", "title": "酶活性实验", "publisher": "生物教研组", "price": 0, "image": "", "type": 1, "parentId": "3"},
                  {"id": "b5", "title": "遗传变异实验", "publisher": "生物教研组", "price": 70, "image": "", "type": 1, "parentId": "3"}],
            "4": [{"id": "m1", "title": "函数图像绘制", "publisher": "数学教研组", "price": 0, "image": "", "type": 1, "parentId": "4"},
                  {"id": "m2", "title": "概率统计实验", "publisher": "数学教研组", "price": 25, "image": "", "type": 1, "parentId": "4"},
                  {"id": "m3", "title": "几何图形测量", "publisher": "数学教研组", "price": 0, "image": "", "type": 1, "parentId": "4"},
                  {"id": "m4", "title": "矩阵运算实验", "publisher": "数学教研组", "price": 45, "image": "", "type": 1, "parentId": "4"},
                  {"id": "m5", "title": "微积分基础实验", "publisher": "数学教研组", "price": 65, "image": "", "type": 1, "parentId": "4"}]
        }
        
        data = experiments.get(classify_id or "1", experiments["1"])
        return Response({"results": data, "count": len(data)})


class MockCurriculaView(APIView):
    """GET /api/v1/courses/ - Mock课程数据（12个课程）"""
    permission_classes = [AllowAny]
    
    def get(self, request):
        mock_data = [
            {"id": "1", "curriculumName": "机械工程", "classifyId": "1", "classifyName": "机械工程", "price": 0, "status": 1},
            {"id": "2", "curriculumName": "工程训练", "classifyId": "2", "classifyName": "工程训练", "price": 98, "status": 1},
            {"id": "3", "curriculumName": "力学", "classifyId": "3", "classifyName": "力学", "price": 128, "status": 1},
            {"id": "4", "curriculumName": "土木工程", "classifyId": "4", "classifyName": "土木工程", "price": 0, "status": 1},
            {"id": "5", "curriculumName": "装配式建筑", "classifyId": "5", "classifyName": "装配式建筑", "price": 88, "status": 1},
            {"id": "6", "curriculumName": "大学物理", "classifyId": "6", "classifyName": "大学物理", "price": 118, "status": 1},
            {"id": "7", "curriculumName": "能源动力", "classifyId": "7", "classifyName": "能源动力", "price": 0, "status": 1},
            {"id": "8", "curriculumName": "水利工程", "classifyId": "8", "classifyName": "水利工程", "price": 78, "status": 1},
            {"id": "9", "curriculumName": "生物工程", "classifyId": "9", "classifyName": "生物工程", "price": 108, "status": 1},
            {"id": "10", "curriculumName": "文化艺术", "classifyId": "10", "classifyName": "文化艺术", "price": 0, "status": 1},
            {"id": "11", "curriculumName": "航海类", "classifyId": "11", "classifyName": "航海类", "price": 68, "status": 1},
            {"id": "12", "curriculumName": "学前教育/康养", "classifyId": "12", "classifyName": "学前教育/康养", "price": 98, "status": 1},
        ]
        
        search = request.query_params.get('search', '')
        classify_id = request.query_params.get('classifyId')
        
        if search:
            mock_data = [c for c in mock_data if search.lower() in c['curriculumName'].lower()]
        if classify_id:
            mock_data = [c for c in mock_data if c['classifyId'] == classify_id]
        
        return Response({"results": mock_data, "count": len(mock_data)})
