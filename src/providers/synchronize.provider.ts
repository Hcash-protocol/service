import { logger } from '@constants';
import { Synchronize } from '@schemas';
import cron from 'node-cron';
import { HcashContract, Singleton, getBlockByNumber, web3 } from '.';

const globalVariable: any = global;

globalVariable.isSyncingGetDataFromSmartContract = false;
const onJobGetDataFromSmartContract = async () => {
  try {
    if (globalVariable.isSyncingGetDataFromSmartContract) return;
    globalVariable.isSyncingGetDataFromSmartContract = true;
    const lastSynchronize = await Synchronize.findOne().sort({ last_block_number: -1 });

    if (!lastSynchronize?.last_block_number) {
      await Synchronize.create({
        last_block_number: 39786224,
      });
      globalVariable.isSyncingGetDataFromSmartContract = false;
      return;
    }
    const last_block_number = lastSynchronize.last_block_number + 1;
    const listTxHash: string[] = [];
    const last_block_number_onchain = Math.min(
      parseInt(`${await web3.eth.getBlockNumber()}`),
      last_block_number + 100000,
    );
    logger.info(`Synchronizing from ${last_block_number} to ${last_block_number_onchain}`);
    await synchronize(last_block_number, last_block_number_onchain, listTxHash);
    if (listTxHash.length !== 0 || last_block_number_onchain > last_block_number + 500)
      await Synchronize.create({
        last_block_number: last_block_number_onchain,
        transactions: listTxHash,
      });
    logger.info(`Synchronized ${listTxHash.length} transactions`);
  } catch (error: any) {
    logger.error(`onJobGetDataFromSmartContract: ${error.message}`);
  }
  globalVariable.isSyncingGetDataFromSmartContract = false;
};

const synchronize = async (
  last_block_number_sync: number,
  last_block_number_onchain: number,
  listTxHash: string[],
) => {
  const zkService = Singleton.getZkInstance();
  try {
    const depositEvents = await HcashContract.getPastEvents('Deposit', {
      fromBlock: last_block_number_sync,
      toBlock: last_block_number_onchain,
    });
    logger.info(`Synchronizing ${depositEvents.length} Deposit`);

    for (const value of depositEvents as any[]) {
      const blockData = await getBlockByNumber(value.blockNumber);
      await zkService.depositHistory(
        value.returnValues.from.toLowerCase(),
        value.returnValues.amount,
        value.transactionHash,
        blockData.timestamp.toString(),
      );
      listTxHash.push(value.transactionHash);
    }
  } catch (error: any) {
    logger.error(`[depositEvents]${error.message}`);
  }

  try {
    const withdrawlEvents = await HcashContract.getPastEvents('Withdrawl', {
      fromBlock: last_block_number_sync,
      toBlock: last_block_number_onchain,
    });

    logger.info(`Synchronizing ${withdrawlEvents.length} Withdrawl`);

    for (const withdrawlEvent of withdrawlEvents as any[]) {
      const blockData = await getBlockByNumber(withdrawlEvent.blockNumber);
      const { from, value } = await web3.eth.getTransaction(withdrawlEvent.transactionHash);
      await zkService.withdrawHistory(
        from,
        value,
        withdrawlEvent.returnValues.recipient.toLowerCase(),
        withdrawlEvent.transactionHash,
        blockData.timestamp.toString(),
      );
      listTxHash.push(withdrawlEvent.transactionHash);
    }
  } catch (error: any) {
    logger.error(`[withdrawlEvent]${error.message}`);
  }
};

const startSynchronizeDataFromSmartContract = () => {
  cron.schedule('*/3 * * * * *', onJobGetDataFromSmartContract);
};

export { startSynchronizeDataFromSmartContract };
