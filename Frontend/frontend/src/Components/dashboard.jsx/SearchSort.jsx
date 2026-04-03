import React from 'react'

const SearchSort = ({filterCategory,
  setFilterCategory,
  searchTerm,
  setSearchTerm,
  sortOption,
  setSortOption }) => {


  return (
    <div className='flex gap-3 p-5 rounded-xl bg-white/5 border border-white/10'>
        {/* --------------------------------- SEARCH + SORT -----------------------------------  */}

          <input 
          type="text" 
          placeholder='Search expenses...' 
          value={searchTerm} 
          onChange={(e)=>setSearchTerm(e.target.value)} 
          className='w-1/3 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
          />

          <select 
          value={sortOption} 
          onChange={(e)=> setSortOption(e.target.value)}
           className='w-1/3 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
          >

            <option value="newest">newest</option>
            <option value="oldest">oldest</option>
            <option value="high">high</option>
            <option value="low">low</option>

          </select>

        
          <select 
          name="Category" 
          value={filterCategory} 
          onChange={(e)=> setFilterCategory(e.target.value)}
           className='w-1/3 border border-gray-600 text-white placeholder-gray-400 rounded px-2 py-1 text-sm'
          >

            <option value="All">All</option>
            <option value="Income">Income</option>
            <option value="Food">Food</option>
            <option value="Shopping">Shopping</option>
            <option value="Accommodation">Accommodation</option>
            <option value="Utilities">Utilities</option>
            <option value="Transportation">Transportation</option>
            <option value="Personal Care">Personal Care</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travels & Trips">Travels & Trips</option>
            <option value="Miscellaneous">Miscellaneous</option>

          </select>
    </div>
  )
}

export default SearchSort