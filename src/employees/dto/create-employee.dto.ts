import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  role!: string;

  @IsNotEmpty()
  @IsNumber()
  salary!: number;

  @IsOptional()
  @IsNumber()
  userId?: number;
}
