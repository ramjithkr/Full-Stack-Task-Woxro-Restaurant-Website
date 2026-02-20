import * as blogService from "../../services/public/blog.service.js";

/* Public */
export const getBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs();
    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  try {
    const blog = await blogService.getBlogBySlug(req.params.slug);

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

/* Admin */
export const createBlog = async (req, res, next) => {
  try {
    const blog = await blogService.createBlog(req.body);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    const blog = await blogService.updateBlog(req.params.id, req.body);
    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    await blogService.deleteBlog(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogsAdmin();
    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};
