import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Session } from '../../entities/session.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 200 })
  title: string;

  @Column({ default: 0 })
  likes: number;

  @ManyToOne(() => Session, (session) => session.questions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sessionId' })
  session: Session;

  @Column()
  sessionId: string;

  @Column({ default: false })
  answered: boolean;

  @CreateDateColumn({ type: 'datetime' })
  createdAt: Date;
}
