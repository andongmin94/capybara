from copy import deepcopy
from unittest.mock import Mock, patch

import requests
from django.test import override_settings
from rest_framework.test import APITestCase

from .models import DepositOptions, DepositProducts


def deposit_payload(rate=3.1):
    return {
        "result": {
            "baseList": [
                {
                    "dcls_month": "202311",
                    "fin_prdt_cd": "DEMO001",
                    "kor_co_nm": "카피바라은행",
                    "fin_prdt_nm": "데모 정기예금",
                    "etc_note": "가상 상품 데이터",
                    "join_deny": "1",
                    "join_member": "개인",
                    "join_way": "온라인",
                    "spcl_cnd": "없음",
                }
            ],
            "optionList": [
                {
                    "dcls_month": "202311",
                    "fin_prdt_cd": "DEMO001",
                    "intr_rate_type_nm": "단리",
                    "intr_rate": rate,
                    "intr_rate2": 3.5,
                    "save_trm": "12",
                }
            ],
        }
    }


class FinlifeApiTests(APITestCase):
    @override_settings(FSS_API_KEY="")
    @patch("finlife.views.requests.get")
    def test_import_requires_api_key(self, get_mock):
        response = self.client.get("/finlife/save-deposit-products/")

        self.assertEqual(response.status_code, 503)
        self.assertIn("message", response.data)
        get_mock.assert_not_called()

    @override_settings(FSS_API_KEY="test-key", FSS_API_TIMEOUT=2.5)
    @patch("finlife.views.requests.get")
    def test_import_uses_https_timeout_and_updates_without_duplicates(
        self,
        get_mock,
    ):
        first_response = Mock()
        first_response.json.return_value = deposit_payload(rate=3.1)
        second_response = Mock()
        second_payload = deepcopy(deposit_payload(rate=3.2))
        second_response.json.return_value = second_payload
        get_mock.side_effect = [first_response, second_response]

        first = self.client.get("/finlife/save-deposit-products/")
        second = self.client.get("/finlife/save-deposit-products/")

        self.assertEqual(first.status_code, 200)
        self.assertEqual(first.data, {"message": "okay "})
        self.assertEqual(second.status_code, 200)
        self.assertEqual(DepositProducts.objects.count(), 1)
        self.assertEqual(DepositOptions.objects.count(), 1)
        self.assertEqual(DepositOptions.objects.get().intr_rate, 3.2)

        requested_url = get_mock.call_args_list[0].args[0]
        request_options = get_mock.call_args_list[0].kwargs
        self.assertTrue(requested_url.startswith("https://"))
        self.assertNotIn("test-key", requested_url)
        self.assertEqual(request_options["params"]["auth"], "test-key")
        self.assertEqual(request_options["timeout"], 2.5)
        first_response.raise_for_status.assert_called_once_with()

    @override_settings(FSS_API_KEY="test-key")
    @patch("finlife.views.requests.get")
    def test_upstream_timeout_returns_bad_gateway(self, get_mock):
        get_mock.side_effect = requests.Timeout("upstream timeout")

        response = self.client.get("/finlife/save-deposit-products/")

        self.assertEqual(response.status_code, 502)
        self.assertIn("message", response.data)
        self.assertEqual(DepositProducts.objects.count(), 0)

    @override_settings(FSS_API_KEY="test-key")
    @patch("finlife.views.requests.get")
    def test_malformed_upstream_payload_returns_bad_gateway(self, get_mock):
        upstream_response = Mock()
        upstream_response.json.return_value = {"unexpected": "payload"}
        get_mock.return_value = upstream_response

        response = self.client.get("/finlife/save-deposit-products/")

        self.assertEqual(response.status_code, 502)
        self.assertEqual(DepositProducts.objects.count(), 0)
