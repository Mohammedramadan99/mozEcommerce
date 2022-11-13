import { useRouter } from 'next/router'
import ProductDetails from '../../components/ProductDetails/ProductDetails'

function productDetails()
{
  const router = useRouter();
  const {id} = router.query;
  // const {id} = req.query
  console.log(id)
  return <ProductDetails id={id} />
}

export default productDetails