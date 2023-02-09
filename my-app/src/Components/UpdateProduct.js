import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [prevName, setPrevName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [msg, setMsg] = useState("");

  const token = JSON.parse(localStorage.getItem("token"));
  const productId = useParams();
  const navigate = useNavigate();


  const capitalizeFirstChar = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    getPreFilledData();
    // eslint-disable-next-line 
  }, []);

  const getPreFilledData = async () => {
    await axios
      .get(`product-routes/product/${productId.id}`, {
        headers: { authorization: `bearer ${token.token}` },
      })
      .then((res) => {
        const { product } = res.data;

        setName(product.name);
        setPrevName(product.name);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
       
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProductHandler = async () => {
    if(brand !==null && price !==null && name !==null){
      await axios
      .put(
        `product-routes/product/${productId.id}`,

        {
          name,
          price,
          brand,
          category,
        },
        {
          headers: { authorization: `bearer ${token.token}` },
        }
      )
      .then((res) => {
        res.data.success &&
          setMsg(`${name} updated successfully. \n Redirecting you in 3secs`);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      });
    }else{
      setMsg(`All fields are required..!`)
    }
  };

  return (
    <div>
      <h2 className="text-center my-4">Update {prevName}:</h2>
      {msg !== "" ? <p className="text-center message text-danger">{msg}</p> : <p className="message"></p>}
      <form className="m-auto w-50 ">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            onChange={(e) => {
              setName(capitalizeFirstChar(e.target.value));
            }}
            type="text"
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
            className="form-control"
            value={price}
            placeholder="in rupees"
            required
          />
        </div>

        <button
          onClick={updateProductHandler}
          type="button"
          className="btn btn-dark"
        >
          Update Product
        </button>
      </form>
    </div>
  );
}
