import { getCustomRepository } from 'typeorm';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import { injectable, inject } from 'tsyringe';
import { ICustomerPaginate } from '../domain/models/ICustomerPaginate';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute(): Promise<ICustomerPaginate> {
    const customers = await this.customersRepository.findAllPaginate();

    return customers;
  }
}

export default ListCustomerService;
