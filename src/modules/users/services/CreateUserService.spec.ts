import 'reflect-metadata';
import AppError from '../../../shared/errors/AppError';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpfUser: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    expect(user).toHaveProperty('id');
  });

  it('must not be able to create a new user with the same CPF as another registered user', async () => {
    await createUser.execute({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpfUser: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await expect(
      createUser.execute({
        name: 'william',
        age: -1,
        city: 'Ubá',
        cpfUser: '166.993.130-70',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user at the negative age', async () => {
    await expect(
      createUser.execute({
        name: 'william',
        age: -1,
        city: 'Ubá',
        cpfUser: '166.993.130-70',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with the invalid cpf', async () => {
    await expect(
      createUser.execute({
        name: 'william',
        age: 10,
        city: 'Ubá',
        cpfUser: '16699313070',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new user with an invalid Brazilian state', async () => {
    await expect(
      createUser.execute({
        name: 'william',
        age: 1,
        city: 'Ubá',
        cpfUser: '166.993.130-70',
        marital_status: 'Solteiro',
        state: 'estadoErrado',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to create a new user with an invalid Brazilian city', async () => {
    await expect(
      createUser.execute({
        name: 'william',
        age: 1,
        city: 'cidadeErrada',
        cpfUser: '166.993.130-70',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
