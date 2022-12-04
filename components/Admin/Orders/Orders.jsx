import { fetchOrdersAction, updateOrderAction, reset } from '../../../store/orderSlice'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRouter } from 'next/router';
import moment from 'moment/moment';
import Spinner from 'react-bootstrap/Spinner'
import Header from '../Header';

export default function Orders()
{
  const dispatch = useDispatch()
  const router = useRouter()
  const { ordersList, isDeleted, isUpdated, updateLoading,loading } = useSelector(state => state.order)
  const rows = ordersList && ordersList?.map(order =>
    {
      return {
      id: order?._id,
      client: order?.user,
      products: order?.products?.length,
      amount: (order?.total / 100)?.toLocaleString(),
      deliveryStatus: order?.delivery_status,
      date: moment(order?.createdAt).fromNow()
    }
  })

  console.log("rows", rows)

  const columns = [
    { field: 'id', headerName: 'ID', width: 70, sortable: false },
    {
      field: 'client', headerName: 'client', width:90 , sortable: false,
      renderCell: params =>
      {
        return (
          <>
            <div className="imageContainer" style={{ position: "relative", borderRadius: "50%", width: "40px", height: "40px", overflow: "hidden" }}>
              <Image src={ params?.row?.client?.personalImage?.url } layout="fill" objectFit="contain" alt="clientImg" />
            </div>
            <div className="clientName">
              {params?.row?.client?.name}
            </div>
          </>
        )
      }
    },
    {
      field: 'products',
      headerName: 'products',
      width: 90,
      sortable: true,
      renderCell: (params) =>
      {
        return (
          <> {params?.row?.products && `(${params?.row?.products || ''}) item`} </>
        )
        }
    },
    {
      field: 'amount',
      headerName: 'amount($)',
      sortable: true,
      width: 90,
    },
    {
      field: 'deliveryStatus',
      headerName: 'status',
      sortable: false,
      width: 120,
      renderCell: params =>
      {
        return <div>
          {
            params.row.deliveryStatus === 'pending' ?
              <div className='pending'>
                  {params.row.deliveryStatus}
              </div> :
            params.row.deliveryStatus === 'dispatched' ?
              <div className='dispatched'>
                  {params.row.deliveryStatus}
              </div> :
            params.row.deliveryStatus === 'delivered' &&
              <div className='delivered'>
                  {params.row.deliveryStatus}
              </div> 
          }
        </div>
      }
    },
    {
      field: 'date',
      headerName: "Date",
      sortable: true,
      width: 120
    },
    {
      field: 'actions',
      headerName: 'Actions',
      sortable: false,
      width: 300,
      renderCell: params =>
      {
        return (
          <div className='table__field'>
            {updateLoading ? (
              <div className='table__field__loading'>
                <Spinner animation="border" variant="danger" size='sm' />
              </div>
            ): (
              <>
                {/* <div className="table__field__icon" onClick={() => deleteProductHandler(params.row.id)}> <DeleteIcon /> </div> */}
                <div className="table__field__icon" onClick={() => showProductHandler(params.row.id)}> <VisibilityIcon /> </div>
                <div className={params.row.deliveryStatus === "delivered" ? `table__field__deliveredBtn hide` : "table__field__deliveredBtn"} onClick={() => params.row.deliveryStatus !== "delivered" && orderStatushandler({ id:params.row.id, status: "delivered" })}> deliver </div>
                  <div className={params.row.deliveryStatus === "dispatched" ? `table__field__dispatchedBtn hide` : "table__field__dispatchedBtn"} onClick={() => params.row.deliveryStatus !== "dispatched" && orderStatushandler({ id: params.row.id, status: "dispatched" })}> dispatch </div>
              </>
            )}
            
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
    router.push(`/dashboard/orders/${id}`)
  }
  useEffect(() =>
  {
    dispatch(fetchOrdersAction())
  }, [dispatch])
  useEffect(() =>
  {
    if (isUpdated)
    {
      dispatch(reset())
      dispatch(fetchOrdersAction())
    }
  }, [isUpdated]) 
  const orderStatushandler = orderData =>
  {
    dispatch(updateOrderAction(orderData))
  }
  return (
    <div className="dashboard__container__orders">
      <Header title='orders' />
      <div style={{ height: "70vh", width: '100%', backgroundColor: "#fff", padding: "20px" }} className="orders" >
          {loading ? (
            <div className="loading--container" >
              <Spinner animation="border" variant="danger" />
            </div>
        
          ) : (
          rows && columns && ( // !you should to do this checking if rows and cols is found OR there is an error will happen 
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          )
          )}
      </div>
    </div>

  )
}