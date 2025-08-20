import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Sse,
} from '@nestjs/common';
import { Observable, interval, map, switchMap, startWith } from 'rxjs';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';

interface QuestionEvent {
  data: Question[];
  id: string;
  type: 'questions-update';
}

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get(':sessionId')
  findAll(@Param('sessionId') sessionId: string) {
    return this.questionsService.findAll(sessionId);
  }

  @Sse(':sessionId/events')
  questionsStream(
    @Param('sessionId') sessionId: string,
  ): Observable<QuestionEvent> {
    return interval(2000).pipe(
      // Poll every 2 seconds
      startWith(0), // Emit immediately when client connects
      switchMap(() => this.questionsService.findAll(sessionId)),
      map((questions) => ({
        data: questions,
        id: Date.now().toString(),
        type: 'questions-update',
      })),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
