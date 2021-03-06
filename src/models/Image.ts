import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import PetHome from "./PetHome";

@Entity("images")
export default class Image {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  public_id: string;

  @Column()
  url: string;

  @ManyToOne(() => PetHome, (petHome) => petHome.images)
  @JoinColumn({ name: "pet_home_id" })
  petHome: PetHome;
} 
