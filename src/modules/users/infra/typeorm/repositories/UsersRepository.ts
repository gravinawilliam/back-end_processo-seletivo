import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';
import IUserRepository from '../../../interfaces/IUsersRepository';
import ICreateUserDTO from '../../../dtos/ICreateUserDTO';

export default class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async delete(user: User): Promise<User> {
    const userDelete = await this.ormRepository.remove(user);
    return userDelete;
  }

  public async findAllUsers(): Promise<User[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { cpf } });
    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
