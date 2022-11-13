import { useEffect } from "react"
import { useDispatch } from "react-redux"
import MuiBreadcrumbs from "../../components/Breadcrumbs/Breadcrumbs"
import Products from "../../components/Products/Products"
import {fetchProductsAction} from '../../store/productsSlice'
function index()
{ 
  return (
    <Products/>
  )
}

export default index