import React from 'react'
import {PieChart, Pie, Cell, Tooltip, Legend} from "recharts"

const Chart = ({expenses}) => {

    const categoryTotals = {}

    expenses.forEach((exp) => {
      if (categoryTotals[exp.category]) {
          categoryTotals[exp.category] += Number(exp.amount)
        } else {
      categoryTotals[exp.category] = Number(exp.amount)
        }
      })

      const chartData = Object.keys(categoryTotals).map((cat) => ({
      category: cat,
        total: categoryTotals[cat]
      }))

      const COLORS = [
         "#0088FE",
         "#00C49F",
         "#FFBB28",
         "#FF8042",
         "#AF19FF",
         "#FF4560"
      ]

      
  return (
    <div className='flex-1 p-5 rounded-xl bg-white/5 border border-white/10 shadow-md'>
        <h3 className='font-bold'>Expense Overview</h3>
        
        
                 <PieChart width={500} height={350}>
        
          
            
            <Pie
            data={chartData}
            dataKey="total"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
        
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
        
          </Pie>
        
          <Tooltip />  
          <Legend />
                
        </PieChart>

        
    </div>
  )
}

export default Chart