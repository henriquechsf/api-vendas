import { Secret, sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { ICreateSession } from '../domain/models/ICreateSession';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';

@injectable()
class CreateSessionsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: ICreateSession): Promise<IUserAuthenticated> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Invalid user/password.');
    }

    const passwordConfirmed = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordConfirmed) {
      throw new AppError('Invalid user/password.');
    }

    // hash md5
    const token = sign({}, authConfig.jwt.secret as Secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
