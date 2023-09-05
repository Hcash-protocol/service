const ABI = {
  Groth16Verifier: {
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: [
      {
        inputs: [
          { internalType: 'uint256[2]', name: '_pA', type: 'uint256[2]' },
          {
            internalType: 'uint256[2][2]',
            name: '_pB',
            type: 'uint256[2][2]',
          },
          { internalType: 'uint256[2]', name: '_pC', type: 'uint256[2]' },
          {
            internalType: 'uint256[2]',
            name: '_pubSignals',
            type: 'uint256[2]',
          },
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
    address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
    abi: [
      {
        inputs: [
          {
            internalType: 'contract Groth16Verifier',
            name: 'groth16Verifier',
            type: 'address',
          },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'from',
            type: 'address',
          },
          {
            indexed: false,
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
        ],
        name: 'Deposit',
        type: 'event',
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: false,
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
        ],
        name: 'Withdraw',
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
          {
            internalType: 'uint256[2][2]',
            name: '_pB',
            type: 'uint256[2][2]',
          },
          { internalType: 'uint256[2]', name: '_pC', type: 'uint256[2]' },
          {
            internalType: 'uint256[2]',
            name: '_pubOut',
            type: 'uint256[2]',
          },
          { internalType: 'address', name: '_to', type: 'address' },
        ],
        name: 'withdraw',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      { stateMutability: 'payable', type: 'receive' },
    ],
    contractName: 'HcashPool',
    input: ['0x5FbDB2315678afecb367f032d93F642f64180aa3'],
    path: '',
  },
};

export { ABI };
