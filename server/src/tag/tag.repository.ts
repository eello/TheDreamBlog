import { EntityRepository, Repository } from 'typeorm';
import { Tag } from './tag.entity';

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
  insertBulk(tags: Tag[]) {
    this.createQueryBuilder().insert().into(Tag).values(tags).execute();
  }
}
