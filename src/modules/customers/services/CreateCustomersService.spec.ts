import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeCustomersRepository from '../domain/repositories/fakes/FakeCustomersRepository';
import CreateCustomersService from './CreateCustomersService';

describe('CreateCustomer', () => {
  it('should be able to create a new customer', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomersService(fakeCustomersRepository);

    const customer = await createCustomer.execute({
      name: 'Jon Doe',
      email: 'jondoe@email.com',
    });

    expect(customer).toHaveProperty('id');
  });

  it('should not be able to create two customers with the same email', async () => {
    const fakeCustomersRepository = new FakeCustomersRepository();
    const createCustomer = new CreateCustomersService(fakeCustomersRepository);

    await createCustomer.execute({
      name: 'Jon Doe',
      email: 'jondoe@email.com',
    });

    expect(
      createCustomer.execute({
        name: 'Jon Doe',
        email: 'jondoe@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
