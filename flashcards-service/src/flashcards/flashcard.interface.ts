import { Document } from 'mongoose';

export interface Flashcard extends Document {
  question: string;
  answer: string;
  createdBy: string;
}
