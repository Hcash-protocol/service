import { ZkService } from '@app/zk/zk.service';

class Singleton {
  private static zkInstance: ZkService;

  private constructor() {}

  public static getZkInstance(): ZkService {
    if (!Singleton.zkInstance) {
      Singleton.zkInstance = new ZkService();
    }
    return Singleton.zkInstance;
  }
}

export { Singleton };
