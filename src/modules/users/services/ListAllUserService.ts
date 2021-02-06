import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../interfaces/IUsersRepository';

@injectable()
export default class ListAllUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers();
    return users;
  }
}
