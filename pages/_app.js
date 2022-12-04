import { Provider} from "react-redux";
import MainLayout from "../components/Layouts/MainLayout";
import { wrapper } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const DashboardLayout = dynamic(() => import("../components/Layouts/DashboardLayout"));

const App = ({ Component, ...rest}) =>
{
  const { store, props } = wrapper.useWrappedStore(rest)
  const router = useRouter()
  
  return (
    <Provider store={store}>
      {/* <Elements stripe={stripePromise}> */}
      {router.asPath === "/dashboard" ? ( // ! don't make it with === 3 equals : because it will work only if the link = /dashboard ---- but if equal '/dashboard/products' it will not work good .. so the sidebar and nav will not come
        
        <DashboardLayout>
          <Component {...props.pageProps} />
        </DashboardLayout>
      ) : (
        <MainLayout>
          <Component {...props.pageProps} />
        </MainLayout>
      )}
      {/* </Elements> */}
    </Provider>
  );
};
  
export default App
  // ramadanmohammed502@gmail.com
  
  //   <Elements
  //     stripe={loadStripe(
  //       "pk_test_51M0i4WChQsYHEZth7Xri00q00bhvOpxkNZfsmtNGe11pKTRVhqXLuDRl1O5QC8lpOp6cbSMXxNm9WYRXozgEtaIr00islBBvHz"
  //     )}
  //   >
      // <CardNumberElement>
    // {/* </CardNumberElement> */}
//   </Elements>