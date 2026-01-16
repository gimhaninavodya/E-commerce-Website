import Item from "../model/itemModel.js";

export const addItem = async (req, res) => {
  const { name, description, category, subCategory, price, stock, seller } = req.body;
  const imagePaths = req.files.map((file) => file.path); // Get uploaded image paths

  if (!name || !description || !category  || !subCategory || !price || !stock || !seller || imagePaths.length === 0) {
    return res.status(400).json({ success: false, message: "All fields are required, including images." });
  }

  const newItem = new Item({
    name,
    description,
    category ,
    subCategory,
    price,
    stock,
    seller,
    images: imagePaths,
  });

  try {
    await newItem.save();
    res.status(201).json({ success: true, message: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const { sortBy } = req.query;
    let query = Item.find();

    if (sortBy === "popularity") {
      query = query.sort({ likesCount: -1 });
    }

    const items = await query;
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUserItems = async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    return res.status(400).json({ success: false, message: "User ID is required." });
  }

  try {
    const items = await Item.find({ seller: userId });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getItemsByCategory = async (req, res) => {
  const { category, subCategory } = req.params;

  if (!category) {
    return res.status(400).json({ success: false, message: "Category is required." });
  }

  try {
    const filter = { category };
    if (subCategory) {
      filter.subCategory = subCategory.toLowerCase();
    }

    const items = await Item.find(filter);
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Item.findById(id).populate("seller", "name email");
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Item.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found.' }); 
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const { name, description, category, subCategory, price, stock } = req.body;
  try {
      const existingProduct = await Item.findById(id);
      if (!existingProduct) {
          return res.status(404).json({ success: false, message: 'Product not found.' });
      }

      // Updating product by ID
      const updatedProduct = await Item.findByIdAndUpdate(id, { name, description, category, subCategory, price, stock }, { new: true });
      if (!updatedProduct) {
          return res.status(404).json({ success: false, message: 'Product not found.' });
      }
      res.status(200).json({ success: true, message: 'Product updated successfully.', Item: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};