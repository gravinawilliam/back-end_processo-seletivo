import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

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
}
