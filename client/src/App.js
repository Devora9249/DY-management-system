
import AddDonor from './Components/Donors/AddDonor';
import DonorsList from './Components/Donors/DonorsList';
import Donors from './Components/Donors/DonorsList'
import AddExpense from './Components/Expenses/AddExpense';
import ExpenseList from './Components/Expenses/ExpenseList';
import DonorCard from './Components/Donors/DonorCard';
import Layout from './Components/shared/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ExpensesPage from './Components/Expenses/ExpensesPage';
import AvrechimList from './Components/Avrechim/AvrechimListComp';
import AvrechimPage from './Components/Avrechim/AvrechimPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route path="/Donors" index element={<DonorsList />} />
            <Route path="/Donor/:id" index element={<DonorCard/>}/>
            <Route path="/AddDonor" index element={<AddDonor/>} />
            <Route path="/Expenses" index element={<ExpensesPage />} />
            <Route path="/Avrechim" index element={<AvrechimPage />} />
            {/* <Route path="/AddExpense" index element={<AddExpense />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

