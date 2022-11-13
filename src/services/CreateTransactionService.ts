import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(transactionInput: Omit<Transaction, 'id'>): Transaction {
    const balance = this.transactionsRepository.getBalance()
    if (transactionInput.type === 'outcome' && transactionInput.value > balance.total) {
      throw Error('You do not have balance to finish this transaction')
    }
    if (transactionInput.type === 'income') balance.income = balance.income + transactionInput.value
    if (transactionInput.type === 'outcome') balance.outcome = balance.outcome + transactionInput.value
    this.transactionsRepository.setBalance({
      income: balance.income,
      outcome: balance.outcome,
      total: balance.income - balance.outcome
    })
    const transaction = this.transactionsRepository.create(transactionInput)
    return transaction;
  }
}

export default CreateTransactionService;
