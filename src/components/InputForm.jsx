import React, { useState } from 'react'
    import { Tooltip } from 'react-tooltip'
    import axios from 'axios'

    export default function InputForm({ inputs, setInputs }) {
      const [addressSuggestions, setAddressSuggestions] = useState([])
      const [addressInput, setAddressInput] = useState('')

      const handleAddressChange = async (e) => {
        const newAddress = e.target.value
        setAddressInput(newAddress)
        setInputs(prev => ({ ...prev, address: newAddress }))

        if (newAddress.length > 3) {
          try {
            const apiKey = 'YOUR_OPENCAGE_API_KEY'
            const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${newAddress}&key=${apiKey}&limit=5`
            const response = await axios.get(apiUrl)
            if (response.data && response.data.results) {
              setAddressSuggestions(response.data.results.map(result => result.formatted))
            } else {
              setAddressSuggestions([])
            }
          } catch (error) {
            console.error('Error fetching address suggestions:', error)
            setAddressSuggestions([])
          }
        } else {
          setAddressSuggestions([])
        }
      }

      const selectAddress = (address) => {
        setAddressInput(address)
        setInputs(prev => ({ ...prev, address: address }))
        setAddressSuggestions([])
      }

      const handleChange = (e) => {
        const { name, value } = e.target
        if (name.includes('.')) {
          const [parent, child] = name.split('.')
          setInputs(prev => ({
            ...prev,
            [parent]: {
              ...prev[parent],
              [child]: parseFloat(value) || 0
            }
          }))
        } else {
          setInputs(prev => ({
            ...prev,
            [name]: parseFloat(value) || 0
          }))
        }
      }

      return (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Property Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Property Address
                <span data-tooltip-id="address-tooltip" className="ml-1">?</span>
                <Tooltip id="address-tooltip" place="right">
                  Enter the property address
                </Tooltip>
              </label>
              <input
                type="text"
                value={addressInput}
                onChange={handleAddressChange}
                className="w-full p-2 border rounded"
              />
              {addressSuggestions.length > 0 && (
                <ul className="bg-white border rounded mt-1">
                  {addressSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => selectAddress(suggestion)}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Property Price ($)
                <span data-tooltip-id="price-tooltip" className="ml-1">?</span>
                <Tooltip id="price-tooltip" place="right">
                  Total purchase price of the property
                </Tooltip>
              </label>
              <input
                type="number"
                name="propertyPrice"
                value={inputs.propertyPrice}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Down Payment ($)
                <span data-tooltip-id="downpayment-tooltip" className="ml-1">?</span>
                <Tooltip id="downpayment-tooltip" place="right">
                  Initial payment made towards the property
                </Tooltip>
              </label>
              <input
                type="number"
                name="downPayment"
                value={inputs.downPayment}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Interest Rate (%)
                <span data-tooltip-id="interest-tooltip" className="ml-1">?</span>
                <Tooltip id="interest-tooltip" place="right">
                  Annual interest rate for the loan
                </Tooltip>
              </label>
              <input
                type="number"
                name="interestRate"
                value={inputs.interestRate}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Loan Duration (Years)
                <span data-tooltip-id="loan-duration-tooltip" className="ml-1">?</span>
                 <Tooltip id="loan-duration-tooltip" place="right">
                  Duration of the loan in years
                </Tooltip>
              </label>
              <input
                type="number"
                name="loanDuration"
                value={inputs.loanDuration}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Monthly Rental Income ($)
                <span data-tooltip-id="rental-income-tooltip" className="ml-1">?</span>
                <Tooltip id="rental-income-tooltip" place="right">
                  Estimated monthly income from renting the property
                </Tooltip>
              </label>
              <input
                type="number"
                name="rentalIncome"
                value={inputs.rentalIncome}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Operating Expenses</h3>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Taxes ($)
                  <span data-tooltip-id="taxes-tooltip" className="ml-1">?</span>
                  <Tooltip id="taxes-tooltip" place="right">
                    Monthly property taxes
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="expenses.taxes"
                  value={inputs.expenses.taxes}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Insurance ($)
                  <span data-tooltip-id="insurance-tooltip" className="ml-1">?</span>
                  <Tooltip id="insurance-tooltip" place="right">
                    Monthly insurance costs
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="expenses.insurance"
                  value={inputs.expenses.insurance}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Maintenance ($)
                  <span data-tooltip-id="maintenance-tooltip" className="ml-1">?</span>
                  <Tooltip id="maintenance-tooltip" place="right">
                    Monthly maintenance costs
                  </Tooltip>
                </label>
                <input
                  type="number"
                  name="expenses.maintenance"
                  value={inputs.expenses.maintenance}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }
