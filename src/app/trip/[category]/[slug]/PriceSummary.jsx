import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const PriceSummary = ({ totalPrice, selectedBatch, formatPrice, handlePayNow, isProcessing }) => (
  <Card className="sticky bottom-0 bg-white border-t">
    <CardContent className="p-4">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-600">Total Amount</div>
          <div className="text-2xl font-bold">₹{formatPrice(totalPrice)}</div>
          <div className="text-xs text-gray-500">incl. {selectedBatch.gst}% GST</div>
        </div>
        <Button
          onClick={handlePayNow}
          className="bg-green-600 hover:bg-green-700"
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default PriceSummary;
