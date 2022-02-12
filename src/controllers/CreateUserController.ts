import { Request, Response } from "express";
import { CreateUserService } from "../services/UserCreateUserService";

class CreateUserController{
  async handle(request: Request, response: Response){
    console.log("Request: ", request.body);
    const { name, password, email, admin } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({name, password, email, admin});

    return response.json(user);
  }
}

export { CreateUserController };
