"""Rate limits for authentication and verification-code endpoints."""

import hashlib

from rest_framework.throttling import SimpleRateThrottle


class _FixedRateThrottle(SimpleRateThrottle):
    def get_rate(self):
        return self.rate

    def _key(self, value):
        digest = hashlib.sha256(value.encode('utf-8')).hexdigest()
        return self.cache_format % {'scope': self.scope, 'ident': digest}


class LoginRateThrottle(_FixedRateThrottle):
    scope = 'auth_login'
    rate = '5/min'

    def get_cache_key(self, request, view):
        return self._key(self.get_ident(request))


class RefreshTokenRateThrottle(_FixedRateThrottle):
    scope = 'auth_refresh'
    rate = '30/min'

    def get_cache_key(self, request, view):
        return self._key(self.get_ident(request))


class SmsIpRateThrottle(_FixedRateThrottle):
    scope = 'sms_ip'
    rate = '30/hour'

    def get_cache_key(self, request, view):
        return self._key(self.get_ident(request))


class SmsPhoneRateThrottle(_FixedRateThrottle):
    scope = 'sms_phone'
    rate = '5/hour'

    def get_cache_key(self, request, view):
        data = getattr(request, 'data', request.POST)
        telephone = str(data.get('telephone', '')).strip()
        return self._key(telephone) if telephone else None
