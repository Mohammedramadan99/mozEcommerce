import {fetchProductsAction,deleteproductAction,reset} from '../../../store/productsSlice'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import DeleteIcon  from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router';

export default function Products()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { isDeleted,loading } = useSelector(state => state.products)
  const { allProducts: products } = useSelector(state => state.products.productsList)
  const rows = products && products.map(p =>
  {
    return {
      id: p._id,
      image: p.images && p.images[0].url,
      pCategory: p.category,
      pName: p.name,
      pDesc: p.description,
      price: p.price.toLocaleString(),
    }
  })
  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    {
      field: 'image', headerName: 'image', width: 130, sortable: false,
      renderCell: params =>
      {
        return (
          <div className="imageContainer" style={{ position: "relative", borderRadius: "50%", width: "40px", height: "40px", overflow: "hidden" }}>
            <Image src={params.row.image} alt="img" layout='fill' objectFit='contain' />
          </div>
        )
      }
    },
    { field: 'pName', headerName: 'name', width: 130 },
    { field: 'pCategory', headerName: 'category', width: 130 },
    {
      field: 'price',
      headerName: 'price',
      type: 'number',
      width: 90,
      sortable: true,
    },
    {
      field: 'pDesc',
      headerName: 'description',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 120,

    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 220,
      renderCell: params =>
      {
        return (
          <div className='table__field'>
            <div className="table__field__icon" onClick={() => deleteProductHandler(params.row.id) }> <DeleteIcon /> </div>
            <div className="table__field__icon" onClick={() => showProductHandler(params.row.id)}> <VisibilityIcon /> </div>
            <div className="table__field__icon" onClick={() => editProductHandler(params.row.id)}> <EditIcon /> </div>
          </div>
        )
      }
    },
  ];  
  const deleteProductHandler = (id) =>
  {
    dispatch(deleteproductAction(id))
  }
  const showProductHandler = (id) =>
  {
    router.push(`/dashboard/products/${id}`)
  }
  const editProductHandler = (id) =>
  {
    router.push(`/dashboard/products/edit/${id}`)
  }

  useEffect(() => {
    dispatch(fetchProductsAction())
  }, [dispatch,isDeleted])
  useEffect(() =>
  {
    if (isDeleted)
    {
      dispatch(reset())
    }
  }, [])
  
  return (
    <div style={{ height: "90vh", width: '100%', backgroundColor: "#fff", padding: "20px" }}>
      {loading ? (
        <div className="loading--container">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
      )}
    </div>
  )
}