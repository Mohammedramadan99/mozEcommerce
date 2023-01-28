import nc from 'next-connect'
import Product from '../../../Modal/ProductsModel'
import db from '../../../utils/db/dbConnect'
import { isAuth } from '../../../utils/auth'
import Notification from '../../../Modal/NotificationsModal'
const handler = nc()
handler.use(isAuth).put(async (req, res) =>
{
  const { rating, comment, productId } = req.body;
  const user = req.user
  console.log(user)
  const review = {
    user: { ...user },
    name: req.user.name,
    rating: Number(rating),
    comment,
  };
  // console.log(review)
  const product = await Product.findById(productId); // find the product
  const notificationData = {
    user,
    title: `${user.name} reviewed  ${product?.name} with (${review.rating}) stars`,
    content: `${review.comment}`
  }
  const notification = await Notification.create(notificationData)
  const isReviewed = product.reviews.find(
    (rev) => rev?.user?._id === req.user._id.toString()
  ); // product OLD review before the NEW review

  if (isReviewed)
  {
    // case new review from user reviewed before
    product.reviews.forEach((rev) =>
    {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else
  {
    // case new review from user NOT reviewed before
    product.reviews.push(review); // so push his review with other reviews
    product.numOfReviews = product.reviews.length; // length of reviews after the new review
  }
  // to get average of product reviews from all product reviews
  let avg = 0; // make the var

  // to sum all ratings of product reviews in avg variable
  // for ex. ratingOne: 4.5 , ratingTwo:3.5 -->> so the avg = 8
  product.reviews.forEach((rev) =>
  {
    avg += rev.rating;
    // the example -> the product have 2 reviews , reviewOne is 4.5 and reviewTwo is 3.5
    // review #1 -> avg + ratingOne --> 0 + 4.5 = 4.5
    // review #2 -> avg + ratingTwo --> 4.5 + 3.5 = 8
    // so finally result is 8
  });

  // so average rating of this product is "(ratingOne + ratingTwo)8 / (length of product reviews)2 = 4 "
  product.ratings = avg / product.reviews.length;

  // after all of that we'll make save for the product
  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
  await db.disconnect();

})
export default handler