import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../repositories/UserRepositories";
import { hash } from "bcryptjs";
interface IUserRequest{
  name: string;
  password: string;
  email: string;
  admin?: boolean;
}
class CreateUserService{
  async execute({name, password, email, admin}: IUserRequest){
    const usersRepository = getCustomRepository(UserRepositories);

    if(!email){
      throw new Error("Email incorrect");
    }

    const usersAlreadyExists = await usersRepository.findOne({
      email
    })

    if(usersAlreadyExists){
      throw new Error("User already exist");
    }

    const passwordHash = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash,
    })

    await usersRepository.save(user);

    return user;
  }
}

export { CreateUserService };