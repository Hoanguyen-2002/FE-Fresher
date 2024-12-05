export type TLoginBody = {
  username: string;
  password: string;
};

export type TLoginResponse = {
  accessToken: string;
  refreshToken: string;
  type: string;
  userId: string;
  username: string;
  email: string;
  role: string;
};

export type TRegisterBody = {
  username: string;
  password: string;
  email: string;
  fullname: string;
  phone: string;
};

export type TVerifyOtpBody = {
  email: string;
  otp: string;
};

export type TRefreshTokenBody = {
  refreshToken: string;
  userId: string;
};
