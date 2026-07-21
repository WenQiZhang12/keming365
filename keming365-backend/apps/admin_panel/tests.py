"""Tests for admin dashboard access, statistics, and shared pagination."""

from types import SimpleNamespace
from unittest.mock import patch

from django.test import SimpleTestCase
from rest_framework.request import Request
from rest_framework.test import APIRequestFactory, force_authenticate

from apps.admin_panel.views.admin import DashboardView
from utils.pagination import StandardPagination


def authenticated_user(user_type):
    return SimpleNamespace(
        id=f'user-{user_type}',
        type=user_type,
        expireTime=None,
        is_authenticated=True,
    )


class DashboardViewTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def get_dashboard(self, user=None):
        request = self.factory.get('/api/v1/admin/dashboard/')
        if user is not None:
            force_authenticate(request, user=user)
        return DashboardView.as_view()(request)

    def test_anonymous_and_student_requests_are_rejected(self):
        self.assertEqual(self.get_dashboard().status_code, 401)
        self.assertEqual(self.get_dashboard(authenticated_user(2)).status_code, 403)

    @patch('apps.admin_panel.views.admin.Orders.objects.filter')
    @patch('apps.admin_panel.views.admin.TbUser.objects.filter')
    @patch('apps.admin_panel.views.admin.Orders.objects.count', return_value=9)
    @patch('apps.admin_panel.views.admin.TbExperiment.objects.count', return_value=30)
    @patch('apps.admin_panel.views.admin.TbCurriculum.objects.count', return_value=20)
    @patch('apps.admin_panel.views.admin.TbUser.objects.count', return_value=10)
    @patch('apps.admin_panel.views.admin.connection.introspection.table_names', return_value=['orders'])
    def test_admin_receives_database_counts(
        self,
        _table_names,
        _user_count,
        _course_count,
        _experiment_count,
        _order_count,
        user_filter,
        order_filter,
    ):
        user_filter.return_value.count.return_value = 2
        order_filter.return_value.count.return_value = 3

        response = self.get_dashboard(authenticated_user(4))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, {
            'userCount': 10,
            'courseCount': 20,
            'experimentCount': 30,
            'orderCount': 9,
            'todayNewUsers': 2,
            'todayOrders': 3,
        })

    @patch('apps.admin_panel.views.admin.Orders.objects.filter')
    @patch('apps.admin_panel.views.admin.Orders.objects.count')
    @patch('apps.admin_panel.views.admin.TbUser.objects.filter')
    @patch('apps.admin_panel.views.admin.TbExperiment.objects.count', return_value=30)
    @patch('apps.admin_panel.views.admin.TbCurriculum.objects.count', return_value=20)
    @patch('apps.admin_panel.views.admin.TbUser.objects.count', return_value=10)
    @patch('apps.admin_panel.views.admin.connection.introspection.table_names', return_value=[])
    def test_teacher_receives_zero_when_orders_table_is_absent(
        self,
        _table_names,
        _user_count,
        _course_count,
        _experiment_count,
        user_filter,
        order_count,
        order_filter,
    ):
        user_filter.return_value.count.return_value = 1

        response = self.get_dashboard(authenticated_user(1))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['orderCount'], 0)
        self.assertEqual(response.data['todayOrders'], 0)
        order_count.assert_not_called()
        order_filter.assert_not_called()


class StandardPaginationTests(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()

    def test_page_and_page_size_are_applied(self):
        request = Request(self.factory.get('/items/', {'page': 2, 'page_size': 3}))
        paginator = StandardPagination()

        page = paginator.paginate_queryset(list(range(8)), request)
        response = paginator.get_paginated_response(page)

        self.assertEqual(page, [3, 4, 5])
        self.assertEqual(response.data['count'], 8)
        self.assertIsNotNone(response.data['next'])
        self.assertIsNotNone(response.data['previous'])

    def test_page_size_is_limited_to_one_hundred(self):
        request = Request(self.factory.get('/items/', {'page_size': 1000}))
        paginator = StandardPagination()

        page = paginator.paginate_queryset(list(range(150)), request)

        self.assertEqual(len(page), 100)
