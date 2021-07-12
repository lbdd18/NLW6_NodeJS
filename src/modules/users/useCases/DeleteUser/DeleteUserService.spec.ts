import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'
import { DeleteUserService } from "./DeleteUserService";

let fakeUsersRepositories: FakeUsersRepositories;
let deleteUser: DeleteUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    deleteUser = new DeleteUserService(fakeUsersRepositories);
  });

  it('should be able to delete a existant user', async () =>{
    const user = await fakeUsersRepositories.create({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    const userID = await deleteUser.execute(user.id);

    expect(userID).toBe(user.id);
  });

  it('should not be able to delete a non-existant user', async () =>{
    expect(deleteUser.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});