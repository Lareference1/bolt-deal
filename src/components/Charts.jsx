import React from 'react'
    import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

    export default function Charts({ inputs }) {
      const generateAmortizationData = () => {
        const data = []
        let balance = inputs.propertyPrice - inputs.downPayment
        const monthlyInterestRate = (inputs.interestRate / 100) / 12
        const numberOfPayments = inputs.loanDuration * 12
        const monthlyPayment =
          (balance * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))

        for (let i = 0; i <= numberOfPayments; i++) {
          const interest = balance * monthlyInterestRate
          const principal = monthlyPayment - interest
          balance -= principal
          data.push({
            month: i,
            balance: balance,
            interest: interest,
            principal: principal
          })
        }
        return data
      }

      const amortizationData = generateAmortizationData()

      return (
        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Amortization Schedule</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={amortizationData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Remaining Balance" />
                <Line type="monotone" dataKey="interest" stroke="#82ca9d" name="Interest Paid" />
                <Line type="monotone" dataKey="principal" stroke="#ffc658" name="Principal Paid" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )
    }
