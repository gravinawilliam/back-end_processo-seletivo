import 'reflect-metadata';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import ListAllUserService from './ListAllUserService';

let fakeUsersRepository: FakeUsersRepository;
let listAllUserService: ListAllUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listAllUserService = new ListAllUserService(fakeUsersRepository);
  });

  it('should be able to create a new user', async () => {
    const user1 = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'uba',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    const user2 = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'uba',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    const user3 = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'uba',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });

    const users = await listAllUserService.execute();

    expect(users).toEqual([user1, user2, user3]);
  });
});
