import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories';

import { ListComplimentsByUserSenderService } from "./ListComplimentsByUserSenderService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let ListComplimentsByUserSender: ListComplimentsByUserSenderService;

describe('ListComplimentsByUserSender', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    ListComplimentsByUserSender = new ListComplimentsByUserSenderService(fakeComplimentsRepositories);
  });

  it('should be able to list the compliment by User Sender', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});
    
    const complimentsListed = await ListComplimentsByUserSender.execute(userSender.id);

    expect(complimentsListed.length).toBe(1);
    expect(complimentsListed[0].id).toBe(compliment.id);
  });
});