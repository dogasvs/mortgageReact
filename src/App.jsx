import { useState } from 'react'
import './App.css'

function App() {
  const [mortgageAmount, setMortgageAmount] = useState('');
  const [mortgageTerm, setMortgageTerm] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState('');
  const [totalPayment, setTotalPayment] = useState('');

  function CalculateMortgage() {
    const totalAmount = Number(mortgageAmount);
    //aylık faiz oranı
    const monthlyInterestRate = Number(interestRate) / 100 / 12;
    //ne kadar ay oducem
    const totalTerm = Number(mortgageTerm) * 12;
    //aylık odeme
    const monthlyTotalPayment = totalAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, totalTerm) / 
    (Math.pow(1 + monthlyInterestRate, totalTerm) - 1);
    //donem boyu odeyecegim miktar
    const totalPayment = monthlyTotalPayment * totalTerm;
    //state kaydediyoruz
    setMonthlyPayment(monthlyTotalPayment.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2)); //toFixedı sema abladan baktım

    console.log(monthlyTotalPayment, totalPayment);
  }

  return (
    <div className="container">
      <div className="getInformByUser">
        <Header />
        <GetInformation CalculateMortgage={CalculateMortgage} />
      </div>
      <div className="mortgageResult">
        <MortgageResultContainer monthlyPayment={monthlyPayment} totalPayment={totalPayment} />
      </div>
    </div>
  )
}

function Header() {
  return (
    <div className="header">
      <h3>Mortgage Calculator</h3>
      <button> Clear All </button>
    </div>
  )
}

function GetInformation({CalculateMortgage}) {
  return (
    <div className="getInformation">
      <div className="mortgageAmount">
      <p>Mortgage Amount</p>
      <input type="number" />
      <img src="img/pound.png" alt="pound" />
      </div>

      <div className="mortgage">
        <div className="mortageItem">
          <p>Mortgage Term</p>
          <input type="number" />
          <img className='termImg' src="img/years.png" alt="years yazisi" />
        </div>
        <div className="mortageItem">
          <p>Interest Rate </p>
          <input type="number" defaultValue={5.25} />
          <img className='faizImg' src="img/yuzde.png" alt="yuzdelik isareti" />
        </div>
      </div>

      <div className="mortgageType">
        <span>Mortgage Type</span>

        <div className="mortgageTypeItem">
          <input type="radio" name='doa' />
          <p> Repayment </p>
        </div>

        <div className="mortgageTypeItem">
          <input type="radio" name='doa' />
          <p>Interest Only</p>
        </div>
      </div>

      <button className='mortgageRepayment' onClick={CalculateMortgage}>
        <img src="img/calculator.svg" alt="hesap makinesi" />
        Calculate Repayments
      </button>
    </div>
  )
}

function MortgageResultContainer({ monthlyTotalPayment, totalPayment }) {
  return (
    <>
    <div className="inform">
      <h3>Your results</h3>
      <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
    </div>

    <div className="result">

    <div className="monthlyResult">
      <h5>Your monthly repayments</h5>
      <h1>£{monthlyTotalPayment}</h1>
    </div>
  <hr />
    <div className="totalResult">
      <h5>Total you'll repay over the term</h5>
      <h3>£{totalPayment}</h3>
    </div>

    </div>
    </>
  )
}

export default App
