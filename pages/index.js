import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAction } from "../store/productsSlice";
import dynamic from "next/dynamic";
import { Spinner } from "react-bootstrap";
import { fetchCategoriesAction } from "../store/categorySlice";
import { fetchGlobalReviewsAction } from "../store/reviewUsSlice";
import useProducts from "../hooks/useProducts";
const Banner = dynamic(() => import("../components/Banner/Banner"), {
  ssr: false,
});
const AllCategories = dynamic(
  () => import("../components/Categories/AllCategories"),
  {
    ssr: false,
  }
);
const Categories = dynamic(
  () => import("../components/Categories/Categories"),
  {
    ssr: false,
  }
);
const CustomerSays = dynamic(
  () => import("../components/CustomerSays/CustomerSays"),
  {
    ssr: false,
  }
);
const Features = dynamic(() => import("../components/Features/Features"), {
  ssr: false,
});
const ProductsSlider = dynamic(
  () => import("../components/Products/ProductsSlider"),
  {
    ssr: false,
  }
);
const SpecialOffer = dynamic(
  () => import("../components/SpecialOffer/SpecialOffer"),
  {
    ssr: false,
  }
);

export default function Home() {
  const dispatch = useDispatch();
  const { data } = useProducts();
  console.log({ data });
  const {
    productsList: { allProducts },
  } = useSelector((state) => state.products);
  const { loading: productsLoading } = useSelector((state) => state.products);
  // const { loading: reviewusLoading } = useSelector(
  //   (state) => state.globalReviews
  // );
  // const loading = productsLoading || categoryLoading ? true : false
  useEffect(() => {
    // dispatch(fetchProductsAction());
  }, [dispatch]);
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
