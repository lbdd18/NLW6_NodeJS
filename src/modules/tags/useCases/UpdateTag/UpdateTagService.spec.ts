import { FakeTagsRepositories } from '@modules/tags/repositories/fakes/FakeTagsRepositories'
import { UpdateTagService } from "./UpdateTagService";

let fakeTagsRepositories: FakeTagsRepositories;
let updateTag: UpdateTagService;

describe('UpdateTag', () => {
  beforeEach(() => {
    fakeTagsRepositories = new FakeTagsRepositories();
    updateTag = new UpdateTagService(fakeTagsRepositories);
  });

  it('should be able to update a tag', async () =>{
    const tag = await fakeTagsRepositories.create({
      name: "Tag test",
    });

    const updatedTag = await updateTag.execute({id: tag.id, name: "Tag test updated"});

    expect(updatedTag.name).toBe("Tag test updated");
  });

  it('should not be able to update a non-existant tag', async () =>{
    expect(updateTag.execute({id: "invalid-id", name:"invalid-name"})).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to update a tag name invalid', async () =>{
    const tag = await fakeTagsRepositories.create({
      name: "Tag test",
    });

    expect(updateTag.execute({id: tag.id, name:""})).rejects.toBeInstanceOf(Error);
  });
});