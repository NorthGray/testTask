import { Injectable } from '@angular/core';
import { TRANSACTIONS_DATA } from '../../assets/transactions.constant';
import { TransactionResponse } from '../models/transaction-response.model';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor() {}

  public getTransactions(): TransactionResponse {
    return TRANSACTIONS_DATA;
  }
}
