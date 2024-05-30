import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from "typeorm";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import Profile from "./Profile";
import { Friend } from "./Friend";
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  isVerified: boolean;

  @Column()
  password: string;

  @Column()
  otp: number;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany(() => Friend, (friend) => friend.user1)
  friends1: Friend[];

  @OneToMany(() => Friend, (friend) => friend.user2)
  friends2: Friend[];

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

export default User;
