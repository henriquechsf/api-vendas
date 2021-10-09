import { container } from 'tsyringe';

import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from '@modules/customers/infra/typeorm/repositories/CustomersRepository';

// mantém uma única instancia a cada ciclo de vida
container.registerSingleton<ICustomersRepository>(
  'CustomersRepository',
  CustomersRepository,
);
