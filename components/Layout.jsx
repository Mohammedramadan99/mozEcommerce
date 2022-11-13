import Head from "next/head";
import { useSelector } from "react-redux";
import Cart from "./Cart/Cart";
import Footer from "../components/Footer";
import dynamic from "next/dynamic";
const Navbar = dynamic(
  () => import('./Navbar'),
  { ssr: false }
)

export default function Layout({ title, children })
{
  const { showCart } = useSelector(state => state.products.cart)
  return (
    <>
      <Head>
        <title>{title ? title + " - moz" : "moz"}</title>
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar/>
        { showCart && <Cart /> }
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
