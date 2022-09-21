export interface Transaction {
  _id: string;
  amount: string;
  type: 'outcome' | 'loan' | 'income' | 'investment';
  name: TransactionName;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface TransactionName {
  first: string;
  last: string;
}
