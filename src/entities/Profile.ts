import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import User from "./User";
@Entity()
export class Profile {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column()
  about: string;

  @Column()
  profileImgUrl: string;

  @Column()
  coverImgUrl: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;

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

export default Profile;
