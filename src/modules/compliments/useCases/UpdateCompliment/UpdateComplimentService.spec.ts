import { FakeComplimentsRepositories } from '@modules/compliments/repositories/fakes/FakeComplimentsRepositories'
import { FakeUsersRepositories } from '@modules/users/repositories/fakes/FakeUsersRepositories';
import { UpdateComplimentService } from "./UpdateComplimentService";

let fakeComplimentsRepositories: FakeComplimentsRepositories;
let fakeUsersRepositories: FakeUsersRepositories;
let updateCompliment: UpdateComplimentService;

describe('UpdateCompliment', () => {
  beforeEach(() => {
    fakeComplimentsRepositories = new FakeComplimentsRepositories();
    fakeUsersRepositories = new FakeUsersRepositories();
    updateCompliment = new UpdateComplimentService(fakeComplimentsRepositories, fakeUsersRepositories);
  });

  it('should be able to update a existant compliment', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});

    const complimentUpdated = await updateCompliment.execute(
      {id: compliment.id, tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment Updated"});
    
    expect(complimentUpdated.message).toBe('Test Compliment Updated');
  });

  it('should not be able to update a non-existant compliment', async () =>{
    expect(updateCompliment.execute(
      {id: "invalid-id", tag_id: "", user_receiver: "invalid-id", user_sender: "invalid-id", message: "Test Compliment"})).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a compliment with same user', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});

    expect(updateCompliment.execute(
      {id: compliment.id, tag_id: "", user_receiver: userSender.id, user_sender: userSender.id, message: "Test Compliment"})).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a compliment for a non-existant user', async () =>{
    const userSender = await fakeUsersRepositories.create(
      {name: "UserSender", email: "usersender@email.com", admin: false, password: "password"});
    const userReceiver = await fakeUsersRepositories.create(
        {name: "userReceiver", email: "userreceiver@email.com", admin: false, password: "password"});

    const compliment = await fakeComplimentsRepositories.create(
      {tag_id: "", user_receiver: userReceiver.id, user_sender: userSender.id, message: "Test Compliment"});

    expect(updateCompliment.execute(
      {id: compliment.id, tag_id: "", user_receiver: "invalid-id", user_sender: userSender.id, message: "Test Compliment"})).rejects.toBeInstanceOf(Error);
  });
});