import React from 'react'

const controlBase = "flex-1 px-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 text-sm outline-none transition-all duration-200 focus:border-amber-400/40 cursor-pointer"

const categories = ["All", "Income", "Food", "Shopping", "Accommodation", "Utilities", "Transportation", "Personal Care", "Education", "Entertainment", "Travels & Trips", "Miscellaneous"]

const SearchSort = ({ filterCategory, setFilterCategory, searchTerm, setSearchTerm, sortOption, setSortOption }) => {
  return (
    <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-5 backdrop-blur-sm">

      <p className="text-[10px] font-mono tracking-[0.15em] text-slate-500 uppercase mb-3">Filter & Search</p>

      <div className="flex gap-3 flex-wrap">

        {/* Search */}
        <div className="flex-[2] min-w-44 relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600 text-base pointer-events-none">⌕</span>
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-slate-300 text-sm placeholder-slate-600 outline-none transition-all duration-200 focus:border-amber-400/40"
          />
        </div>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className={controlBase}
        >
          <option value="newest" className="bg-[#0a0a0f]">↓ Newest first</option>
          <option value="oldest" className="bg-[#0a0a0f]">↑ Oldest first</option>
          <option value="high" className="bg-[#0a0a0f]">↓ Highest amount</option>
          <option value="low" className="bg-[#0a0a0f]">↑ Lowest amount</option>
        </select>

        {/* Category Filter */}
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className={`${controlBase} ${filterCategory !== 'All' ? 'border-amber-400/30 text-amber-400' : ''}`}
        >
          {categories.map(cat => (
            <option key={cat} value={cat} className="bg-[#0a0a0f] text-slate-200">{cat}</option>
          ))}
        </select>

      </div>

      {/* Active filter chips */}
      {(searchTerm || filterCategory !== 'All') && (
        <div className="flex gap-2 mt-3 flex-wrap">
          {searchTerm && (
            <div className="flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 rounded-lg px-2.5 py-1 text-[11px] font-mono text-blue-400">
              "{searchTerm}"
              <span className="cursor-pointer hover:text-blue-200" onClick={() => setSearchTerm("")}>✕</span>
            </div>
          )}
          {filterCategory !== 'All' && (
            <div className="flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 rounded-lg px-2.5 py-1 text-[11px] font-mono text-amber-400">
              {filterCategory}
              <span className="cursor-pointer hover:text-amber-200" onClick={() => setFilterCategory("All")}>✕</span>
            </div>
          )}
        </div>
      )}

    </div>
  )
}

export default SearchSort