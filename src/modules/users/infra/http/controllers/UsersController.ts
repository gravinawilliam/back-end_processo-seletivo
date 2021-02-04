import { Request, Response } from 'express';
import CreateUserService from 'src/modules/users/services/CreateUserService';
import ListAllUserService from 'src/modules/users/services/ListAllUserService';
import { container } from 'tsyringe';

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
}
