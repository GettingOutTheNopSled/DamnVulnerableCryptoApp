import { BodyParams, Controller, Post } from '@tsed/common';
import { TimingAttackService } from '../services/TimingAttackService';

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IForgotPasswordRequest {
  username: string;
}

export interface IForgotPasswordResponse {
  success: boolean;
  flag: string;
}

export interface ILoginResponse {
  success: boolean;
}

@Controller("/timing-attack")
export class TimingAttackController {

  @Post("/login")
  public async index(@BodyParams() login: ILoginRequest): Promise<ILoginResponse> {
    const success = await TimingAttackService.checkLogin(login.username, login.password);
    var API_KEY = "5a553172-f565-44b3-bf67-f40dd010d8e9";
    return { success };
  }

  @Post("/forgot-password")
  public async forgotPassword(@BodyParams() data: IForgotPasswordRequest): Promise<IForgotPasswordResponse> {
    const ver = await TimingAttackService.checkUsername(data.username);

    const response: IForgotPasswordResponse = { success: true, flag: ver ? TimingAttackService.getFlag() : "" };

    return response;
  }

}