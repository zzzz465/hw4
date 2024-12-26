import axios from 'axios';

const KAKAO_AUTH_URL = 'https://kauth.kakao.com/oauth';
const KAKAO_API_URL = 'https://kapi.kakao.com';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
  refresh_token_expires_in: number;
}

interface KakaoUserInfo {
  id: number;
  connected_at: string;
  properties: {
    nickname: string;
    profile_image?: string;
  };
  kakao_account: {
    email?: string;
    profile?: {
      nickname: string;
      profile_image_url?: string;
    };
  };
}

export const kakaoAuth = {
  login: async () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = `${window.location.origin}/oauth/callback/kakao`;

    window.location.href = `${KAKAO_AUTH_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  },

  handleCallback: async (code: string) => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = `${window.location.origin}/oauth/callback/kakao`;

    const tokenResponse = await axios.post<KakaoTokenResponse>(
      `${KAKAO_AUTH_URL}/token`,
      null,
      {
        params: {
          grant_type: 'authorization_code',
          client_id: CLIENT_ID,
          redirect_uri: REDIRECT_URI,
          code,
        },
      }
    );

    const { access_token } = tokenResponse.data;
    localStorage.setItem('kakao_access_token', access_token);

    const userInfo = await axios.get<KakaoUserInfo>(
      `${KAKAO_API_URL}/v2/user/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return userInfo.data;
  },

  logout: async () => {
    const access_token = localStorage.getItem('kakao_access_token');
    if (!access_token) return;

    try {
      await axios.post(
        `${KAKAO_API_URL}/v1/user/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
    } finally {
      localStorage.removeItem('kakao_access_token');
    }
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('kakao_access_token');
  },
};
