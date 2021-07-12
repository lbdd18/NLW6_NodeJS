import { FakeTagsRepositories } from '@modules/tags/repositories/fakes/FakeTagsRepositories'
import { CreateTagService } from "./CreateTagService";

let fakeTagsRepositories: FakeTagsRepositories;
let createTag: CreateTagService;

describe('CreateTag', () => {
  beforeEach(() => {
    fakeTagsRepositories = new FakeTagsRepositories();
    createTag = new CreateTagService(fakeTagsRepositories);
  });

  it('should be able to create a new tag', async () =>{
    const tag = await createTag.execute({name: "Test Tag"});
    expect(tag).toHaveProperty('id');
    expect(tag.name).toBe('Test Tag');
  });

  it('should not be able to create a new tag without name', async () =>{
    expect(createTag.execute({name: ""})).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create two tags with the same name', async () =>{
    const tag = await createTag.execute({name: "Test Tag"});
    expect(createTag.execute({name: "Test Tag"})).rejects.toBeInstanceOf(Error);
  });
});