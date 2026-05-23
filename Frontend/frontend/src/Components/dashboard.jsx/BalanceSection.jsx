import React from 'react'

const BalanceSection = ({ expenses }) => {
  const totalIncome = expenses
    .filter(exp => exp.type === "credit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const totalExpense = expenses
    .filter(exp => exp.type === "debit")
    .reduce((acc, curr) => acc + Number(curr.amount), 0)

  const balance = totalIncome - totalExpense
  const savingsRate = totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(1) : 0

  const cards = [
    {
      label: 'TOTAL INCOME',
      value: totalIncome,
      icon: '↑',
      sub: `${expenses.filter(e => e.type === 'credit').length} transactions`,
      colorText: 'text-emerald-400',
      colorBorder: 'border-emerald-500/20',
      colorGlow: 'shadow-emerald-500/10',
      colorBar: 'from-emerald-400',
      colorBg: 'bg-emerald-400/5',
    },
    {
      label: 'TOTAL EXPENSES',
      value: totalExpense,
      icon: '↓',
      sub: `${expenses.filter(e => e.type === 'debit').length} transactions`,
      colorText: 'text-rose-400',
      colorBorder: 'border-rose-500/20',
      colorGlow: 'shadow-rose-500/10',
      colorBar: 'from-rose-400',
      colorBg: 'bg-rose-400/5',
    },
    {
      label: 'NET BALANCE',
      value: balance,
      icon: balance >= 0 ? '◈' : '▼',
      sub: `${savingsRate}% savings rate`,
      colorText: balance >= 0 ? 'text-amber-400' : 'text-rose-400',
      colorBorder: balance >= 0 ? 'border-amber-400/25' : 'border-rose-500/20',
      colorGlow: balance >= 0 ? 'shadow-amber-500/10' : 'shadow-rose-500/10',
      colorBar: balance >= 0 ? 'from-amber-400' : 'from-rose-400',
      colorBg: balance >= 0 ? 'bg-amber-400/5' : 'bg-rose-400/5',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl border ${card.colorBorder} ${card.colorBg} backdrop-blur-sm p-6 shadow-xl ${card.colorGlow}`}
        >
          {/* Top row */}
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase">
              {card.label}
            </span>
            <span className={`text-xl font-bold ${card.colorText}`}>{card.icon}</span>
          </div>

          {/* Amount */}
          <div className={`text-3xl font-bold tracking-tight ${card.colorText} mb-2`}>
            ₹{Math.abs(card.value).toLocaleString('en-IN')}
          </div>

          {/* Sub */}
          <div className="text-[11px] font-mono text-slate-600">{card.sub}</div>

          {/* Bottom bar */}
          <div className={`mt-4 h-0.5 rounded-full bg-gradient-to-r ${card.colorBar} to-transparent opacity-50`}></div>
        </div>
      ))}
    </div>
  )
}

export default BalanceSection