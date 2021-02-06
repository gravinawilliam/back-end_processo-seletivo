import { uuid } from 'uuidv4';
import AppError from '../../../../../../shared/errors/AppError';
import ICreateUserDTO from '../../../../dtos/ICreateUserDTO';
import User from '../../entities/User';
import IUserRepository from '../../../../interfaces/IUsersRepository';

export default class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findAllUsers(): Promise<User[]> {
    let { users } = this;
    users = this.users;
    return users;
  }

  // TODO: Tenho que arrumar esse delete
  public async delete(user: User): Promise<User> {
    const pegaUser = this.users.find(usuario => usuario.id === user.id);
    if (!pegaUser) {
      throw new AppError('Usuário não existe');
    }
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users.splice(findIndex, 1);
    return pegaUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  public async findByCpf(cpf: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.cpf === cpf);
    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid() }, userData);
    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}
