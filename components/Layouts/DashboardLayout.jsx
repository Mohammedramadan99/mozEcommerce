import Head from "next/head";
import { useSelector } from "react-redux";
import Dashboard from "../Admin/Dashboard";

export default function DashboardLayout({ title, children })
{
  const { showCart } = useSelector(state => state.products.cart)
  return (
    <>
      <Head>
        <title>{title ? title + " - moz" : "moz"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard childrenTwo={children}/>
    </>
  );
}
