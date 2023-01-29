import { fetchCategoriesAction, reset,deleteCategoryAction } from '../../../store/categorySlice'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Spinner from 'react-bootstrap/Spinner';
import { useRouter } from 'next/router';

export default function Category()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const {id} = router.query
  const { categories,loading,isDeleted } = useSelector(state => state.category)
  const { allProducts: products } = useSelector(state => state.products.productsList)
  const rows = categories && categories.map(cat =>
  {
    return {
      id: cat?._id,
      image: cat?.images && cat?.images[0]?.url,
      title: cat?.title,
    }
  })
  const columns = [
    { field: 'id', headerName: 'ID', width: 220, sortable: false },
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
    { field: 'title', headerName: 'title', width: 130 },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 220,
      renderCell: params =>
      {
        return (
          <div className='table__field'>
            <div className="table__field__icon" onClick={() => deleteProductHandler(params.row.id)}> <DeleteIcon /> </div>
            <div className="table__field__icon" onClick={() => editCategoryHandler(params.row.id)}> <EditIcon /> </div>
          </div>
        )
      }
    },
  ];
  const deleteProductHandler = (id) =>
{
    dispatch(deleteCategoryAction(id))
  }
  const editCategoryHandler = (id) =>
  {
    router.push(`/dashboard/category/edit/${id}`)
  }

  useEffect(() =>
  {
    dispatch(fetchCategoriesAction())
  }, [])
  
  useEffect(() => { 
    if (isDeleted)
    {
      dispatch(reset())
    }
  }, [dispatch,isDeleted])
  
  return (
    <div style={{ height: "90vh", width: '100%', backgroundColor: "#fff", padding: "20px" }}>
      {loading ? (
        <div className="loading--container">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
          <>
            <div className="add__btn" onClick={() => router.push('/dashboard/category/new')} > new category </div>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </>
      )}
    </div>
  )
}