
import React, { useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Order } from '@/types/pos';
import { formatCurrency } from '@/lib/utils';

interface ReceiptProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
}

const Receipt = ({ order, open, onClose }: ReceiptProps) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  if (!order) {
    return null;
  }

  const printReceipt = () => {
    const printContent = document.createElement('div');
    
    if (receiptRef.current) {
      printContent.innerHTML = receiptRef.current.innerHTML;
    }
    
    const originalBody = document.body.innerHTML;
    document.body.innerHTML = printContent.innerHTML;
    
    window.print();
    document.body.innerHTML = originalBody;
    
    // Rehydrate the app
    window.location.reload();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(new Date(date));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receipt</DialogTitle>
        </DialogHeader>
        
        <div ref={receiptRef} className="py-4 px-1">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold">Brew Haven Coffee</h2>
            <p className="text-sm text-gray-500">123 Coffee Lane</p>
            <p className="text-sm text-gray-500">Beansville, CA 90210</p>
          </div>
          
          <div className="text-sm mb-4 flex justify-between">
            <span>Order: #{order.id.slice(0, 6)}</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          
          <div className="border-t border-b border-dashed border-gray-200 py-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left">
                  <th className="pb-1">Item</th>
                  <th className="text-center pb-1">Qty</th>
                  <th className="text-right pb-1">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index}>
                    <td className="py-1">{item.product.name}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-right">
                      {formatCurrency(item.product.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-3 text-right">
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>
          
          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Thank you for your order!</p>
            <p>Come back soon!</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button onClick={printReceipt}>
            Print Receipt
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Receipt;
