import User from "../../models/User.js";
import Product from "../../models/Product.js";

// @desc   Get user wishlist
// @route  GET /api/wishlist
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "wishlist",
      populate: { path: "categories", select: "name slug" },
    });

    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Add product to wishlist
// @route  POST /api/wishlist/:productId
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    // Check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);

    // Already in wishlist — return as is
    if (user.wishlist.includes(productId)) {
      return res.json({
        message: "Already in wishlist",
        wishlist: user.wishlist,
      });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: "Added to wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Remove product from wishlist
// @route  DELETE /api/wishlist/:productId
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);

    await user.save();

    res.json({ message: "Removed from wishlist", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Toggle wishlist — add if not in, remove if in
// @route  PUT /api/wishlist/:productId
export const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const user = await User.findById(req.user._id);
    const isInWishlist = user.wishlist
      .map((id) => id.toString())
      .includes(productId);

    if (isInWishlist) {
      // Remove
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
    } else {
      // Add
      user.wishlist.push(productId);
    }

    await user.save();

    res.json({
      message: isInWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist: !isInWishlist,
      wishlist: user.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
