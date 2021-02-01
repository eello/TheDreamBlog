import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Admins {
  @PrimaryColumn()
  id: string;

  @PrimaryColumn()
  username: string;

  @Column({ nullable: false })
  node_id: string;

  @Column({ nullable: false })
  display_name: string;

  @Column({ nullable: false })
  profile_url: string;
}
