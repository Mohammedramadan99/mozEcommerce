import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'


import Notification from "../../../Modal/NotificationsModal"
const handler = nc()

handler.delete(async (req, res) =>
{
  await db.connect();
  try
  {
    const notification = await Notification.findByIdAndDelete(req.query.id);

    res.status(200).json({
      success: true,
      deleted: true,
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