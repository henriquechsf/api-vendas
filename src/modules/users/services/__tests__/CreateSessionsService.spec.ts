import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FaketHashProvider';
import CreateSessionsService from '../CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let hashProvider: FakeHashProvider;
let createSession: CreateSessionsService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@email.com',
      password: '123456',
    });

    const response = await createSession.execute({
      email: 'jondoe@email.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    expect(
      createSession.execute({
        email: 'jondoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Jon Doe',
      email: 'jondoe@email.com',
      password: '123456',
    });

    expect(
      createSession.execute({
        email: 'jondoe@email.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
