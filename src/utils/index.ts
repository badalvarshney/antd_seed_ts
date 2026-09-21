// LocalStorage Token & User utilities
export const getToken = (): string | null => {
  return localStorage.getItem('auth_token') || null;
};

export const setToken = (token: string | null | undefined): void => {
  if (token) {
    localStorage.setItem('auth_token', token);
  }
};

export const removeToken = (): void => {
  localStorage.removeItem('auth_token');
};

export const getUser = <T = unknown>(): T | null => {
  try {
    const user = localStorage.getItem('auth_user');
    return user ? (JSON.parse(user) as T) : null;
  } catch (e) {
    return null;
  }
};

export const setUser = <T = unknown>(user: T | null | undefined): void => {
  if (user) {
    localStorage.setItem('auth_user', JSON.stringify(user));
  }
};

export const removeUser = (): void => {
  localStorage.removeItem('auth_user');
};
