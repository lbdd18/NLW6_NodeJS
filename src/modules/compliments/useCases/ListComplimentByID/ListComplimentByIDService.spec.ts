import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories';

import { ListComplimentByIDService } from "./ListComplimentByIDService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let listComplimentByID: ListComplimentByIDService;

describe('ListComplimentByID', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    listComplimentByID = new ListComplimentByIDService(fakeComplimentsRepositories);
  });

  it('should be able to list compliment by ID', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});
    
    const complimentListed = await listComplimentByID.execute(compliment.id);

    expect(complimentListed.id).toBe(compliment.id);
  });

  it('should not be able to list compliment for a non-existant ID', async () =>{
    expect(listComplimentByID.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});