import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];
  private balance: Balance;

  constructor() {
    this.transactions = [];
    this.balance = {
      income: 0,
      outcome: 0,
      total: 0
    };
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    return this.balance
  }

  public setBalance(newBalance: Balance): Balance {
    return this.balance = newBalance;
  }

  public create(transactionProps: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction(transactionProps)
    this.transactions.push(transaction)
    return transaction
  }
}

export default TransactionsRepository;
