import { Transaction } from './transaction.model';

export interface TransactionResponse {
  total: number;
  data: Transaction[];
}
