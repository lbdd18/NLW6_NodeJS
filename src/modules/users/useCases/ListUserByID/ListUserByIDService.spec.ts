import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'
import { ListUserByIDService } from "./ListUserByIDService";

let fakeUsersRepositories: FakeUsersRepositories;
let listUserByID: ListUserByIDService;

describe('ListUserByID', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    listUserByID = new ListUserByIDService(fakeUsersRepositories);
  });

  it('should be able to list a existant user by id', async () =>{
    const user = await fakeUsersRepositories.create({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    const listedUser = await listUserByID.execute(user.id);

    expect(listedUser.id).toBe(user.id);
  });

  it('should not be able to list a non-existant user', async () =>{
    expect(listUserByID.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});