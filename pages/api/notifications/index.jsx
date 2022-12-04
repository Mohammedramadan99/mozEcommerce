import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'


import Notification from "../../../Modal/NotificationsModal"
const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  try {
    const notifications = await Notification.find().populate('user').sort('-createdAt')
    res.status(200).json({
      success: true,
      notifications,
    })
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
  await db.disconnect();
})
handler.post(async (req, res) =>
{
  await db.connect();
  try {
  const data = req.body
  const newNotification = await Notification.create(data)
  res.status(200).json({
    success: true,
    newNotification,
  })
  } catch (error)
  {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
  await db.disconnect();
})
export default handler

// ! review us or product , order , 