import React from 'react';
import { Button } from '@/components/ui/button';

const BatchFilters = ({ filterType, setFilterType, sortType, setSortType }) => (
  <div className='flex justify-between items-center mb-6'>
    <div className=" flex gap-2 items-center">
      <span className="font-medium">Show:</span>
      <Button variant={filterType === 'thisMonth' ? 'default' : 'outline'} onClick={() => setFilterType('thisMonth')}>This Month</Button>
      <Button variant={filterType === 'nextMonth' ? 'default' : 'outline'} onClick={() => setFilterType('nextMonth')}>Next Month</Button>
      <Button variant={filterType === 'all' ? 'default' : 'outline'} onClick={() => setFilterType('all')}>All</Button>
    </div>
    <div className=" flex gap-2 items-center">
      <label className="font-medium">Sort:</label>
      <select value={sortType} onChange={e => setSortType(e.target.value)} className="border rounded px-2 py-1">
        <option value="date">By Date</option>
        <option value="price">By Price</option>
      </select>
    </div>
  </div>
);

export default BatchFilters;
