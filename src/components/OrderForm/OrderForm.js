import { useState } from "react";

const OrderForm = (props) => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState('')

  console.log(name, ingredients)

  const styles = { color: 'red' };

  const handleName = e => setName(e.target.value);

  const handleIngredients = e => {
    e.preventDefault();
    setIngredients(prevIngredients => [...prevIngredients, e.target.name]);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (name && ingredients.length) {
      console.log('Success.')
    } else if (!name && !ingredients.length) {
      setError('Please add name and ingredients');
    } else if (!name) {
      setError('Please add name.')
    } else if (!ingredients.length) {
      setError('Please add ingredients.')
    }
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
        required
      />

      {ingredientButtons}

      <p>Order: {ingredients.join(", ") || "Nothing selected"}</p>
      {error && <h2 style={styles} >{error}</h2>}
      <button onClick={(e) => handleSubmit(e)}>Submit Order</button>
    </form>
  );
}

export default OrderForm;
