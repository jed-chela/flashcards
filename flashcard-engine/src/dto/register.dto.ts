import { IsNotEmpty } from "class-validator";

export class RegisterDto {

    @IsNotEmpty()
    firstname: string;

    @IsNotEmpty()
    lastname: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

  }