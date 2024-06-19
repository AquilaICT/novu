import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';
import { GeezSMS } from 'geezsms';
export class GeezSmsSmsProvider implements ISmsProvider {
  id = 'geez-sms';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;
  private geezSMS: GeezSMS;

  constructor(
    private config: {
      token: string;
      sender_id?: number;
    }
  ) {
    this.geezSMS = new GeezSMS(config.token)
  }

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {
    const message = {
      phone: options.to,
      msg: options.msg,
      sender_id: options.sender_id || this.config.sender_id  // Optional
    };
    const response = await this.geezSMS.single.send(message);
    return {
      id: response.data.api_log_id,
      date: response.data.date
    };
  }
}
