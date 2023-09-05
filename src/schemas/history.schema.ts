import { Constant } from '@constants';
import mongoose, { Schema } from 'mongoose';

export interface IHistory {
  wallet_address: string;
  type: string;
  transaction_hash: string;
  value: string;
  to_address?: string;
  created_at: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

const historySchema = new Schema<IHistory>({
  wallet_address: { type: String, required: true },
  transaction_hash: { type: String, required: true, unique: true },
  type: { type: String, required: true, default: Constant.EVENT.DEPOSIT },
  value: { type: String, required: true },
  to_address: { type: String, required: false },
  created_at: { required: false, type: Date, default: Date.now },
  updated_at: { required: false, type: Date },
  deleted_at: { required: false, type: Date },
});

export const History = mongoose.model('history', historySchema, undefined, {
  overwriteModels: true,
});
