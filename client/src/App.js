import DonorsList from './Components/Donors/DonorsPage/DonorsList';
import DonorCard from './Components/Donors/DonorCard/DonorCard';
import Layout from './Components/shared/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import ExpensesPage from './Components/Expenses/ExpensesPage';
import AvrechimPage from './Components/Avrechim/AvrechimPage';
import MilgotPage from './Components/Milgot/MilgotPage';
import AddDonor from './Components/Donors/AddDonor/AddDonor';
import FinanceSummaryPage from './Components/FinanceSummary/FinanceSummaryPage';
import DebtsPage from './Components/Debts/DebtsPage';

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
            <Route path="/Milgot" index element={<MilgotPage />} />
            <Route path="/FinanceSummary" index element={<FinanceSummaryPage />} />
            <Route path="/Debts" index element={<DebtsPage />} />
            {/* <Route path="/AddExpense" index element={<AddExpense />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

