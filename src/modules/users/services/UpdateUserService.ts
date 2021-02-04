import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../interfaces/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  name: string;
  age: number;
  marital_status: string;
  cpfUser: string;
  city: string;
  state: string;
}

@injectable()
export default class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    user_id,
    name,
    age,
    marital_status,
    cpfUser,
    city,
    state,
  }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Usuário não existe');
    }

    const checkCpfIsValid = cpf.isValid(cpfUser);
    if (!checkCpfIsValid || cpfUser.length !== 14) {
      throw new AppError('CPF não é valido');
    }

    const userWithUpdatedCpf = await this.usersRepository.findByCpf(cpfUser);
    if (userWithUpdatedCpf && userWithUpdatedCpf.id !== user.id) {
      throw new AppError('CPF já existe');
    }

    const ageIsNegative = age < 0;
    if (ageIsNegative) {
      throw new AppError('Idade negativa');
    }

    user.name = name;
    user.age = age;
    user.marital_status = marital_status;
    user.cpf = cpfUser;
    user.city = city;
    user.state = state;

    return this.usersRepository.save(user);
  }
}
