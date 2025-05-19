
import { Order, Product, OrderItem } from '../types/pos';
import { v4 as uuidv4 } from 'uuid';

// Define the state
export interface OrderState {
  currentOrder: Order;
  orderHistory: Order[];
}

// Define actions
export type OrderAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { index: number; quantity: number } }
  | { type: 'CLEAR_ORDER' }
  | { type: 'COMPLETE_ORDER' };

// Initial state
export const initialState: OrderState = {
  currentOrder: {
    id: uuidv4(),
    items: [],
    total: 0,
    status: 'pending',
    createdAt: new Date(),
  },
  orderHistory: [],
};

// Reducer function
export const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const newItem: OrderItem = {
        product: action.payload,
        quantity: 1,
      };

      // Check if the item already exists
      const existingItemIndex = state.currentOrder.items.findIndex(
        (item) => item.product.id === action.payload.id
      );

      let updatedItems: OrderItem[];
      
      if (existingItemIndex >= 0) {
        // Increase quantity if item already exists
        updatedItems = state.currentOrder.items.map((item, index) => {
          if (index === existingItemIndex) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        // Add new item
        updatedItems = [...state.currentOrder.items, newItem];
      }

      // Calculate new total
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: updatedItems,
          total: parseFloat(newTotal.toFixed(2)),
        },
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.currentOrder.items.filter(
        (_, index) => index !== action.payload
      );
      
      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: updatedItems,
          total: parseFloat(newTotal.toFixed(2)),
        },
      };
    }

    case 'UPDATE_QUANTITY': {
      const { index, quantity } = action.payload;
      
      if (quantity <= 0) {
        // If quantity is 0 or less, remove the item
        return orderReducer(state, { type: 'REMOVE_ITEM', payload: index });
      }

      const updatedItems = state.currentOrder.items.map((item, i) => {
        if (i === index) {
          return { ...item, quantity };
        }
        return item;
      });

      const newTotal = updatedItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          items: updatedItems,
          total: parseFloat(newTotal.toFixed(2)),
        },
      };
    }

    case 'CLEAR_ORDER': {
      return {
        ...state,
        currentOrder: {
          id: uuidv4(),
          items: [],
          total: 0,
          status: 'pending',
          createdAt: new Date(),
        },
      };
    }

    case 'COMPLETE_ORDER': {
      // Make sure there are items in the order
      if (state.currentOrder.items.length === 0) {
        return state;
      }
      
      const completedOrder: Order = {
        ...state.currentOrder,
        status: 'completed',
      };

      return {
        orderHistory: [completedOrder, ...state.orderHistory],
        currentOrder: {
          id: uuidv4(),
          items: [],
          total: 0,
          status: 'pending',
          createdAt: new Date(),
        },
      };
    }

    default:
      return state;
  }
};
