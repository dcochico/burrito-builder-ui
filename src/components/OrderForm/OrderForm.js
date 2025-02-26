import { useState } from "react";

const OrderForm = ({ addOrder, styles }) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [formError, setFormError] = useState('');

  const handleName = e => setName(e.target.value);

  const handleIngredients = e => {
    e.preventDefault();
    setIngredients(prevIngredients => [...prevIngredients, e.target.name]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (name && ingredients.length) {
      addOrder({ name: name, ingredients: ingredients });
      clearInputs();
    } else if (!name && !ingredients.length) {
      setFormError('Please add name and ingredients.');
    } else if (!name) {
      setFormError('Please add name.');
    } else if (!ingredients.length) {
      setFormError('Please add ingredients.');
    }
  }

  const clearInputs = () => {
    setName("");
    setIngredients([]);
    setFormError('');
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
        required
      />

      <div className="ingredient-buttons">{ingredientButtons}</div>

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      {formError && <h2 style={styles} >{formError}</h2>}
      <button onClick={e => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
