import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
  } from "typeorm";
  
  @Entity("users")
  export default class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;
  
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    password_reset_token: string;

    @Column()
    password_reset_expires: number;
  }
  