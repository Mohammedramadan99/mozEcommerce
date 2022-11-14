import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
// import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { reset, createCategoryAction } from "../../store/categorySlice";
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

const NewCategory = () =>
{
  const dispatch = useDispatch()

  // const navigate = useNavigate()

  // const { isError, message } = useSelector((state) => state.auth);
  // const { isCreated, isLoading } = useSelector((state) => state.products);

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // const categories = [
  //   'burger',
  //   'bagels',
  //   'checken',
  //   'cake',
  //   'mexican food'
  // ];


  const createProductSubmitHandler = (e) =>
  {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("title", title);

    images.forEach((image) =>
    {
      myForm.append("images", image);
    });

    const data = {
      title,
      images
    }
    console.log(data)
    dispatch(createCategoryAction(data));
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
              <StorageIcon />
              <input
                type="text"
                placeholder="category"
                required
                onChange={(e) => setTitle(e.target.value)}
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

export default NewCategory;
