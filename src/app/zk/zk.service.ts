import { Constant, WASM_PATH, ZKEY_PATH } from '@constants';
import { web3 } from '@providers';
import { History } from '@schemas';
const snarkjs = require('snarkjs');

export class ZkService {
  async getProof(txHash: string) {
    const txRes = await web3.eth.getTransaction(txHash);
    const input = {
      from: txRes.from,
      nonce: txRes.nonce,
      txHash,
      amount: txRes.value,
    };
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, WASM_PATH, ZKEY_PATH);
    return JSON.parse(`[${await snarkjs.groth16.exportSolidityCallData(proof, publicSignals)}]`);
  }

  async withdrawHistory(
    from: string,
    value: string,
    recipient: string,
    txHash: string,
    timestamp: string,
  ) {
    const his = await History.findOneAndUpdate(
      {
        wallet_address: from.toLowerCase(),
        value,
        transaction_hash: txHash,
        to_address: recipient,
        type: Constant.EVENT.WITHDRAWL,
        created_at: new Date(parseInt(`${timestamp}`) * 1000),
      },
      {},
      {
        setDefaultsOnInsert: true,
        upsert: true,
        new: true,
      },
    );
    return his;
  }

  async depositHistory(from: string, amount: string, txHash: string, timestamp: string) {
    const his = await History.findOneAndUpdate(
      {
        wallet_address: from.toLowerCase(),
        value: amount,
        transaction_hash: txHash,
        type: Constant.EVENT.DEPOSIT,
        created_at: new Date(parseInt(`${timestamp}`) * 1000),
      },
      {},
      {
        setDefaultsOnInsert: true,
        upsert: true,
        new: true,
      },
    );
    return his;
  }
}
