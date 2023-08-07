import React from "react";
import { nanoid } from "nanoid";
import "./Orders.css";

const Orders = ({ orders }) => {
  const orderEls = orders.map((order) => {
    let orderKey = nanoid();
    return (
      <div key={orderKey} className="order">
        <h3>{order.name}</h3>
        <ul className="ingredient-list">
          {order.ingredients.map((ingredient) => {
            let ingredientKey = nanoid();
            return <li key={ingredientKey} >{ingredient}</li>;
          })}
        </ul>
      </div>
    );
  });

  return (
    <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
  );
};

export default Orders;
