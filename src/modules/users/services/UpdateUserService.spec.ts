import 'reflect-metadata';
import UpdateUserService from './UpdateUserService';
import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';

let fakeUsersRepository: FakeUsersRepository;
let updateUser: UpdateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    updateUser = new UpdateUserService(fakeUsersRepository);
  });

  it('should not be able to update the user', async () => {
    await expect(
      updateUser.execute({
        user_id: '',
        name: 'william',
        age: 10,
        city: 'Ubá',
        cpfUser: '166.993.130-70',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to edit a user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await updateUser.execute({
      user_id: user.id,
      name: 'Gabriel',
      age: 10,
      city: 'Ubá',
      cpfUser: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    expect(user.name).toBe('Gabriel');
  });

  it('should not be able to update the user because the cpf is not valid', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Gabriel',
        age: 10,
        city: 'Ubá',
        cpfUser: '321213',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user because the age is negative', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Gabriel',
        age: -1,
        city: 'Ubá',
        cpfUser: '168.471.060-00',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user because the city does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Gabriel',
        age: 10,
        city: 'cidadeErrada',
        cpfUser: '168.471.060-00',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user because the state does not exist', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });
    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Gabriel',
        age: 10,
        city: 'Ubá',
        cpfUser: '168.471.060-00',
        marital_status: 'Solteiro',
        state: 'estadoErrado',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the user because the cpf already exists', async () => {
    const user = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '166.993.130-70',
      marital_status: 'Solteiro',
      state: 'MG',
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user2 = await fakeUsersRepository.create({
      name: 'william',
      age: 10,
      city: 'Ubá',
      cpf: '944.717.330-60',
      marital_status: 'Solteiro',
      state: 'MG',
    });

    await expect(
      updateUser.execute({
        user_id: user.id,
        name: 'Gabriel',
        age: 10,
        city: 'Ubá',
        cpfUser: '944.717.330-60',
        marital_status: 'Solteiro',
        state: 'MG',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
