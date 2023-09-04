import { WASM_PATH, ZKEY_PATH } from '@constants';
const snarkjs = require('snarkjs');

export class ZkService {
  async getProof(txHash: string) {
    /* txhash to input
     */
    const input = {
      from: '',
      nonce: '',
      txHash,
      amount: '',
    };
    const { proof, publicSignals } = await snarkjs.groth16.fullProve(input, WASM_PATH, ZKEY_PATH);
    return await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
  }

  async withdrawHistory(recipient: string, txHash: string, timestamp: string) {
    return {
      recipient,
      txHash,
      timestamp,
    };
  }

  async depositHistory(from: string, amount: string, txHash: string, timestamp: string) {
    return {
      from,
      amount,
      txHash,
      timestamp,
    };
  }
}
