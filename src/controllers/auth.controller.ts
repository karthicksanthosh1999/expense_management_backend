import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";
import { AppError } from "../middlewares/errors/appError";

export class AuthController {
  constructor(private authService: AuthService) { }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await this.authService.login(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      accessToken,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  }

  async decodeUser(req: Request, res: Response) {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw new AppError("Token is missing", 401);
    }
    const data = await this.authService.decodeUser(refreshToken);

    return res.status(200).json({
      message: "User Decoded Successfully",
      data: data?.user,
    });
  }

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new AppError("Refresh token missing", 401);
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  }

  async sendOtp(req: Request, res: Response) {
    const { email } = req.body;

    const data = await this.authService.sendOtp(email);

    return res.status(200).json(data);
  }

  async verifyEmail(req: Request, res: Response) {
    const { email, otp } = req.body;

    const data = await this.authService.verifyOtp(email, otp);

    return res.status(200).json(data);
  }

  async resetPassword(req: Request, res: Response) {
    const { email, otp, newPassword } = req.body;
    const data = await this.authService.resetPassword(email, otp, newPassword);
    return res.status(200).json(data);
  }



  async logout(req: Request, res: Response) {
    const { id } = req.body;
    await this.authService.logout(id);
    res.clearCookie("refreshToken");
    return res.status(204).json({
      message: "User Logout Successfully",
    });
  }
}