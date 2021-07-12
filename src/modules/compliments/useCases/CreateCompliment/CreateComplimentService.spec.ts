import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories';
import { CreateComplimentService } from "./CreateComplimentService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let createCompliment: CreateComplimentService;

describe('CreateCompliment', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    createCompliment = new CreateComplimentService(fakeComplimentsRepositories, fakeUsersRepositories);
  });

  it('should be able to create a new compliment', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await createCompliment.execute(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});
    
    expect(compliment).toHaveProperty('id');
    expect(compliment.message).toBe('Test Compliment');
  });

  it('should not be able to create a compliment with same user', async () =>{
    const user = await fakeUsersRepositories.create(
      {name: "user", email: "user@email.com", admin: false, password: "password"});

    expect(createCompliment.execute(
      {tag_id: "", user_receiver: user.id, user_sender: user.id, message: "Test Compliment"})).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a compliment for a non-existant user', async () =>{
    const user = await fakeUsersRepositories.create(
      {name: "user", email: "user@email.com", admin: false, password: "password"});

    expect(createCompliment.execute(
      {tag_id: "", user_receiver: "invalidID", user_sender: user.id, message: "Test Compliment"})).rejects.toBeInstanceOf(Error);
  });
});