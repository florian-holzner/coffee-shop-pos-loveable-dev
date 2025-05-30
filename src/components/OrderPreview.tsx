
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Order } from '@/types/pos';
import { formatCurrency } from '@/lib/utils';
import { CreditCard, DollarSign } from 'lucide-react';

interface OrderPreviewProps {
  order: Order | null;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

type PaymentType = 'cash' | 'credit-card' | 'debit-card' | 'paypal';

const paymentOptions = [
  { value: 'cash', label: 'Cash', icon: DollarSign },
  { value: 'credit-card', label: 'Credit Card', icon: CreditCard },
  { value: 'debit-card', label: 'Debit Card', icon: CreditCard },
  { value: 'paypal', label: 'PayPal', icon: CreditCard },
] as const;

const OrderPreview = ({ order, open, onClose, onConfirm }: OrderPreviewProps) => {
  const [paymentType, setPaymentType] = useState<PaymentType>('cash');

  if (!order) {
    return null;
  }

  const handleConfirm = () => {
    console.log('Payment type selected:', paymentType);
    onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Order Preview</DialogTitle>
          <DialogDescription>
            Please review your order and select a payment method before completing the purchase.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatCurrency(item.product.price)} × {item.quantity}
                  </p>
                </div>
                <span className="font-medium">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-between items-center text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-base font-medium">Payment Method</Label>
            <RadioGroup value={paymentType} onValueChange={(value) => setPaymentType(value as PaymentType)}>
              {paymentOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <Label htmlFor={option.value} className="flex items-center space-x-2 cursor-pointer">
                      <IconComponent size={16} />
                      <span>{option.label}</span>
                    </Label>
                  </div>
                );
              })}
            </RadioGroup>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="bg-coffee-700 hover:bg-coffee-800">
            Complete Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderPreview;
