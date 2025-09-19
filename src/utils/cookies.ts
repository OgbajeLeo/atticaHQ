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

const TOKEN_KEY = 'adminToken';
const ADMIN_TOKEN_KEY = 'adminToken';
const ADMIN_USER_KEY = 'adminUser';

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

// Admin-specific cookie functions
export const getAdminToken = (): string | undefined => {
  return Cookies.get(ADMIN_TOKEN_KEY);
};

export const setAdminToken = (token: string, expiresIn?: number): void => {
  const options: CookieOptions = {
    ...DEFAULT_OPTIONS,
  };

  if (expiresIn) {
    options.expires = new Date(Date.now() + expiresIn * 1000);
  }

  console.log("Setting admin token:", { token, options, ADMIN_TOKEN_KEY });
  Cookies.set(ADMIN_TOKEN_KEY, token, options);
  console.log("Token set, verifying:", Cookies.get(ADMIN_TOKEN_KEY));
};

export const removeAdminToken = (): void => {
  Cookies.remove(ADMIN_TOKEN_KEY, {
    path: DEFAULT_OPTIONS.path,
    domain: DEFAULT_OPTIONS.domain,
  });
};

export const hasAdminToken = (): boolean => {
  return !!getAdminToken();
};

export const getAdminUser = (): string | undefined => {
  return Cookies.get(ADMIN_USER_KEY);
};

export const setAdminUser = (userData: string, expiresIn?: number): void => {
  const options: CookieOptions = {
    ...DEFAULT_OPTIONS,
  };

  if (expiresIn) {
    options.expires = new Date(Date.now() + expiresIn * 1000);
  }

  Cookies.set(ADMIN_USER_KEY, userData, options);
};

export const removeAdminUser = (): void => {
  Cookies.remove(ADMIN_USER_KEY, {
    path: DEFAULT_OPTIONS.path,
    domain: DEFAULT_OPTIONS.domain,
  });
};