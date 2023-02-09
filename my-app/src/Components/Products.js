import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");
  const token = JSON.parse(localStorage.getItem("token"));
  const uname = JSON.parse(localStorage.getItem("user")).name;

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line 
  }, []);

  const getProducts = async () => {
    await axios
      .get(`/product-routes/`, {
        headers: { authorization: `bearer ${token.token}` },
      })
      .then((res) => {
        res.data.success
          ? setProducts(res.data.products)
          : setMsg(res.data.msg);
      });
  };

  const SearchOptions = async (e) => {
    e.target.value !== ""
      ? await axios
        .get(`product-routes/search/${e.target.value}`, {
          headers: { authorization: `bearer ${token.token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setProducts(res.data.product);
          } else {
            setMsg(res.data.msg);
          }
        })
      : getProducts();
  };

  const deleteHandler = async (p_id) => {
    const box = window.confirm("Are you sure want to delete..?");
    if (box) {
      await axios
        .delete(`product-routes/product/${p_id}`, {
          headers: { authorization: `bearer ${token.token}` },
        })
        .then((res) => {
          getProducts();
          res.data.result.deletedCount === 1
            ? setMsg(
              `${res.data.product.brand} ${res.data.product.name} deleted successfully`
            )
            : setMsg("No such product found");
        });
    } else {
      setMsg("You cancelled the operation..!");
    }
  };

  return (
    <div className="product-list">
       <h6 id="user-name">Welcome: {uname}</h6>
      <h2 className="text-center ">All Products</h2>
      {msg !== "" ? <p className="text-center message text-danger">{msg}</p> : <p className="message"></p>}
      <h6 id="total-records">Total Records: {products.length}</h6>
      <div className="search-container">
        <input
          onChange={(e) => {
            SearchOptions(e);
          }}
          className="left"
          type="text"
          placeholder="Search by name/brand"
        />
        <div className="right">
          <label className="me-2">Category:</label>
          <select
            onChange={(e) => {
              SearchOptions(e);
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
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Name</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Added by</th>
              <th scope="col">Operations</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price} &#8377;</td>
                  <td>{product.addedBy}</td>
                  <td>
                    <Link
                      title={`Update ${product.name}`}
                      to={`/UpdateProduct/${product._id}`}
                    >
                      <i className="uil me-3 uil-pen icon"></i>
                    </Link>

                    <i
                      title={`Delete ${product.name}`}
                      onClick={() => {
                        deleteHandler(product._id);
                      }}
                      className="uil text-danger uil-trash-alt icon"
                    ></i>
                  </td>
                </tr>
              );
            })}
            ;
          </tbody>
        </table>
      </div>
    </div>
  );
}
