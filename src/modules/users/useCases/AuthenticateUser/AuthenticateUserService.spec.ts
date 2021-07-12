import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { FakeUsersRepositories } from "@modules/users/repositories/fakes/FakeUsersRepositories";

import { AuthenticateUserService } from "./AuthenticateUserService";
import { CreateUserService } from "../CreateUser/CreateUserService";

let fakeUsersRepositories: FakeUsersRepositories;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe("Authenticate User", () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();

    authenticateUser = new AuthenticateUserService(
    fakeUsersRepositories);
    createUser = new CreateUserService(fakeUsersRepositories);
  });

  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };
    await createUser.execute(user);

    const result = await authenticateUser.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).not.toBeNull();
  });

  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(
      authenticateUser.execute({
        email: "false@email.com",
        password: "1234",
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it("should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      email: "user@test.com",
      password: "1234",
      name: "User Test",
    };

    await createUser.execute(user);

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: "incorrectPassword",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});