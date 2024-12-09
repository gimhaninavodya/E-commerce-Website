import Item from "../model/itemModel.js";

export const addItem = async (req, res) => {
  const { name, description, price, stock, seller } = req.body;
  const imagePaths = req.files.map((file) => file.path); // Get uploaded image paths

  if (!name || !description || !price || !stock || !seller || imagePaths.length === 0) {
    return res.status(400).json({ success: false, message: "All fields are required, including images." });
  }

  const newItem = new Item({
    name,
    description,
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
