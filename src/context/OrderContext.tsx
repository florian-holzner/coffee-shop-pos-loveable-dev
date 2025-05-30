
import React, { createContext, useContext, useReducer, useState } from 'react';
import { Product } from '../types/pos';
import { toast } from '@/components/ui/sonner';
import { orderReducer, initialState, OrderState, OrderAction } from './orderReducer';

interface OrderContextType {
  state: OrderState;
  dispatch: React.Dispatch<OrderAction>;
  addItem: (product: Product) => void;
  removeItem: (index: number) => void;
  updateQuantity: (index: number, quantity: number) => void;
  clearOrder: () => void;
  showOrderPreview: () => void;
  completeOrder: () => void;
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
}

// Create the context
const OrderContext = createContext<OrderContextType>({
  state: initialState,
  dispatch: () => null,
  addItem: () => null,
  removeItem: () => null,
  updateQuantity: () => null,
  clearOrder: () => null,
  showOrderPreview: () => null,
  completeOrder: () => null,
  previewOpen: false,
  setPreviewOpen: () => null,
});

// Provider component
export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  const [previewOpen, setPreviewOpen] = useState(false);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    toast(`Added ${product.name} to order`);
  };

  const removeItem = (index: number) => {
    const itemName = state.currentOrder.items[index]?.product.name;
    dispatch({ type: 'REMOVE_ITEM', payload: index });
    if (itemName) {
      toast(`Removed ${itemName} from order`);
    }
  };

  const updateQuantity = (index: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { index, quantity } });
  };

  const clearOrder = () => {
    dispatch({ type: 'CLEAR_ORDER' });
    toast('Order cleared');
  };

  const showOrderPreview = () => {
    if (state.currentOrder.items.length === 0) {
      toast.error('Cannot complete an empty order');
      return;
    }
    setPreviewOpen(true);
  };

  const completeOrder = () => {
    dispatch({ type: 'COMPLETE_ORDER' });
    setPreviewOpen(false);
    toast.success('Order completed!');
  };

  return (
    <OrderContext.Provider
      value={{ 
        state, 
        dispatch, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearOrder, 
        showOrderPreview,
        completeOrder,
        previewOpen,
        setPreviewOpen
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Custom hook to use the context
export const useOrder = () => useContext(OrderContext);

// Re-export types that might be needed by consumers of this context
export type { OrderState, OrderAction } from './orderReducer';
