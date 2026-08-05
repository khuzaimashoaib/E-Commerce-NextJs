// @desc   Get all users

import User from "../../models/User.js";

// @route  GET /api/admin/users
export const getAdminUsers = async (req, res) => {
  try {
    // Fetch admins first then customers separately
    const admins = await User.find({ role: "admin" })
      .select("-password")
      .sort({ createdAt: -1 });

    const customers = await User.find({ role: "customer" })
      .select("-password")
      .sort({ createdAt: -1 });

    res.json([...admins, ...customers]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Delete user
// @route  DELETE /api/admin/users/:id
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(400).json({ message: "Cannot delete admin user" });
    }
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc   Update user role
// @route  PUT /api/admin/users/:id/role
export const updateUserRole = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.role = req.body.role;
    const updated = await user.save();
    res.json({ _id: updated._id, name: updated.name, role: updated.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
