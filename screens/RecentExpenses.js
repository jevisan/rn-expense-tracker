// import { useContext } from 'react';
import { useSelector } from 'react-redux';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
// import { ExpensesContext } from '../store/context/expenses-context';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  // const expensesCtx = useContext(ExpensesContext);

  const expenses = useSelector((state) => state.expenses.expenses);
  // const recentExpenses = expensesCtx.expenses.filter((expense) => {
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod='Last 7 Days'
      fallbackText='No expenses for the last 7 days'
    />
  );
}

export default RecentExpenses;
