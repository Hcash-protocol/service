const ABI = {
  Groth16Verifier: {
    address: '0x317328ea70ce7E5aeAC21fEc750edFCB6d7A3b89',
    abi: [
      {
        inputs: [
          { internalType: 'uint256[2]', name: '_pA', type: 'uint256[2]' },
          { internalType: 'uint256[2][2]', name: '_pB', type: 'uint256[2][2]' },
          { internalType: 'uint256[2]', name: '_pC', type: 'uint256[2]' },
          { internalType: 'uint256[2]', name: '_pubSignals', type: 'uint256[2]' },
        ],
        name: 'verifyProof',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    contractName: 'Groth16Verifier',
    input: [],
    path: '',
  },
  HcashPool: {
    address: '0x51a0876c0C01537d7964ba8dFCfF1e4f57BAEa3b',
    abi: [
      {
        inputs: [
          { internalType: 'contract Groth16Verifier', name: 'groth16Verifier', type: 'address' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          { indexed: false, internalType: 'address', name: 'from', type: 'address' },
          { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' },
        ],
        name: 'Deposit',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'address', name: 'recipient', type: 'address' }],
        name: 'Withdrawl',
        type: 'event',
      },
      {
        inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        name: 'proof',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [
          { internalType: 'uint256[2]', name: '_pA', type: 'uint256[2]' },
          { internalType: 'uint256[2][2]', name: '_pB', type: 'uint256[2][2]' },
          { internalType: 'uint256[2]', name: '_pC', type: 'uint256[2]' },
          { internalType: 'uint256[2]', name: '_pubOut', type: 'uint256[2]' },
          { internalType: 'address', name: '_to', type: 'address' },
        ],
        name: 'withdrawl',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      { stateMutability: 'payable', type: 'receive' },
    ],
    contractName: 'HcashPool',
    input: ['0x317328ea70ce7E5aeAC21fEc750edFCB6d7A3b89'],
    path: '',
  },
};

export { ABI };
