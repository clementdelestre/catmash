import { IsDate, IsDateString, IsOptional } from "class-validator";

export class FiltersDto {
    @IsDateString()
    @IsOptional()
    readonly startAt?: Date
  
    @IsDateString()
    @IsOptional()
    readonly endAt?: Date
  }