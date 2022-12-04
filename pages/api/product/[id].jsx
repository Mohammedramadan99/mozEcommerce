import nc from 'next-connect'

import db from '../../../utils/db/dbConnect'
import Product from "../../../Modal/ProductsModel"

const ErrorHandler = require("../../../utils/errorHandler");
const handler = nc();

// create product --> admin


handler.get(async (req, res) =>
{
  await db.connect();
  try {
    const product = await Product.findById(req.query.id);
  
    // status Error
    if (!product)
    {
      return next(new ErrorHandler("product not found", 404));
    }
  
    // status success
    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})

handler.delete(async (req, res) =>
{
  await db.connect();
  try
  {
    console.log("req.query", req.query.id)
    let product = await Product.findById(req.query.id);

    // status case error
    if (!product)
    {
      return res.status(500).json({
        success: false,
        message: "product not fount",
      });
    }

    // operator <- delete ->
    await product.remove();

    // status case success
    res.status(200).json({
      success: true,
      message: "product Deleted",
    });
  } catch (err)
  {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})
// update
handler.put(async (req, res) =>
{
  await db.connect();
  try
  {
    let product = await Product.findById(req.query.id); // get the product

    if (!product)
    {
      res.status(404).json({
        success: false,
        message: "product not found"
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
        for (let i = 0; i < product.images.length; i++)
        {
          await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }
  
        const imagesLinks = [];
  
        for (let i = 0; i < images.length; i++)
        {
          const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: "products",
          });
  
          imagesLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
          });
        }
  
        req.body.images = imagesLinks;
      }
    }

    product = await Product.findByIdAndUpdate(req.query.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err)
  {
    return res.status(500).json({ message: err.message });
  }
  await db.disconnect();
})
// const productCtrl = {
//   createProduct: catchAsyncError(async (req, res, next) =>
//   {
//     let images = [];

//     if (typeof req.body.images === "string")
//     {
//       images.push(req.body.images);
//     } else
//     {
//       images = req.body.images;
//     }

//     const imagesLinks = [];

//     for (let i = 0; i < images.length; i++)
//     {
//       const result = await cloudinary.v2.uploader.upload(images[i], {
//         folder: "ecommerce",
//       });

//       imagesLinks.push({
//         public_id: result.public_id,
//         url: result.secure_url,
//       });
//     }

//     req.body.images = imagesLinks;
//     req.body.user = req.user.id;

//     const product = await Product.create(req.body);

//     res.status(201).json({
//       success: true,
//       product,
//     });
//   }),
//   // get product --> 1:46
//   getAllProducts: catchAsyncError(async (req, res) =>
//   {
//     try
//     {
//       const products = await Product.find({})
//       res.status(200).json({
//         success: true,
//         products,
//       });
//     } catch (err)
//     {
//       return res.status(500).json({ message: err.message });
//     }
//   }),
//   filterProducts: catchAsyncError(async (req, res) =>
//   {
//     try
//     {
//       // const resultPerPage = 8;
//       // const productsCount = await Product.countDocuments();

//       // const apiFeature = new ApiFeatures(Product.find(), req.query)
//       //   .search()
//       //   .filter();
//       //   // .pagination(resultPerPage);

//       //   let products = await apiFeature.query;
//       //   // console.log(req.query.find({size}))

//       // let filteredProductsCount = products.length;

//       // apiFeature.pagination(resultPerPage);

//       // products = await apiFeature.query;

//       const resultPerPage = 8;
//       const productsCount = await Product.countDocuments();
//       const products = await Product.find()
//       const apiFeature = new ApiFeatures(Product.find(), req.query)
//         .search()
//         .filter();

//       let filteredProducts = await apiFeature.query;

//       let filteredProductsCount = filteredProducts.length;

//       // apiFeature.pagination(resultPerPage);

//       // products = await apiFeature.query;

//       res.status(200).json({
//         success: true,
//         products,
//         filteredProducts,
//         productsCount,
//         resultPerPage,
//         filteredProductsCount,
//       });
//     } catch (err)
//     {
//       return res.status(500).json({ message: err.message });
//     }
//   }),

//   sizesFilter: catchAsyncError(async (req, res) =>
//   {
//     const size = req.body
//     const allSizes = Product.find({ sizes })
//   }),

//   // get product details
//   productDetails: catchAsyncError(async (req, res, next) =>
//   {
//     let product = await Product.findById(req.query.id);

//     // status Error
//     if (!product)
//     {
//       return next(new ErrorHandler("product not found", 404));
//     }

//     // status success
//     res.status(200).json({
//       success: true,
//       product,
//     });
//   }),

//   // update -->
  // updateProduct: catchAsyncError(async (req, res, next) =>
  // {
  //   let product = await Product.findById(req.query.id);

  //   if (!product)
  //   {
  //     res.status(404).json({
  //       success: false,
  //       message: "product not found"
  //     });
  //   }

  //   // Images Start Here
  //   let images = [];

  //   if (typeof req.body.images === "string")
  //   {
  //     images.push(req.body.images);
  //   } else
  //   {
  //     images = req.body.images;
  //   }

  //   if (images !== undefined)
  //   {
  //     // Deleting Images From Cloudinary
  //     for (let i = 0; i < product.images.length; i++)
  //     {
  //       await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  //     }

  //     const imagesLinks = [];

  //     for (let i = 0; i < images.length; i++)
  //     {
  //       const result = await cloudinary.v2.uploader.upload(images[i], {
  //         folder: "products",
  //       });

  //       imagesLinks.push({
  //         public_id: result.public_id,
  //         url: result.secure_url,
  //       });
  //     }

  //     req.body.images = imagesLinks;
  //   }

  //   product = await Product.findByIdAndUpdate(req.query.id, req.body, {
  //     new: true,
  //     runValidators: true,
  //     useFindAndModify: false,
  //   });

  //   res.status(200).json({
  //     success: true,
  //     product,
  //   });
  // }),

//   // delete -->
//   deleteProduct: catchAsyncError(async (req, res, next) =>
//   {
//     let product = await Product.findById(req.query.id);

//     // status case error
//     if (!product)
//     {
//       return res.status(500).json({
//         success: false,
//         message: "product not fount",
//       });
//     }

//     // operator <- delete ->
//     await product.remove();

//     // status case success
//     res.status(200).json({
//       success: true,
//       message: "product Deleted",
//     });
//   }),
//   // get admin products
//   getAdminProducts: catchAsyncError(async (req, res, next) =>
//   {
//     const products = await Product.find();

//     res.status(200).json({
//       success: true,
//       products,
//     });
//   }),
//   // Create New Review or Update the review
//   createProductReview: catchAsyncError(async (req, res, next) =>
//   {
//     const { rating, comment, productId } = req.body;

//     const review = {
//       user: req.user._id,
//       name: req.user.name,
//       rating: Number(rating),
//       comment,
//     };

//     const product = await Product.findById(productId); // find the product

//     const isReviewed = product.reviews.find(
//       (rev) => rev.user.toString() === req.user._id.toString()
//     ); // product OLD review before the NEW review

//     if (isReviewed)
//     {
//       // case new review from user reviewed before
//       product.reviews.forEach((rev) =>
//       {
//         if (rev.user.toString() === req.user._id.toString())
//           (rev.rating = rating), (rev.comment = comment);
//       });
//     } else
//     {
//       // case new review from user NOT reviewed before
//       product.reviews.push(review); // so push his review with other reviews
//       product.numOfReviews = product.reviews.length; // length of reviews after the new review
//     }
//     // to get average of product reviews from all product reviews
//     let avg = 0; // make the var

//     // to sum all ratings of product reviews in avg variable
//     // for ex. ratingOne: 4.5 , ratingTwo:3.5 -->> so the avg = 8
//     product.reviews.forEach((rev) =>
//     {
//       avg += rev.rating;
//       // the example -> the product have 2 reviews , reviewOne is 4.5 and reviewTwo is 3.5
//       // review #1 -> avg + ratingOne --> 0 + 4.5 = 4.5
//       // review #2 -> avg + ratingTwo --> 4.5 + 3.5 = 8
//       // so finally result is 8
//     });

//     // so average rating of this product is "(ratingOne + ratingTwo)8 / (length of product reviews)2 = 4 "
//     product.ratings = avg / product.reviews.length;

//     // after all of that we'll make save for the product
//     await product.save({ validateBeforeSave: false });

//     res.status(200).json({
//       success: true,
//     });
//   }),

//   // Get All Reviews of a product
//   getProductReviews: catchAsyncError(async (req, res, next) =>
//   {
//     // first you need to put the id in query query -- you can use Postman
//     // then find the product by the id that you put its in query query
//     const product = await Product.findById(req.query.id);
//     // case product not found
//     if (!product)
//     {
//       return next(new ErrorHandler("Product not found", 404));
//     }

//     // case find the product ->  pass the product reviews with status 200
//     res.status(200).json({
//       success: true,
//       product,
//       reviews: product.reviews,
//     });
//   }),

//   // Delete Review
//   deleteReview: catchAsyncError(async (req, res, next) =>
//   {
//     // first you need to put the id of product in query query -- you can use Postman
//     // then find the product by the id that you put its in query query
//     const product = await Product.findById(req.query.productId);

//     // case product not found
//     if (!product)
//     {
//       return next(new ErrorHandler("Product not found", 404));
//     }

//     // case find the product ->  doing filter to delete one review from all reviews
//     const reviews = product.reviews.filter(
//       (rev) => rev._id.toString() !== req.query.id.toString()
//     );

//     let avg = 0;

//     reviews.forEach((rev) =>
//     {
//       avg += rev.rating;
//     });

//     let ratings = 0;

//     if (reviews.length === 0)
//     {
//       ratings = 0;
//     } else
//     {
//       ratings = avg / reviews.length;
//     }

//     const numOfReviews = reviews.length;

//     await Product.findByIdAndUpdate(
//       req.query.productId,
//       {
//         reviews,
//         ratings,
//         numOfReviews,
//       },
//       {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false,
//       }
//     );

//     res.status(200).json({
//       success: true,
//     });
//   }),
// };

// module.exports = productCtrl;

export default handler