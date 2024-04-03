import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import User from "./User";
import PostLikes from "./PostLikes";
@Entity()
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @OneToMany(() => PostLikes, (postLikes) => postLikes.id)
  postLikes: PostLikes[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updated_at: Date;
}

export default Post;
