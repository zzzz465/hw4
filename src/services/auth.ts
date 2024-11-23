interface User {
  email: string;
  password: string;
  apiKey: string;
}

export const auth = {
  register: (email: string, password: string, apiKey: string): void => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some(user => user.email === email)) {
      throw new Error('Email already registered');
    }

    if (!apiKey.trim()) {
      throw new Error('TMDB API Key is required');
    }

    users.push({ email, password, apiKey });
    localStorage.setItem('users', JSON.stringify(users));
  },

  login: (email: string, password: string): User => {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email);

    if (!user) {
      throw new Error('Invalid email or password');
    }

    if (user.password !== password) {
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    return user;
  },

  logout: (): void => {
    localStorage.removeItem('currentUser');
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
  },

  isLoggedIn: (): boolean => {
    return !!localStorage.getItem('currentUser');
  },

  getApiKey: () => {
    const user = localStorage.getItem('currentUser')
    if (!user) return null
    return JSON.parse(user).apiKey
  }
};
