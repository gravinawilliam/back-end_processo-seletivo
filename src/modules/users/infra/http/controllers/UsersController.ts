import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';
import ListAllUserService from '../../../services/ListAllUserService';
import UpdateUserService from '../../../services/UpdateUserService';
import DeleteUserService from '../../../services/DeleteUserService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { name, age, marital_status, cpf, city, state } = req.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({
      name,
      age,
      marital_status,
      cpfUser: cpf,
      city,
      state,
    });
    return res.json(user);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const listAllUser = container.resolve(ListAllUserService);
    const user = await listAllUser.execute();
    return res.json(user);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;
    const deleteUser = container.resolve(DeleteUserService);
    const user = await deleteUser.execute({
      user_id,
    });
    return res.json(user);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { user_id, name, age, marital_status, cpf, city, state } = req.body;
    const updateUser = container.resolve(UpdateUserService);
    const user = await updateUser.execute({
      user_id,
      name,
      age,
      marital_status,
      cpfUser: cpf,
      city,
      state,
    });
    return res.json(user);
  }
}
