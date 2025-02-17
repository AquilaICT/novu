import { GeezSmsSmsProvider } from '@novu/providers';
import { ChannelTypeEnum, ICredentials } from '@novu/shared';
import { BaseSmsHandler } from './base.handler';

export class GeezSMSHandler extends BaseSmsHandler {
  constructor() {
    super('geez-sms', ChannelTypeEnum.SMS);
  }
  buildProvider(credentials: ICredentials) {
    this.provider = new GeezSmsSmsProvider({
      token: credentials.apiKey,
      senderId: credentials.from,
    });
  }
}
