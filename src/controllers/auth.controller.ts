import { Request, Response } from "express";
import { AuthService } from "../services/AuthService";

export class AuthController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const { accessToken, refreshToken, user } = await this.authService.login(
      email,
      password,
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/api/auth/refresh",
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

  async refresh(req: Request, res: Response) {
    const { refreshToken } = req.cookies.refreshToken;
    const { accessToken } = await this.authService.refresh(refreshToken);

    return res.json({ accessToken });
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
