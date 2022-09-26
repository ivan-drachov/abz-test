import { IsNotEmpty, IsString, IsEmail, Length, Matches} from 'class-validator';

export class AuthDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  public email: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 20, { message: 'Passowrd has to be at between 3 and 20 chars' })
  public password: string;

  @IsNotEmpty()
  @IsString()
  @Matches('^[\+]{0,1}380([0-9]{9})$')
  public phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 60, { message: 'Name has to be at between 2 and 60 chars' })
  public name: string;

  @IsNotEmpty()
  public position_id: number;
}
