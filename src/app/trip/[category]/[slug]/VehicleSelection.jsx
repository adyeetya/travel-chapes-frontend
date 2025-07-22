import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';

const VehicleSelection = ({ selectedBatch, selectedOccupancy, vehicleCounts, handleVehicleCountChange, formatPrice }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-4">Select Vehicles</h3>
    <div className="space-y-4">
      {Object.entries(selectedBatch.pricing).map(([vehicle, pricing]) => (
        <Card key={vehicle}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium uppercase">{vehicle}</h4>
                <p className="text-sm text-gray-600">
                  ₹{formatPrice(pricing[selectedOccupancy])} per person
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleVehicleCountChange(vehicle, -1)}
                  disabled={!vehicleCounts[vehicle] || vehicleCounts[vehicle] <= 0}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">
                  {vehicleCounts[vehicle] || 0}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleVehicleCountChange(vehicle, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default VehicleSelection;
