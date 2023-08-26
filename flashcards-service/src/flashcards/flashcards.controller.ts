import { Controller, Post, Body, UseGuards, Get, Param, Patch, Delete, Query } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { AuthGuard } from './flashcards.guard';


@Controller('flashcards')
export class FlashcardsController {
  constructor(private flashcardsService: FlashcardsService) {}

  @Post()
  @UseGuards(AuthGuard)
  async create(
    @Body('question') question: string,
    @Body('answer') answer: string,
    @Body('createdBy') createdBy: string,
  ) {
    return this.flashcardsService.createFlashcard(question, answer, createdBy);
  }

  @Get()
  async all() {
    return this.flashcardsService.getAllFlashcards();
  }

  @Get('share/')
  @UseGuards(AuthGuard)
  async generateShareLink(@Query('id') id: string) {
    const flashcards = await this.flashcardsService.getFlashcardsByCreatedBy(id);
    return { flashcards };
  }

  @Get(':id')
  async getFlashcardById(@Param('id') id: string) {
    return this.flashcardsService.getFlashcardById(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async update(
    @Param('id') id: string,
    @Body('question') question: string,
    @Body('answer') answer: string,
  ) {
    return this.flashcardsService.updateFlashcard(id, question, answer);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async delete(@Param('id') id: string) {
    return this.flashcardsService.deleteFlashcard(id);
  }
  
  

}