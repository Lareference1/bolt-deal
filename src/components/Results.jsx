import React from 'react'

    export default function Results({ inputs }) {
      const calculateMetrics = () => {
        const loanAmount = inputs.propertyPrice - inputs.downPayment
        const monthlyInterestRate = (inputs.interestRate / 100) / 12
        const numberOfPayments = inputs.loanDuration * 12
        const monthlyPayment =
          (loanAmount * monthlyInterestRate) /
          (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))

        const monthlyExpenses =
          inputs.expenses.taxes +
          inputs.expenses.insurance +
          inputs.expenses.maintenance

        const monthlyCashFlow = inputs.rentalIncome - monthlyPayment - monthlyExpenses

        return {
          monthlyPayment,
          monthlyCashFlow,
          annualCashFlow: monthlyCashFlow * 12,
          capRate: ((inputs.rentalIncome * 12) / inputs.propertyPrice) * 100,
          roi: ((monthlyCashFlow * 12) / inputs.downPayment) * 100
        }
      }

      const metrics = calculateMetrics()

      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Analysis Results</h2>
          <div className="space-y-3">
            <div>
              <p className="font-medium">Monthly Payment:</p>
              <p>${metrics.monthlyPayment.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Monthly Cash Flow:</p>
              <p>${metrics.monthlyCashFlow.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Annual Cash Flow:</p>
              <p>${metrics.annualCashFlow.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Cap Rate:</p>
              <p>{metrics.capRate.toFixed(2)}%</p>
            </div>
            <div>
              <p className="font-medium">ROI:</p>
              <p>{metrics.roi.toFixed(2)}%</p>
            </div>
          </div>
        </div>
      )
    }
