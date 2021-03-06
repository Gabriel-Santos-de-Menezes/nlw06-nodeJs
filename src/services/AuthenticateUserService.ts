import { getCustomRepository } from 'typeorm';
import { UserRepositories } from '../repositories/UserRepositories';
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
 
interface IAuthenticateRequest{
  email: string;
  password: string;
}

class AuthenticateService{

  async execute({email, password}: IAuthenticateRequest){
    const userRepositories = getCustomRepository(UserRepositories);

    const user = await userRepositories.findOne({
      email,
    });

    if(!user){
      throw new Error("Email/Password incorrect");  
    }
    
    const passwordMatch = await compare(password, user.password);
    
    if(!passwordMatch){
      throw new Error("Email/Password incorrect");  
    };

    const token = sign({
      email: user.email
    }, "7bd05ff9da31d4486954f749fa74e870", {
      subject: user.id,
      expiresIn: "1d"
    });

    return token;

  }
}

export { AuthenticateService };