import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"

const COLORS = ["#f59e0b", "#10b981", "#3b82f6", "#f43f5e", "#8b5cf6", "#06b6d4", "#ec4899", "#14b8a6"]

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0a0a0f]/95 border border-white/10 rounded-xl px-4 py-2.5 text-xs font-mono shadow-xl">
        <div className="font-bold mb-1" style={{ color: COLORS[0] }}>{payload[0].name}</div>
        <div className="text-slate-200">₹{Number(payload[0].value).toLocaleString('en-IN')}</div>
      </div>
    )
  }
  return null
}

const Chart = ({ expenses }) => {
  const categoryTotals = {}
  expenses.forEach((exp) => {
    categoryTotals[exp.category] = (categoryTotals[exp.category] || 0) + Number(exp.amount)
  })

  const chartData = Object.keys(categoryTotals).map((cat) => ({
    name: cat,
    value: categoryTotals[cat],
  }))

  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-sm">

      <div className="flex justify-between items-center mb-5">
        <div>
          <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-1">Spending Overview</p>
          <h3 className="text-lg font-semibold text-slate-200">Category Breakdown</h3>
        </div>
        <div className="bg-amber-400/10 border border-amber-400/20 rounded-lg px-3 py-1.5 text-[11px] font-mono text-amber-400">
          {chartData.length} categories
        </div>
      </div>

      {chartData.length === 0 ? (
        <div className="h-48 flex items-center justify-center text-slate-700 font-mono text-sm">
          No data to display yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={40}
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={(value) => (
                <span className="text-slate-400 font-mono text-[11px]">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}

export default Chart