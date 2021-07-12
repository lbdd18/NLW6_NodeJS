import { FakeTagsRepositories } from '@modules/tags/repositories/fakes/FakeTagsRepositories'
import { DeleteTagService } from "./DeleteTagService";

let fakeTagsRepositories: FakeTagsRepositories;
let deleteTag: DeleteTagService;

describe('DeleteTag', () => {
  beforeEach(() => {
    fakeTagsRepositories = new FakeTagsRepositories();
    deleteTag = new DeleteTagService(fakeTagsRepositories);
  });

  it('should be able to delete a existing tag', async () =>{
    const tag = await fakeTagsRepositories.create({
      name: "Tag test",
    });

    const id = await deleteTag.execute(tag.id);

    expect(tag.id).toBe(id);
  });

  it('should not be able to delete a non-existant tag', async () =>{
    expect(deleteTag.execute("invalid-id")).rejects.toBeInstanceOf(Error);
  });
});