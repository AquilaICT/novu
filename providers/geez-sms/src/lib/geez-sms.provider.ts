import {
  ChannelTypeEnum,
  ISendMessageSuccessResponse,
  ISmsOptions,
  ISmsProvider,
} from '@novu/stateless';

export class GeezSmsSmsProvider implements ISmsProvider {
  id = 'geez-sms';
  channelType = ChannelTypeEnum.SMS as ChannelTypeEnum.SMS;

  constructor(
    private config: {
      
    }
  ) {
  }

  async sendMessage(
    options: ISmsOptions
  ): Promise<ISendMessageSuccessResponse> {


    return {
      id: 'id_returned_by_provider',
      date: 'current_time'
    };
  }
}
