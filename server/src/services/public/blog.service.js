import Blog from "../../modules/blog/blog.model.js";

// Create
export const createBlog = async (data) => {
  return await Blog.create(data);
};

//* Get All (Public
export const getAllBlogs = async () => {
  return await Blog.find({ isPublished: true }).sort({
    createdAt: -1,
  });
};

// Get by Slug (Public)
export const getBlogBySlug = async (slug) => {
  return await Blog.findOne({ slug, isPublished: true });
};

// Admin Get Alsl
export const getAllBlogsAdmin = async () => {
  return await Blog.find().sort({ createdAt: -1 });
};

//Update
export const updateBlog = async (id, data) => {
  return await Blog.findByIdAndUpdate(id, data, {
    new: true,
  });
};

/* Delete */
export const deleteBlog = async (id) => {
  return await Blog.findByIdAndDelete(id);
};
