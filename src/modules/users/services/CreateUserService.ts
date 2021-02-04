import { inject, injectable } from 'tsyringe';
import { cpf } from 'cpf-cnpj-validator';
import { states } from 'estados-cidades';
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../interfaces/IUsersRepository';

interface IRequestDTO {
  name: string;
  age: number;
  marital_status: string;
  cpfUser: string;
  city: string;
  state: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({
    name,
    age,
    marital_status,
    cpfUser,
    city,
    state,
  }: IRequestDTO): Promise<User> {
    const checkCpfIsValid = cpf.isValid(cpfUser);
    if (!checkCpfIsValid || cpfUser.length !== 14) {
      throw new AppError('CPF não é valido');
    }

    const checkCpfExists = await this.usersRepository.findByCpf(cpfUser);
    if (checkCpfExists) {
      throw new AppError('CPF já existe');
    }

    if (age < 0) {
      throw new AppError('Idade negativa');
    }

    const statesBr = states();
    let stateExist = false;
    statesBr.forEach(stateBr => {
      if (stateBr === state) {
        stateExist = true;
      }
    });
    if (!stateExist) {
      throw new AppError('Esse estado não existe');
    }

    const user = await this.usersRepository.create({
      name,
      age,
      marital_status,
      cpf: cpfUser,
      city,
      state,
    });

    return user;
  }
}
