import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  addExpense,
  deleteExpense,
  updateExpense,
} from '../store/redux/expenses';

import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';

import { GlobalStyles } from '../constants/styles';
// import { ExpensesContext } from '../store/context/expenses-context';

function ManageExpense({ route, navigation }) {
  // const expensesCtx = useContext(ExpensesContext);
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.expenses);
  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

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

  function confirmHandler() {
    if (isEditing) {
      // expensesCtx.updateExpense(editedExpenseId, {
      //   description: 'Test!!',
      //   amount: 29.99,
      //   date: new Date('2022-05-20'),
      // });
      dispatch(
        updateExpense({
          id: editedExpenseId,
          data: {
            description: 'Test!!',
            amount: 29.99,
            date: new Date('2022-05-20'),
          },
        })
      );
    } else {
      // expensesCtx.addExpense({
      //   description: 'Test',
      //   amount: 19.99,
      //   date: new Date('2022-05-10'),
      // });
      dispatch(
        addExpense({
          description: 'Test',
          amount: 19.99,
          date: new Date('2022-05-10'),
        })
      );
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode='flat' onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
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
  buttons: {
    flexDirection: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
