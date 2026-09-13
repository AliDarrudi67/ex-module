export interface IUserProfile {
  profileId: string;
  userId: string;
  referralCode: string;
  infoReferral: boolean;
  nationalCode: string;
  firstName: string;
  lastName: string;
  father: string;
  sex: 'MEN' | 'WOMEN'; // اگر فقط MEN باشد بگو تا اصلاح کنم
  birthDate: string;
  iso3: string;
  city: string;
  address: string;
  acceptSystem: 'ACTIVE' | 'INACTIVE'; // اگر مقادیر دیگری دارد بگو
  createdAt: string;
}
