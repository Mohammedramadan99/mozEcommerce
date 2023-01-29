import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../store/productsSlice";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
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
  const { productsList:{ allProducts } } = useSelector((state) => state.products);
  const { loading: productsLoading } = useSelector((state) => state.products);
  const { loading: categoryLoading } = useSelector((state) => state.category);
  // const { loading: reviewusLoading } = useSelector(
  //   (state) => state.globalReviews
  // );
  // const loading = productsLoading || categoryLoading ? true : false
  useEffect(() => 
  {
    dispatch(fetchProductsAction());
  }, [])
  return (
    <div>
      {productsLoading ? (
        <div
          className="spinner"
          style={{
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <AllCategories />
          <Banner />
          <Categories />
          <ProductsSlider products={allProducts} />
          <SpecialOffer />
          <CustomerSays />
          <Features />
        </>
      )}
    </div>
  );
}