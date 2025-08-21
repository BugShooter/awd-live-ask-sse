import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from '../questions/entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) { }

  async create(createQuestionDto: CreateQuestionDto) {
    const newQuestion = this.questionRepository.create(createQuestionDto);
    return this.questionRepository.save(newQuestion);
  }

  async findAll(sessionId: string): Promise<Question[]> {
    return await this.questionRepository.find({
      where: { session: { id: sessionId } },
    });
  }

  async findOne(id: string): Promise<Question | null> {
    return this.questionRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question | null> {
    const question = await this.questionRepository.findOneBy({ id });
    if (!question) {
      throw new NotFoundException(`Could not find question with id: ${id}`);
    }

    await this.questionRepository.increment({ id }, 'likes', 1);

    return this.questionRepository.findOneBy({ id });
  }

  async remove(id: string) {
    return this.questionRepository.delete({ id });
  }
}
