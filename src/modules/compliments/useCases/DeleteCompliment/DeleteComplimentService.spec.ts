import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories'

import { DeleteComplimentService } from "./DeleteComplimentService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let deleteCompliment: DeleteComplimentService;

describe('DeleteCompliment', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    deleteCompliment = new DeleteComplimentService(fakeComplimentsRepositories);
  });

  it('should be able to delete a compliment', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});
    
    const id = await deleteCompliment.execute(compliment.id);

    expect(id).toBe(compliment.id);
  });

  it('should not be able to delete a non-existant compliment', async () =>{
    expect(deleteCompliment.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});