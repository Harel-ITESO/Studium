import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async loginWithGoogle(req, res) {
    const token = this.jwtService.sign({ user: req.user });
    res.redirect(`',  
`);
  }

  async loginWithFacebook(req, res) {
    const token = this.jwtService.sign({ user: req.user });
    res.redirect(`frontend_url_with_token=${token}`);
  }


}
