import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'
import { isAuth } from '../../../utils/auth'
import Category from '../../../Modal/CategoryModal'
import cloudinary from "cloudinary"
cloudinary.config({
  cloud_name: 'dtmjc8y9z',
  api_key: '379966828288349',
  api_secret: 'a41LSvU3XXAJuQOLxorhOVFPauw',
});
const handler = nc()
handler.get(async (req, res) =>
{
  await db.connect();
  try {
    const categories = await Category.find()
    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error.message)
  }

})
handler.post(async (req, res) =>
{
  await db.connect();
  try
  {
    let images = [];

    if (typeof req.body.images === "string")
    {
      images.push(req.body.images);
    } else
    {
      images = req.body.images;
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++)
    {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "ecommerce",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
    const category = await Category.create({
      title: req.body.title,
      images:req.body.images
    });
    res.json(category);
  } catch (error)
  {
    res.status(500).json({message:error.message});
  }
  await db.disconnect();

})
export default handler
