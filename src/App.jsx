import React, { useState } from 'react'
    import InputForm from './components/InputForm'
    import Results from './components/Results'
    import Charts from './components/Charts'
    import Nav from './components/Nav'

    export default function App() {
      const [inputs, setInputs] = useState({
        address: '',
        propertyPrice: 0,
        downPayment: 0,
        interestRate: 0,
        loanDuration: 0,
        rentalIncome: 0,
        expenses: {
          taxes: 0,
          insurance: 0,
          maintenance: 0
        }
      })

      return (
        <div className="min-h-screen bg-gray-100">
          <Nav inputs={inputs} />
          <div className="container mx-auto p-4">
            <div className="grid md:grid-cols-2 gap-8">
              <InputForm inputs={inputs} setInputs={setInputs} />
              <Results inputs={inputs} />
            </div>
            <Charts inputs={inputs} />
          </div>
        </div>
      )
    }
