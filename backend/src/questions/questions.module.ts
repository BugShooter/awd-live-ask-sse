import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { Question } from './entities/question.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SseService } from './sse/sse.service';

@Module({
  controllers: [QuestionsController],
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsService, SseService],
  exports: [QuestionsService],
})
export class QuestionsModule {}
