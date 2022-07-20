import { useContext } from 'react';
import { useSelector } from 'react-redux';

// import { ExpensesContext } from '../store/context/expenses-context';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';

function AllExpenses() {
  // const expensesCtx = useContext(ExpensesContext);
  const expenses = useSelector((state) => state.expenses.expenses);
  return (
    <ExpensesOutput
      expensesPeriod='Total'
      expenses={expenses}
      fallbackText='No expenses'
    />
  );
}

export default AllExpenses;
