import { FakeTagsRepositories } from '@modules/tags/repositories/fakes/FakeTagsRepositories'
import { ListTagByIDService } from "./ListTagByIDService";

let fakeTagsRepositories: FakeTagsRepositories;
let listTagByID: ListTagByIDService;

describe('ListTagByID', () => {
  beforeEach(() => {
    fakeTagsRepositories = new FakeTagsRepositories();
    listTagByID = new ListTagByIDService(fakeTagsRepositories);
  });

  it('should be able to list a tag', async () =>{
    const tag = await fakeTagsRepositories.create({
      name: "Tag test",
    });

    const listedTag = await listTagByID.execute(tag.id);

    expect(tag.id).toBe(listedTag.id);
  });

  it('should not be able to list a non-existant tag', async () =>{
    expect(listTagByID.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});