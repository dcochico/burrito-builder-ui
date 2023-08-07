import { useState } from "react";

const OrderForm = (props) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  console.log(name, ingredients)

  const handleName = e => setName(e.target.value);

  const handleIngredients = e => {
    e.preventDefault();
    setIngredients(prevIngredients => [...prevIngredients, e.target.name]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    clearInputs();
  }

  const clearInputs = () => {
    setName("");
    setIngredients([]);
  };

  const possibleIngredients = [
    "beans",
    "steak",
    "carnitas",
    "sofritas",
    "lettuce",
    "queso fresco",
    "pico de gallo",
    "hot sauce",
    "guacamole",
    "jalapenos",
    "cilantro",
    "sour cream",
  ];
  const ingredientButtons = possibleIngredients.map((ingredient) => {
    return (
      <button
        key={ingredient}
        name={ingredient}
        onClick={e => handleIngredients(e)}
      >
        {ingredient}
      </button>
    );
  });

  return (
    <form>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={e => handleName(e)}
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>

      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
