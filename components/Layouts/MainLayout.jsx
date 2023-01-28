import Head from "next/head";
import { useSelector } from "react-redux";
import Cart from "../Cart/Cart";
import Footer from "../Footer";
import dynamic from "next/dynamic";
const Navbar = dynamic(
  () => import('../Navbar'),
  { ssr: false }
)

export default function MainLayout({ title, children })
{
  const { showCart } = useSelector(state => state.products.cart)
  return (
    <>
      <Head>
        <title>{title ? title + " - moz" : "moz"}</title>
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
