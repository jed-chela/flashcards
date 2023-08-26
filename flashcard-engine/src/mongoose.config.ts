import { MongooseModuleOptions } from '@nestjs/mongoose';

export const mongooseConfig: MongooseModuleOptions = {
  uri: 'mongodb://localhost/flashcard-engine',
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
};
