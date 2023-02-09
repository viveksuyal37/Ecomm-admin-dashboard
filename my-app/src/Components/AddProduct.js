import { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Mobiles, Tablets, PCs");
  const [msg, setMsg] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));

  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const addProductHandler = async () => {
    const userName = JSON.parse(localStorage.getItem("user")).name;
    await axios
      .post(
        `product-routes/add-product`,

        {
          name: name,
          brand: brand,
          price: price,
          category: category,
          addedBy: userName,
        },
        {
          headers: { authorization: `bearer ${token.token}` },
        }
      )
      .then((res) => {
        setMsg(res.data.msg);
      });
  };

  return (
    <div>
      <h2 className="text-center my-4">Add Product</h2>
      {msg !== "" ? <p className="text-center message text-danger">{msg}</p> : <p className="message"></p>}
      <form className="m-auto w-50 form">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            onChange={(e) => {
              setName(capitalizeFirstChar(e.target.value));
            }}
            type="text"
            placeholder="Enter product name"
            className="form-control"
            value={name}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Brand</label>
          <input
            onChange={(e) => {
              setBrand(capitalizeFirstChar(e.target.value));
            }}
            type="text"
            placeholder="Enter a brand name"
            className="form-control"
            value={brand}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            value={category}
            className="form-select"
            aria-label="Default select example"
            required
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option disabled>Choose a category:</option>
            <option>Mobiles, Tablets, PCs</option>
            <option>Appliances</option>
            <option>Fashion</option>

            <option>Home, Kitchens</option>
            <option>Beauty, Health</option>
            <option>Sports, Fitness</option>
            <option>Books</option>
            <option>Toys, Baby Products</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            type="number"
            placeholder="in rupees"
            className="form-control"
            value={price}
            required
          />
        </div>

        <button
          onClick={addProductHandler}
          type="button"
          className="btn btn-dark"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
