import { Column, PrimaryGeneratedColumn, Entity, AfterInsert, AfterRemove, AfterUpdate } from "typeorm";

@Entity()
export class Note {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  userId: number;

  @AfterInsert()
  logInsert() {
    console.log('Inserted note with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed note with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated note with id', this.id);
  }
}
