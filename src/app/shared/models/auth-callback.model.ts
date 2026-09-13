export interface IAuthCallbackParams {
  status?: string;
  idToken?: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  iss?: string;
  sub?: string;
  emailVerified?: string | boolean;
  picture?: string;
  referralCode?: string;
}
