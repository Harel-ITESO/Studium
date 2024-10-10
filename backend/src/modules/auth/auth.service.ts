import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePasswords } from 'src/utils/hash.util';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './model/jwt-payload';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * Logs in a user
   * @param email Email of the provided user
   * @param password Password sent
   * @returns JWT authentication token
   */
  public async logIn(email: string, password: string) {
    const user = await this.usersService.getUserWhere({ email });
    if (!user) throw new Error('Password not matching');
    const isPassword = await comparePasswords(password, user.password);
    if (!isPassword) throw new Error('Password not matching');
    const payload = new JwtPayload(user);

    const token = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: this.configService.get<string>('JWT_SECRET') || 'unsafe',
      },
    );
    return token;
  }

  /**
   * Registers a new user
   * @param userData Data for the user creation
   * @returns True if the user was created
   */
  public async register(userData: CreateUserDto) {
    await this.usersService.createUser(userData);
    return true;
  }

  /**
   * Finds or creates a user based on Google profile
   * @param profile The Google profile returned after authentication
   * @returns JWT token for the authenticated user
   */
  public async findOrCreateGoogleUser(profile: any): Promise<string> {
    const { email, given_name: firstName, family_name: lastName, sub: googleId } = profile;

    // Busca si el usuario ya existe en la base de datos usando el email
    let user = await this.usersService.getUserWhere({ email });

    // Si no existe el usuario, crea uno nuevo
    if (!user) {
      const createUserDto: CreateUserDto = {
        email,
        firstName,
        lastName,
        googleId, // Guarda el Google ID si lo necesitas
        password: null, // Si usas Google Auth, puedes dejar la contraseña como null o vacía
      };

      user = await this.usersService.createUser(createUserDto);
    }

    // Genera un token JWT para el usuario autenticado
    const payload = new JwtPayload(user);

    const token = await this.jwtService.signAsync(
      { ...payload },
      {
        secret: this.configService.get<string>('JWT_SECRET') || 'unsafe',
      },
    );

    return token; // Devuelve el token JWT generado
  }
}
