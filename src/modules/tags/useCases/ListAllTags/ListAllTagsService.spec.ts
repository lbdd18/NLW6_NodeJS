import { FakeTagsRepositories } from '@modules/tags/repositories/fakes/FakeTagsRepositories'
import { ListAllTagsService } from "./ListAllTagsService";

let fakeTagsRepositories: FakeTagsRepositories;
let listAllTags: ListAllTagsService;

describe('ListAllTags', () => {
  beforeEach(() => {
    fakeTagsRepositories = new FakeTagsRepositories();
    listAllTags = new ListAllTagsService(fakeTagsRepositories);
  });

  it('should be able to list all tags', async () =>{
    const tag = await fakeTagsRepositories.create({
      name: "Tag test",
    });

    const tags = await listAllTags.execute();

    expect(tags.length).toBe(1);
  });
});