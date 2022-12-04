import { fetchUsersAction,deleteUserAction,reset } from '../../../store/usersSlice'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import { Spinner } from 'react-bootstrap';



export default function Users({ setUserId, setDashboardComponent })
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { usersList,isDeleted,loading } = useSelector(state => state.users)
  const rows = usersList && usersList?.map(p =>
  {
    return {
      id: p._id,
      image: p.personalImage && p.personalImage.url,
      name: p.name,
      role: p.role,
      email: p.email,
      created: p.createdAt,
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
    { field: 'name', headerName: 'name', width: 130 },
    {
      field: 'role',
      headerName: 'role',
      type: 'string',
      width: 90,
      sortable: true,
      // valueGetter: (params) =>
      //   `$${params.row.price || ''}`,
    },
    {
      field: 'email',
      headerName: 'email',
      // description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 300,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 150,
      renderCell: params =>
      {
        return (
          <div className='table__field'>
            <div className="table__field__icon" onClick={() => deleteProductHandler(params.row.id)}> <DeleteIcon /> </div>
            <div className="table__field__icon" onClick={() => showProductHandler(params.row.id)}> <VisibilityIcon /> </div>
          </div>
        )
      }
    },
  ];
  const deleteProductHandler = (id) =>
  {
    // action 
    dispatch(deleteUserAction(id))
  }
  const showProductHandler = (id) =>
  {
    router.push(`dashboard/users/${id}`)
  }
  useEffect(() =>
  {
    dispatch(fetchUsersAction())
  }, [dispatch])
  useEffect(() =>
  {
    if (isDeleted) {
      dispatch(reset())
      dispatch(fetchUsersAction())
      router.push('/dashboard')
    }
  }, [isDeleted])

  return (
    <div style={{ height: "70vh", width: '100%', backgroundColor: "#fff", padding: "20px" }} className="orders" >
      {loading ? (
        <div className="loading--container" >
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
  );
}