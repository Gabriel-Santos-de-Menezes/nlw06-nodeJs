import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("Users")// É uma tabela chamada Users
class User {

  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;
  
  @Column()
  password: string;
  
  @Column()
  email: string;
  
  @Column()
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor(){
    // Verificando se o id está ou não preenchidp para cria-lo ou não
    if(!this.id){
      this.id = uuid();
    }
  }
}

export { User };

// Entidade < - > ORM < -> BD