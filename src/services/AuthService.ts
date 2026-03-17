import { UserRepository } from "../interfaces/UserRepository";
import { AppError } from "../middlewares/errors/appError";
import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { generateOTP } from "../utils/OTPGenerator";
import { sendEmail } from "../utils/sendEmail";

export class AuthService {
  constructor(private userRepo: UserRepository) { }

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

    return { accessToken: newRefreshToken, refreshToken };
  }

  async decodeUser(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401);
    }
    const payload = verifyRefreshToken(refreshToken);

    const user = await this.userRepo.findById(payload.id);

    if (!user) {
      throw new AppError("User Not Found", 404, false);
    }

    return { user };
  }

  async sendOtp(email: string) {
    const user = this.userRepo.findByEmail(email)
    if (!user) {
      throw new AppError("User not found", 404);
    }
    const otp = generateOTP();
    const expiry = new Date(Date.now() + 10 * 60 * 1000);
    await this.userRepo.updateOTP(otp, expiry, email)
    await sendEmail(email, "OTP Verification", `Your OTP is ${otp}`);
    return {
      message: "OTP sent to email",
      user,
    };
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new AppError("User not found", 404);
    if (user?.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }
    if (!user?.otp_expire) {
      throw new AppError("Invalid Expired Date", 400);
    }
    if (new Date() > user?.otp_expire) {
      throw new AppError("OTP expired", 400);
    }
    await this.userRepo.resetOTP(email)


    return {
      message: "Password reset successfully",
      user,
    };
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.userRepo.findByEmail(email)
    if (!user) throw new AppError("User not found", 404);
    if (user.otp !== otp) {
      throw new AppError("Invalid OTP", 400);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userRepo.resetPassword(hashedPassword, email)
    return { message: "Password reset successfully", user };
  }

  async logout(userId: string) {
    await this.userRepo.updateRefreshToken(userId, null);
  }
}
