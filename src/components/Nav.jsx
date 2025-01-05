import React from 'react'

    export default function Nav({ inputs }) {
      const handleExport = () => {
        const dataStr = JSON.stringify(inputs, null, 2)
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

        const exportFileDefaultName = 'analysis.json'

        let linkElement = document.createElement('a')
        linkElement.setAttribute('href', dataUri)
        linkElement.setAttribute('download', exportFileDefaultName)
        linkElement.click()
      }

      return (
        <nav className="bg-white shadow mb-8">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-xl font-bold">Real Estate Analysis</h1>
              <div className="space-x-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleExport}
                >
                  Export JSON
                </button>
              </div>
            </div>
          </div>
        </nav>
      )
    }
