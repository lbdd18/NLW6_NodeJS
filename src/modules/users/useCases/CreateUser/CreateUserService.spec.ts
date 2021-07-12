import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'
import { CreateUserService } from "./CreateUserService";

let fakeUsersRepositories: FakeUsersRepositories;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    createUser = new CreateUserService(fakeUsersRepositories);
  });

  it('should be able to create a new user', async () =>{
    const createdUser = await createUser.execute({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    expect(createdUser.name).toBe("UserName");
  });

  it('should not be able to create a user with a invalid email', async () =>{
    expect(createUser.execute({
      name: "UserName",
      email: "",
      admin: true,
      password: "mypass"
    })).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a user with a existant email', async () =>{
    const tag = await fakeUsersRepositories.create({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    expect(createUser.execute({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    })).rejects.toBeInstanceOf(Error);
  });
});