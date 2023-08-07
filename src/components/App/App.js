import { useEffect, useState } from "react";
import "./App.css";
import { getOrders, postOrder } from "../../apiCalls";
import Orders from "../../components/Orders/Orders";
import OrderForm from "../../components/OrderForm/OrderForm";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState('');
  const [error, setError] = useState('');

  console.log('newOrder', newOrder);
  console.log('orders', orders);

  useEffect(() => {
    getOrders()
      .then(res => {
        if (!res.ok) {
          throw Error('There has been an error.')
        }
        return res.json()
      })
      .then(data => {
        setOrders(data.orders)
        setError('')
      })
      .catch(err => setError(err));
  }, []);

  useEffect(() => {
    if (newOrder) {
      postOrder(newOrder)
      .then(res => {
        if (!res.ok) {
          throw Error('There has been an error.')
        }
        return res.json()
      })
      .then(data => {
        setOrders([...orders, data])
        setNewOrder('')
        setError('')
      })
      .catch(err => setError(err));
    }
  }, [newOrder]);

  const addOrder = order => setNewOrder(order)

  return (
    <main className="App">
      <header>
        <h1>Burrito Builder</h1>
        <OrderForm addOrder={addOrder} />
      </header>

      <Orders orders={orders} />
    </main>
  );
}

export default App;
