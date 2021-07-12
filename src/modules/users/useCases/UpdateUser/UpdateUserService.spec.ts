import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'
import { UpdateUserService } from "./UpdateUserService";

let fakeUsersRepositories: FakeUsersRepositories;
let updateUser: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    updateUser = new UpdateUserService(fakeUsersRepositories);
  });

  it('should be able to update a existant user', async () =>{
    const user = await fakeUsersRepositories.create({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    })

    const updatedUser = await updateUser.execute({
      id: user.id,
      name: "UserNameUpdated",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    expect(updatedUser.name).toBe("UserNameUpdated");
  });

  it('should not be able to update a user with a invalid name', async () =>{
    expect(updateUser.execute({
      id: "invalid-id",
      name: "",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    })).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a user with a invalid email', async () =>{
    expect(updateUser.execute({
      id: "invalid-id",
      name: "UserName",
      email: "",
      admin: true,
      password: "mypass"
    })).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a user with a invalid password', async () =>{
    expect(updateUser.execute({
      id: "invalid-id",
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: ""
    })).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a user with a invalid password', async () =>{
    expect(updateUser.execute({
      id: "invalid-id",
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "password"
    })).rejects.toBeInstanceOf(Error);
  });
});