import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";
import Image from "./Image";

@Entity("pet_homes")
export default class PetHome {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  instructions: string;

  @Column()
  opening_hours: string;

  @Column()
  open_on_weekends: boolean;

  @Column()
  is_accepted: boolean;

  @Column()
  whatsapp: string;

  @OneToMany(() => Image, (image) => image.petHome, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({ name: "pet_home_id" })
  images: Image[];
}
