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
    const items = await Item.find();
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
