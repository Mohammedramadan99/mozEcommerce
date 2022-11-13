import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
// import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { reset, createProductAction } from "../../store/productsSlice";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
// import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

// import Spinner from "../Layout/Spinner";
// import { useNavigate } from 'react-router-dom'
// const Sidebar = lazy(() => import("./Sidebar"));

const NewProduct = () =>
{
  const dispatch = useDispatch()

  // const navigate = useNavigate()

  // const { isError, message } = useSelector((state) => state.auth);
  // const { isCreated, isLoading } = useSelector((state) => state.products);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    'burger',
    'bagels',
    'checken',
    'cake',
    'mexican food'
  ];


  const createProductSubmitHandler = (e) =>
  {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) =>
    {
      myForm.append("images", image);
    });

    const data = {
      name,
      price,
      description,
      category,
      Stock,
      images
    }
    console.log(data)
    dispatch(createProductAction(data)); 
  };

  const createProductImagesChange = (e) =>
  {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) =>
    {
      const reader = new FileReader();

      reader.onload = () =>
      {
        if (reader.readyState === 2)
        {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <Fragment>
      {/* <MetaData title="Create Product" /> */}
      <div className="admin">
        <Suspense fallback={<div>loading ... </div>}>
          {/* <Sidebar /> */}
        </Suspense>

        {/* Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minus molestiae dolorum ab maxime saepe adipisci. Inventore doloremque at odio pariatur, aliquid vel. Accusamus perferendis commodi ipsa illo tenetur dolores necessitatibus. */}
        
          <div className="newProduct" data-aos="zoom-in">
            <form
              className="newProduct__Form"
              encType="multipart/form-data"
              onSubmit={createProductSubmitHandler}
            >
              <div className="newProduct__Form__Heading">Create Product</div>

              <div className="item">
                <SpellcheckIcon />
                <input
                  type="text"
                  placeholder="Product Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="item">
                <AttachMoneyIcon />
                <input
                  type="number"
                  placeholder="Price"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="item">
                <DescriptionIcon />

                <textarea
                  placeholder="Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  cols="30"
                  rows="1"
                ></textarea>
              </div>
              {/* category */}
              <div className="item">
                <AccountTreeIcon />
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Choose Category</option>
                  {categories.map((cate) => (
                    <option key={cate} value={cate}>
                      {cate}
                    </option>
                  ))}
                </select>
              </div>

              <div className="item">
                <StorageIcon />
                <input
                  type="number"
                  placeholder="Stock"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>

              {/* file upload */}
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>

              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>

              <button
                id="createProductBtn"
                type="submit"
                // disabled={isLoading ? true : false}
                className="newProduct__Form__btn"
              >
                Create
              </button>
            </form>
          </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
