import { createContext, useState, useEffect, useContext } from "react";
import { Auth, DataStore } from "aws-amplify";
import { Courier, Order, User, OrderDish } from "../models";
import { useAuthContext } from "./AuthContext";
import { LogBox } from "react-native-web";

const OrderContext = createContext({});

const OrderContextProvider = ({ children }) => {
  const { dbCourier } = useAuthContext();
  const [order, setOrder] = useState();
  const [user, setUser] = useState();
  const [dishes, setDishes] = useState();

  const fetchOrder = async (id) => {
    if (!id) {
      setOrder(null);
      return;
    }
    const fechedOrder = await DataStore.query(Order, id);
    setOrder(fechedOrder);
    DataStore.query(User, fechedOrder.userID).then(setUser);
    DataStore.query(OrderDish, (od) => od.orderID("eq", fechedOrder.id)).then(
      setDishes
    );
  };
  const acceptOrder = () => {
    DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "ACCEPTED";
        updated.Courier = dbCourier;
      })
    ).then(setOrder);
  };

  const pickUpOrder = () => {
    DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "PICKED_UP";
      })
    ).then(setOrder);
  };
  const completeOrder = () => {
    DataStore.save(
      Order.copyOf(order, (updated) => {
        updated.status = "COMPLETED";
      })
    ).then(setOrder);
  };
  return (
    <OrderContext.Provider
      value={{
        acceptOrder,
        order,
        user,
        dishes,
        fetchOrder,
        pickUpOrder,
        completeOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
