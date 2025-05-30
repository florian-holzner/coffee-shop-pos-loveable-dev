
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useOrder } from '@/context/OrderContext';
import { Trash2, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatCurrency } from '@/lib/utils';

const OrderSummary = () => {
  const { state, removeItem, updateQuantity, clearOrder, showOrderPreview } = useOrder();
  const { currentOrder } = state;

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-coffee-800">Current Order</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearOrder} 
          disabled={currentOrder.items.length === 0}
          className="text-gray-500 hover:text-red-500"
        >
          <span className="sr-only">Clear order</span>
          <Trash2 size={18} />
        </Button>
      </div>

      {currentOrder.items.length > 0 ? (
        <>
          <ScrollArea className="flex-1 mb-4">
            <div className="space-y-3">
              {currentOrder.items.map((item, index) => (
                <motion.div
                  key={`${item.product.id}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-between items-center p-2 rounded hover:bg-cream-50"
                >
                  <div className="flex-1">
                    <p className="font-medium text-coffee-800">{item.product.name}</p>
                    <p className="text-sm text-coffee-500">
                      {formatCurrency(item.product.price)} each
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                    >
                      <Minus size={14} />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    
                    <span className="w-6 text-center">{item.quantity}</span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                    >
                      <Plus size={14} />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-gray-400 hover:text-red-500 hover:bg-transparent"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 size={14} />
                      <span className="sr-only">Remove item</span>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          <div className="border-t border-gray-100 pt-4 space-y-2">
            <div className="flex justify-between text-lg font-medium">
              <span>Total</span>
              <span>{formatCurrency(currentOrder.total)}</span>
            </div>

            <Button 
              onClick={showOrderPreview}
              className="w-full bg-coffee-700 hover:bg-coffee-800"
            >
              Review Order
            </Button>
          </div>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
          <CupSoda size={48} className="mb-2 opacity-20" />
          <p>No items in your order yet</p>
          <p className="text-sm">Select items from the menu to get started</p>
        </div>
      )}
    </div>
  );
};

import { CupSoda } from 'lucide-react';

export default OrderSummary;
