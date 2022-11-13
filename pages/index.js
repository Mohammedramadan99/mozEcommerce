import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../store/productsSlice";
import dynamic from "next/dynamic";
const Banner = dynamic(() => import("../components/Banner/Banner")); 
const AllCategories = dynamic(() => import("../components/Categories/AllCategories"));
const Categories = dynamic(() => import("../components/Categories/Categories"));
const CustomerSays = dynamic(() => import("../components/CustomerSays/CustomerSays"));
const Features = dynamic(() => import("../components/Features/Features"));
const ProductsSlider = dynamic(() => import("../components/Products/ProductsSlider"));
const SpecialOffer = dynamic(() => import("../components/SpecialOffer/SpecialOffer"));

export default function Home()
{
  const dispatch = useDispatch()
  const { productsList:{allProducts} } = useSelector((state) => state.products);

  useEffect(() =>
  {
    dispatch(fetchProductsAction());
  }, [])
  return (
    <div>
      {/* {userInfo?.name} */}
      <AllCategories />
      <Banner />
      <Categories />
      <ProductsSlider products={allProducts} />
      <SpecialOffer />
      <CustomerSays />
      <Features />
    </div>
  );
}