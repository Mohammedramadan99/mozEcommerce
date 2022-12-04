import nc from 'next-connect'
import db from '../../../utils/db/dbConnect'
import { isAuth } from '../../../utils/auth'
import Category from '../../../Modal/CategoryModal'

const handler = nc()

handler.get(async (req, res) =>
{
  await db.connect();
  try
  {
    const category = await Category.findById(req.query.id)
    res.status(200).json(category)
  } catch (error)
  {
    res.status(500).json(error.message)
  }
})
// update
handler.put(async (req, res) =>
{
  await db.connect();
  try
  {
    let category = await Category.findById(req.query.id); // get the category

    if (!category)
    {
      res.status(404).json({
        success: false,
        message: "category not found"
      });
    }
    if (req.body.images)
    {
      // Images Start Here
      let images = [];

      if (typeof req.body.images === "string")
      {
        images.push(req.body.images);
      } else
      {
        images = req.body.images;
      }

      if (images !== undefined)
      {
        // Deleting Images From Cloudinary
        for (let i = 0; i < category.images.length; i++)
        {
          await cloudinary.v2.uploader.destroy(category.images[i].public_id);
        }

        const imagesLinks = [];

        for (let i = 0; i < images.length; i++)
        {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "categorys",
          });

          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }

        req.body.images = imagesLinks;
      }
    }

    category = await Category.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      category,
    });
  } catch (err)
  {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})

export default handler
