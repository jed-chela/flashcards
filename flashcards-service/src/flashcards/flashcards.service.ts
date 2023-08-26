import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Flashcard } from './flashcards.model';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel('Flashcard') private flashcardModel: Model<Flashcard>,
  ) {}

  async createFlashcard(
    question: string,
    answer: string,
    createdBy: string,
  ): Promise<Flashcard> {
    const flashcard = new this.flashcardModel({ question, answer, createdBy });
    return flashcard.save();
  }

  async getAllFlashcards(): Promise<Flashcard[]> {
    return this.flashcardModel.find().exec();
  }

  async getFlashcardById(id: string): Promise<Flashcard> {
    const flashcard = await this.flashcardModel.findById(id).exec();
    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }
    return flashcard;
  }

  async getFlashcardsByCreatedBy(createdBy: string): Promise<Flashcard[]> {
    const query = {
      createdBy: createdBy,
    };
    
    const flashcard = await this.flashcardModel.find(query).exec();
    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }
    return flashcard;
  }

  async updateFlashcard(
    id: string,
    question: string,
    answer: string,
  ): Promise<Flashcard> {
    const flashcard = await this.flashcardModel.findByIdAndUpdate(
      id,
      {  question, answer  },
      { new: true }
    ).exec();
  
    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }
  
    return flashcard;
  }

  async deleteFlashcard(id: string): Promise<Flashcard> {
    const flashcard = await this.flashcardModel.findByIdAndDelete(id).exec();
  
    if (!flashcard) {
      throw new NotFoundException('Flashcard not found');
    }
  
    return flashcard;
  }

}


