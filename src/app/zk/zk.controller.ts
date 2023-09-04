import { Constant, logger, onError, onSuccess, OptionResponse } from '@constants';
import { SignatureMiddleware } from '@middlewares';
import { Singleton } from '@providers';
import { Path, Controller, Middlewares, Route, Security, Tags, Get } from 'tsoa';

const { NETWORK_STATUS_CODE, NETWORK_STATUS_MESSAGE } = Constant;
@Tags('Zk')
@Route('zk')
@Security('authorize')
@Middlewares([SignatureMiddleware])
export class ZkController extends Controller {
  @Get('proof/${txHash}')
  public async getProof(
    @Path()
    txHash: string,
  ): Promise<OptionResponse<string>> {
    try {
      return onSuccess(await Singleton.getZkInstance().getProof(txHash));
    } catch (error) {
      logger.error(error);
      this.setStatus(NETWORK_STATUS_CODE.INTERNAL_SERVER_ERROR);
      return onError(NETWORK_STATUS_MESSAGE.INTERNAL_SERVER_ERROR);
    }
  }
}
