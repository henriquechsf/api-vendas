import { Request, Response } from 'express';
import CreateCustomersService from '../../../services/CreateCustomersService';
import DeleteCustomersService from '../../../services/DeleteCustomersService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import { container } from 'tsyringe'; // lib injeção de dependencia

class CustomersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomerService);

    const customers = await listCustomers.execute();

    return response.json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomer = container.resolve(CreateCustomersService);

    const customer = await createCustomer.execute({
      name,
      email,
    });

    return response.json(customer);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;
    const { id } = request.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCustomer = container.resolve(DeleteCustomersService);

    await deleteCustomer.execute({ id });

    return response.json([]);
  }
}

export default CustomersController;
