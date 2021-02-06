import 'reflect-metadata';

import AppError from '../../../shared/errors/AppError';
import FakeUsersRepository from '../infra/typeorm/repositories/fakes/FakeUsersRepository';
import DeleteUserService from './DeleteUserService';

let fakeUsersRepository: FakeUsersRepository;
let deleteUser: DeleteUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    deleteUser = new DeleteUserService(fakeUsersRepository);
  });

  it('should not be able to update the user because the state does not exist', async () => {
    await expect(
      deleteUser.execute({
        user_id: 'id_errado',
      })
    ).rejects.toBeInstanceOf(AppError);
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
    const userDeleted = await deleteUser.execute({
      user_id: user.id,
    });

    expect(userDeleted).toEqual(user);
  });
});
