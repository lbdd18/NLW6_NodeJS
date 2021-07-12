import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'
import { ListAllUsersService } from "./ListAllUsersService";

let fakeUsersRepositories: FakeUsersRepositories;
let listAllUsers: ListAllUsersService;

describe('ListAllUsers', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    listAllUsers = new ListAllUsersService(fakeUsersRepositories);
  });

  it('should be able to list all users', async () =>{
    const user = await fakeUsersRepositories.create({
      name: "UserName",
      email: "useremail@test.com",
      admin: true,
      password: "mypass"
    });

    const listedUsers = await listAllUsers.execute();

    expect(listedUsers.length).toBe(1);
  });
});