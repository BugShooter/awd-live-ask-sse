import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [QuestionsController],
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
