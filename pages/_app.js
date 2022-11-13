import { Provider} from "react-redux";
import Layout from "../components/Layout";
import { wrapper } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
const App = ({ Component, ...rest}) =>
{
  const { store, props } = wrapper.useWrappedStore(rest)
  return (
    <Provider store={store}>
          <Layout>
            <Component {...props.pageProps} />
          </Layout>
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