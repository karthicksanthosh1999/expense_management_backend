import { UserRepository } from "../interfaces/UserRepository";
import { AppError } from "../middlewares/errors/appError";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

export class AuthService {
  constructor(private userRepo: UserRepository) {}

  async login(email: string, password: string) {
    const validUser = await this.userRepo.findByEmail(email);
    if (!validUser) {
      throw new AppError("Invalid User", 401, false);
    }
    const isValidPassword = await bcrypt.compare(password, validUser.password);
    if (!isValidPassword) {
      throw new AppError("Invalid password", 401, false);
    }

    const accessToken = generateAccessToken(validUser);
    const refreshToken = generateRefreshToken(validUser);

    return {
      accessToken,
      refreshToken,
      user: validUser,
    };
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401);
    }

    const payload = verifyRefreshToken(refreshToken);

    const user = await this.userRepo.findById(payload.id);

    if (!user) {
      throw new AppError("User Not Found", 404, false);
    }

    const newRefreshToken = generateAccessToken(user);

    return { accessToken: newRefreshToken };
  }

  async logout(userId: string) {
    await this.userRepo.updateRefreshToken(userId, null);
  }
}
