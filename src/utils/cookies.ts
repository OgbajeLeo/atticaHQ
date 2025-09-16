import Cookies from 'js-cookie';

type CookieOptions = {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
};

const DEFAULT_OPTIONS: CookieOptions = {
  path: '/',
  secure: import.meta.env.PROD, 
  sameSite: 'lax',
};

const TOKEN_KEY = 'xtoken';

export const getToken = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};


export const setToken = (token: string, expiresIn?: number): void => {
  const options: CookieOptions = {
    ...DEFAULT_OPTIONS,
  };

  if (expiresIn) {
    options.expires = new Date(Date.now() + expiresIn * 1000);
  }

  Cookies.set(TOKEN_KEY, token, options);
};

// setToken('your token', 3600*24); // Set token with 1 day expiration


export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY, {
    path: DEFAULT_OPTIONS.path,
    domain: DEFAULT_OPTIONS.domain,
  });
};


export const hasToken = (): boolean => {
  return !!getToken();
};