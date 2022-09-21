import { Component } from '@angular/core';
import { TransactionResponse } from '../models/transaction-response.model';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
})
export class SummaryPageComponent {
  public transactionResponse: TransactionResponse;
  public countIncome: number;
  public countInvestments: number;
  public countOutcome: number;
  public countLoans: number;

  constructor(public transactionService: TransactionService) {
    this.transactionResponse = this.transactionService.getTransactions();
    this.countIncome = this.transactionResponse.data.filter(
      (transaction) => transaction.type === 'income'
    ).length;
    this.countInvestments = this.transactionResponse.data.filter(
      (transaction) => transaction.type === 'investment'
    ).length;
    this.countOutcome = this.transactionResponse.data.filter(
      (transaction) => transaction.type === 'outcome'
    ).length;
    this.countLoans = this.transactionResponse.data.filter(
      (transaction) => transaction.type === 'loan'
    ).length;
  }
}
