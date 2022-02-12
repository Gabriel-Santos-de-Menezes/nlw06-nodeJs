import { getCustomRepository } from 'typeorm';
import { TagsRepository } from '../repositories/TagsRepositories';


class CreateTagService{

  async execute(name: string){
    const tagsRepositories = getCustomRepository(TagsRepository)
    // Se jnão vier o nome
    if(!name){
      throw new Error("Incorrect name!");
    }
    
    const tagAlreadyExist = await tagsRepositories.findOne({
      name
    })
    
    // Se já existir aplicar error
    if(tagAlreadyExist){
      throw new Error("tag already exist");
    }

    // Se não der erro, então cria-se a tag
    const tag = tagsRepositories.create({
      name,
    })

    await tagsRepositories.save(tag);

    return tag;
  }

}

export { CreateTagService };