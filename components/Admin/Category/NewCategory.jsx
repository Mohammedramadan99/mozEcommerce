import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { reset, createCategoryAction } from "../../../store/categorySlice";
import Image from "next/image";
import {useRouter} from 'next/router'
const NewCategory = () =>
{
  const dispatch = useDispatch()
  const router = useRouter()
  const {categoryCreated,loading,isCreated} = useSelector(state => state.category)

  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const submitHandler = () =>
  {
    const catData = {
      id, data: { title, image }
    }
    dispatch(updateCategoryAction(catData))
  }
  
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
    dispatch(createCategoryAction(data));
  };

  const createProductImagesChange = (e) =>
  {
    e.preventDefault()
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
  useEffect(() => {
    if(isCreated){
      router.push('/dashboard/category')
    }
  }, [isCreated])
  
  return (
    <>
      <div className='dashboard__container__editCategory__wrapper'>
          <>
            <div className="dashboard__container__editCategory__wrapper__basicInfo">
            <form className="dashboard__container__editCategory__wrapper__basicInfo__form" onSubmit={e => createProductSubmitHandler(e)}>
                <div className="dashboard__container__editCategory__wrapper__basicInfo__form__item">
                  <label> title </label>
                  <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
              </div>
              <div id="dashboard__container__editCategory__wrapper__basicInfo__form__item">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={createProductImagesChange}
                  multiple
                />
              </div>
                <input type="submit" className='dashboard__container__editCategory__wrapper__basicInfo__form__submit' />
              </form>

            </div>
            <div className="dashboard__container__editCategory__wrapper__left">
              <div className="dashboard__container__editCategory__wrapper__left__img img--container">
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <Image key={index} src={image} layout="fill" objectFit='contain' alt="img" />
                ))}
              </div>
              </div>
              <div className="dashboard__container__editCategory__wrapper__left__stock">
              </div>
            </div>
          </>
      </div>
    </>
  );
};

export default NewCategory;
