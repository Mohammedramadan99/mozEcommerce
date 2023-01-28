import AOS from "aos";
import { Provider} from "react-redux";
import { wrapper } from "../store/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.scss";
import { useRouter } from "next/router";
import DashboardLayout from '../components/Layouts/DashboardLayout'
import MainLayout from "../components/Layouts/MainLayout";
import "aos/dist/aos.css";

import Note from "../components/Layouts/Note";
import { useEffect } from "react";

const App = ({ Component, ...rest}) =>
{
  const { store, props } = wrapper.useWrappedStore(rest)
  const router = useRouter()
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      // once: true,
      offset: 50,
    });
  }, []);

  return (
    <Provider store={store}>
      <Note />
      {router.asPath.startsWith("/dashboard") ? (
        <DashboardLayout>
          <Component {...props.pageProps} />
        </DashboardLayout>
      ) : (
        <MainLayout>
          <Component {...props.pageProps} />
        </MainLayout>
      )}
    </Provider>
  );
};
  
export default App


