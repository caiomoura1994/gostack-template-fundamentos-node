import { Router } from 'express';
import CreateTransactionService from '../services/CreateTransactionService';

import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (_request, response) => {
  try {
    const transactions = transactionsRepository.all()
    const balance = transactionsRepository.getBalance()
    return response.json({ transactions, balance });
  } catch (err) {
    if (err instanceof Error)
      return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const transactionBodyData: Omit<Transaction, 'id'> = request.body
    const newTransaction = new CreateTransactionService(transactionsRepository)
    const transactionResponse = newTransaction.execute(transactionBodyData)
    return response.json(transactionResponse);
  } catch (err) {
    if (err instanceof Error)
      return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
