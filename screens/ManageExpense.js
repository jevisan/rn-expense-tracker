import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/redux/expenses';

import IconButton from '../components/UI/IconButton';

import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
// import { ExpensesContext } from '../store/context/expenses-context';

function ManageExpense({ route, navigation }) {
  // const expensesCtx = useContext(ExpensesContext);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    // expensesCtx.deleteExpense(editedExpenseId);
    dispatch(deleteExpense(editedExpenseId));
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      // expensesCtx.updateExpense(editedExpenseId, {
      //   description: 'Test!!',
      //   amount: 29.99,
      //   date: new Date('2022-05-20'),
      // });
      // dispatch(
      //   updateExpense({
      //     id: editedExpenseId,
      //     data: {
      //       description: 'Test!!',
      //       amount: 29.99,
      //       date: new Date('2022-05-20'),
      //     },
      //   })
      // );
      dispatch(updateExpense({ id: editedExpenseId, data: expenseData }));
    } else {
      // expensesCtx.addExpense({
      //   description: 'Test',
      //   amount: 19.99,
      //   date: new Date('2022-05-10'),
      // });
      // dispatch(
      //   addExpense({
      //     description: 'Test',
      //     amount: 19.99,
      //     date: new Date('2022-05-10'),
      //   })
      // );
      dispatch(addExpense(expenseData));
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon='trash'
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
