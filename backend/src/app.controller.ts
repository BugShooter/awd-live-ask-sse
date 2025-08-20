import { Controller, Get, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Session } from './entities/session.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getAllSessions(): Promise<Session[]> {
    return await this.appService.getAllSessions();
  }

  @Get(':id')
  async getSession(@Param('id') id: string): Promise<Session | null> {
    return await this.appService.getSession(id);
  }

  @Post()
  async createSession(@Body() session: Partial<Session>): Promise<Session | null> {
    return await this.appService.createSession(session);
  }

  @Put(':id')
  async updateSession(
    @Param('id') id: string,
    @Body() session: Partial<Session>,
  ): Promise<Session | null> {
    return await this.appService.updateSession(id, session);
  }

  @Delete(':id')
  async deleteSession(@Param('id') id: string): Promise<Session | null> {
    return await this.appService.deleteSession(id);
  }
}
