import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const BatchSelection = ({ filteredBatches, selectedBatch, setSelectedBatch }) => (
  <div className="mb-8">
    <h3 className="text-xl font-semibold mb-4">Select Your Travel Dates</h3>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredBatches.map(batch => (
        <Card
          key={batch._id}
          className={`cursor-pointer ${selectedBatch?._id === batch._id ? 'border-blue-500 bg-blue-50' : ''}`}
          onClick={() => setSelectedBatch(batch)}
        >
          <CardHeader>
            <CardTitle className="text-lg">
              {format(new Date(batch.startDate), 'dd MMM')} - {format(new Date(batch.endDate), 'dd MMM yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary" className="bg-green-100 text-green-800">Available</Badge>
            <p className="text-sm mt-2">
              From ₹{Math.min(
                batch.pricing.bus?.single > 0 ? batch.pricing.bus.single : batch.pricing.bus.double,
                batch.pricing.bus?.double,
                batch.pricing.bus?.triple
              )}/person
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default BatchSelection;
