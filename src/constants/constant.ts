const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
const ZERO_BYTES32 = '0x0000000000000000000000000000000000000000000000000000000000000000';

const Constant = {
  ZERO_ADDRESS,
  ZERO_BYTES32,
  MAX_FILE_UPLOAD: 10,
  LIMIT_MESSAGE: 25,
  EXPIRE_TIME: 24 * 60 * 60 * 1000,
  PATH_UPLOAD_FILE: '../upload_file/',
  NETWORK_STATUS_CODE: {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    EXPIRE: 498,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  },
  NETWORK_STATUS_MESSAGE: {
    EMPTY: 'Empty',
    SUCCESS: 'Success',
    BAD_REQUEST: 'Bad request',
    EXPIRE: 'Expire time',
    UNAUTHORIZED: 'Unauthorized',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    NOT_ENOUGH_RIGHT: 'Not Enough Rights',
  },
  ROOT_PATH: __dirname.replace('build/src/constants', ''),
  EVENT: {
    DEPOSIT: 'deposit',
    WITHDRAWL: 'withdrawl',
  },
};

const ZKEY_PATH = Constant.ROOT_PATH + '/circuit.zkey';
const WASM_PATH = Constant.ROOT_PATH + '/circuit.wasm';

export { Constant, ZKEY_PATH, WASM_PATH };
