import { IJHI_User } from 'app/shared/model/jhi-user.model';

export interface IUserExtra {
  id?: number;
  balance?: number;
  jHI_User?: IJHI_User;
}

export const defaultValue: Readonly<IUserExtra> = {};
