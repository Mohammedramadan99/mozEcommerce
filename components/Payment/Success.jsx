import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useSWR from 'swr';
import {createOrderAction} from '../../store/orderSlice'

function Success()
{
  const dispatch = useDispatch()
  const { userAuth: { _id } } = useSelector(state => state.users)
  const [cart, setCart] = useState([])

  const { 
    query: { session_id },
  } = useRouter()
  const [checkoutSession,setChechoutSession] = useState({})
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";
      const fetcher = async () =>
      {
        const { data: { checkout_session } } = await axios.get(`${origin}/api/checkout_sessions/${session_id}`)
        // dispatch(createOrderAction({ userId: _id, customer, payment_intent, amount_subtotal, amount_total, customer_details, payment_status }))
        setChechoutSession(checkout_session)
      }
  const test = useSWR(`/api/checkout_sessions/${session_id}`, fetcher);
  const products = cart
  
  useEffect(() =>
  {
    const userId = _id
    const { customer, payment_intent, amount_subtotal, amount_total, customer_details, payment_status } = checkoutSession
    dispatch(createOrderAction({ userId, products, customer, payment_intent, amount_subtotal, amount_total, customer_details, payment_status }))
  }, [checkoutSession])

  useEffect(() => {
    if (typeof window !== 'undefined')
    {
      setCart(JSON.parse(localStorage?.getItem('orderProducts')))
    }
  }, [])
  
  // console.log(JSON.parse(cart))
  return (
    <div></div>
  )
}

export default Success

// 11055 H
// 11919 H 
// 12380 H 