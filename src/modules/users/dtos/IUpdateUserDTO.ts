interface IUpdateUserDTO{
  id: string;
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export { IUpdateUserDTO }