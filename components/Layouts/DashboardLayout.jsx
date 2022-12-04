import dynamic from "next/dynamic";
import Head from "next/head";
import { useSelector } from "react-redux";

const Dashboard = dynamic(() => import("../Admin/Dashboard"));

export default function DashboardLayout({ title, children })
{
  
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
