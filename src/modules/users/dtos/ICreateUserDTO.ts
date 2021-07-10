interface ICreateUserDTO{
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

export { ICreateUserDTO }