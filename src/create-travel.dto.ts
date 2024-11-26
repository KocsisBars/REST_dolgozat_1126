import { IsIn, IsInt, IsNotEmpty, IsString, IsUrl, Max, Min, MinLength, isString } from "class-validator";

export class CreateTravelDto {
  @IsString()
  @IsNotEmpty({message: 'Az úticélt kötelező megadni'})
  destination: string;

  @IsString()
  @MinLength(30)
  description: string;

  @IsUrl()
  imgUrl: string;

  @IsInt()
  price: number;

  @Min(0)
  @Max(50)
  discount: number;
}
