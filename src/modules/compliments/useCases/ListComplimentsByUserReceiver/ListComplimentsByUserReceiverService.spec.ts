import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories';

import { ListComplimentsByUserReceiverService } from "./ListComplimentsByUserReceiverService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let ListComplimentsByUserReceiver: ListComplimentsByUserReceiverService;

describe('ListComplimentsByUserReceiver', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    ListComplimentsByUserReceiver = new ListComplimentsByUserReceiverService(fakeComplimentsRepositories);
  });

  it('should be able to list the compliment by User Receiver', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});
    
    const complimentsListed = await ListComplimentsByUserReceiver.execute(userReceiver.id);

    expect(complimentsListed.length).toBe(1);
    expect(complimentsListed[0].id).toBe(compliment.id);
  });
});