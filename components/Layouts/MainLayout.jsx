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
        <meta name="description" content="Ecommerce Website" />
        <link rel="icon" href="/favicon.ico" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=The+Nautigal:wght@400;700&display=swap" rel="stylesheet" />

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
