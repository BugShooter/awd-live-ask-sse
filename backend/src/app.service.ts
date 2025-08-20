import { Injectable, NotFoundException } from '@nestjs/common';
import { Session } from './entities/session.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  async createSession(session: Partial<Session>): Promise<Session> {
    const newSession = this.sessionRepository.create(session);
    return this.sessionRepository.save(newSession);
  }

  async getSession(id: string): Promise<Session | null> {
    return this.sessionRepository.findOneBy({ id });
  }

  async getAllSessions(): Promise<Session[]> {
    return this.sessionRepository.find();
  }

  async updateSession(
    id: string,
    session: Partial<Session>,
  ): Promise<Session | null> {
    const result = await this.sessionRepository.update(id, session);
    if (result.affected === 0) {
      throw new NotFoundException(`Could not find session with id: ${id}`);
    }
    return this.sessionRepository.findOne({ where: { id } });
  }

  async deleteSession(id: string): Promise<boolean> {
    const result = await this.sessionRepository.delete({ id });
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Could not find session with id: ${id}`);
    // }
    return result.affected === 0 ? false : true;
  }
}
