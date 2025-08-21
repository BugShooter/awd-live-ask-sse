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
import { Observable, Subject } from 'rxjs';
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
  private subject: Subject<MessageEvent>;

  constructor(private readonly questionsService: QuestionsService) {
    this.subject = new Subject<MessageEvent>();
  }

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
  ): Observable<MessageEvent> {
    const messageEvent = new MessageEvent('message', {
      data: `data: ${sessionId}\n\n`,
    });
    this.subject.next(messageEvent);

    return this.subject.asObservable();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    const updatedQuestion = await this.questionsService.update(id, updateQuestionDto);
    const messageEvent = new MessageEvent('questions-update', {
      data: [updatedQuestion],
      // id: Date.now().toString(),
      // type: 'questions-update',
    });
    this.subject.next(messageEvent);
    return updatedQuestion;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
