import React from 'react';
import { Button } from '@/components/ui/button';

const OccupancySelection = ({ availableTypes, selectedOccupancy, setSelectedOccupancy }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">Select Occupancy Type</h3>
    <div className="grid grid-cols-2 gap-3 sm:flex sm:gap-4">
      {availableTypes.map(occupancy => (
        <Button
          key={occupancy}
          variant={selectedOccupancy === occupancy ? 'default' : 'outline'}
          onClick={() => setSelectedOccupancy(occupancy)}
        >
          {occupancy.charAt(0).toUpperCase() + occupancy.slice(1)} Occupancy
        </Button>
      ))}
    </div>
  </div>
);

export default OccupancySelection;
