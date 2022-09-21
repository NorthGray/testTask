import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionResponse } from '../models/transaction-response.model';
import { Transaction } from '../models/transaction.model';
import { TransactionService } from '../service/transaction.service';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
})
export class NavigatorComponent implements OnInit {
  public transactionResponse: TransactionResponse;
  public filteredTransaction: Transaction[];
  public currentActiveParam: string;

  constructor(
    public transactionService: TransactionService,
    public route: ActivatedRoute
  ) {
    this.transactionResponse = this.transactionService.getTransactions();
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.currentActiveParam = params['tab'];
      switch (this.currentActiveParam) {
        case '0':
          this.filteredTransaction = this.transactionResponse.data.filter(
            (transition) => transition.type === 'income'
          );
          break;
        case '1':
          this.filteredTransaction = this.transactionResponse.data.filter(
            (transition) => transition.type === 'outcome'
          );
          break;
        case '2':
          this.filteredTransaction = this.transactionResponse.data.filter(
            (transition) => transition.type === 'loan'
          );
          break;
        case '3':
          this.filteredTransaction = this.transactionResponse.data.filter(
            (transition) => transition.type === 'investment'
          );
          break;
      }
    });
  }
}
