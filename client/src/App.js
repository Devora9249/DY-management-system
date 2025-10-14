
import DonorsList from './Components/Donors/DonorsList';
import Donors from './Components/Donors/DonorsList'
import AddExpense from './Components/Expenses/AddExpense';
import ExpenseList from './Components/Expenses/ExpenseList';

function App() {
  return (
    <div className="App">
      <Donors/>
      <DonorsList/>
      <ExpenseList/>
      <AddExpense/>
    </div>
  );
}

export default App;

