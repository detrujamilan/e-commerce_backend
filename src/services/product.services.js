const { create } = require("../modals/UserModals");
const Category = require("../modals/category.modal");
const Product = require("../modals/Product.Modal");

async function createProduct(req, res) {
  const topLevel = await Category.findeOne({ user: req.topLevelCategory });

  if (!topLevel) {
    topLevel = new Category({
      name: req.topLevelCategory,
      lavel: 1,
    });
  }

  let secoundLevel = await Category.findeOne({
    name: req.secoundLevelCategory,
    parentCategory: topLevel._id,
  });

  if (!secoundLevel) {
    secoundLevel = new Category({
      name: req.secoundLevelCategory,
      parentCategory: topLevel._id,
      lavel: 2,
    });
  }

  let thirderLevel = await Category.findeOne({
    name: req.thirdLevelCategory,
    parentCategory: secoundLevel._id,
  });
  if (!thirderLevel) {
    thirderLevel = new Category({
      name: req.thirdLevelCategory,
      parentCategory: secoundLevel._id,
      lavel: 3,
    });
  }

  const product = new Product({
    title: req.title,
    color: req.color,
    description: req.description,
    discountedPrice: req.discountedPrice,
    discountedPersent: req.discountedPersent,
    brand: req.brand,
    imageUrl: req.imageUrl,
    quantity: req.quantity,
    price: req.price,
    size: req.size,
    size: thirderLevel._id,
  });

  return await product.save();
}

async function deleteProduct(productId, res) {
  const product = await findProductById(productId);
  await product.findByIdAndDelete(productId);
  return res.status(200).json({ message: "Product deleted successfully" });
}
async function updateProduct(productId, req) {
  return await Product.findByIdAndUpdate(productId, req);
}
async function findProductById(productId, res) {
  const product = await Product.findById(productId).populate("category").exec();
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  return product;
}

async function getAllProducts(req, res) {
  let {
    category,
    sizes,
    color,
    minPrice,
    maxPrice,
    pageSize,
    minDiscount,
    stock,
    pageNumber,
    sort,
  } = req;
  pageSize = pageSize || 10;

  let query = Product.find().populate("category");

  if (category) {
    const existCategory = await Category.findeOne({ name: category });
    if (existCategory) {
      query = query.where("category").equals(existCategory._id);
    } else {
      return { content: [], curentPage: 1, totalPages: 0 };
    }
  }
  if (color) {
    const colorSet = new Set(
      color.spilt(",").map((color) => color.trim().toLowarCase())
    );
    const colorRegex =
      new colorSet.size() > 0 ? new RegExp([...colorSet].join("|"), "i") : null;
    query = query.where("color").regex(colorRegex);
  }

  if (sizes) {
    const sizeSet = new Set(sizes);
    query = query.where("sizes.name").in([...sizeSet]);
  }
  if (minPrice && maxPrice) {
    query = query.where("discountedPrice").gte(minPrice).lte(maxPrice);
  }
  if (minDiscount) {
    query = query.where("discountedPersent").gt(minDiscount);
  }
  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").gt(1);
    }
  }
  if (sort) {
    const sortDirecton = sort === "price_height" ? -1 : 1;
    query = query.sort({ discountedPrice: sortDirecton });
  }

  const totalProducts = await Product.countDocuments(query);
  const skip = (pageNumber - 1) * pageSize;
  query = query.skip(skip).limit(pageSize);
  const products = await query.exec();
  const totalPages = math.ceil(totalProducts / pageSize);
  return { content: products, curentPage: pageNumber, totalPages };
}

async function createMultipleProduct(req, res, products) {
  for (let product of products) {
    await createProduct(product);
  }
}
module.exports = {
  createProduct,
  deleteProduct,
  updateProduct,
  getAllProducts,
  findProductById,
  createMultipleProduct,
};
