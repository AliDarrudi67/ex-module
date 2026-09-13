import { ROLE_TYPE } from '../enums/role-type';

export type IRoleType = (typeof ROLE_TYPE)[number]['value'];
