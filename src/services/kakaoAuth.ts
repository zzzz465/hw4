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
    profile: {
      nickname: string;
    };
  };
}

export const kakaoAuth = {
  getRedirectUri: () => {
    return `${window.location.origin}/oauth/callback/kakao`;
  },

  login: () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = kakaoAuth.getRedirectUri();

    const authUrl = `${KAKAO_AUTH_URL}/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    return authUrl;
  },

  handleCallback: async (code: string) => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = kakaoAuth.getRedirectUri();

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
      const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
      const REDIRECT_URI = kakaoAuth.getRedirectUri();

      await axios.get(`https://kauth.kakao.com/v1/user/logout?client_id=${CLIENT_ID}&logout_redirect_uri=${REDIRECT_URI}`);
    } finally {
      localStorage.removeItem('kakao_access_token');
      localStorage.removeItem('currentUser');
      window.location.reload();
    }
  },

  isLoggedIn: () => {
    return !!localStorage.getItem('kakao_access_token');
  },

  getCurrentUser: (): KakaoUserInfo | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  }
};
