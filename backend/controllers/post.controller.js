import ImageKit from "imagekit";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export const getPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;

  const query = {};

  console.log(req.query);

  const cat = req.query.cat;
  const author = req.query.author;
  const searchQuery = req.query.search;
  const sortQuery = req.query.sort;
  const featured = req.query.featured;

  if (cat) {
    query.category = cat;
  }

  if (searchQuery) {
    query.title = { $regex: searchQuery, $options: "i" };
  }

  if (author) {
    const user = await User.findOne({ username: author }).select("_id");

    if (!user) {
      return res.status(404).json("No post found!");
    }

    query.user = user._id;
  }

  let sortObj = { createdAt: -1 };

  if (sortQuery) {
    switch (sortQuery) {
      case "newest":
        sortObj = { createdAt: -1 };
        break;
      case "oldest":
        sortObj = { createdAt: 1 };
        break;
      case "popular":
        sortObj = { visit: -1 };
        break;
      case "trending":
        sortObj = { visit: -1 };
        query.createdAt = {
          $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
        };
        break;
      default:
        break;
    }
  }

  if (featured) {
    query.isFeatured = true;
  }

  const posts = await Post.find(query)
    .populate("user", "username")
    .sort(sortObj)
    .limit(limit)
    .skip((page - 1) * limit);

  const totalPosts = await Post.countDocuments();
  const hasMore = page * limit < totalPosts;

  res.status(200).json({ posts, hasMore });
};

export const getPost = async (req, res) => {
  const post = await Post.findOne({ slug: req.params.slug }).populate(
    "user",
    "username img"
  );
  res.status(200).json(post);
};

export const createPost = async (req, res) => {
  try {
    // Log request headers for debugging
    console.log("Request Headers:", req.headers);

    // Validate user authentication
    const clerkUserId = req.auth?.userId;
    if (!clerkUserId) {
      console.log("Not authenticated, returning 401.");
      return res.status(401).json({ error: "Not authenticated!" });
    }

    console.log("Clerk User ID:", clerkUserId);

    // Find user in the database using Prisma
    const user = await prisma.user.findUnique({
      where: { clerkUserId },
    });

    if (!user) {
      console.log("User not found, returning 404.");
      return res.status(404).json({ error: "User not found!" });
    }

    console.log("User found:", user);

    // Generate slug
    let slug = req.body.title.replace(/ /g, "-").toLowerCase();
    console.log("Generated initial slug:", slug);

    // Handle slug collision
    let existingPost = await prisma.post.findUnique({ where: { slug } });
    let counter = 2;
    const originalSlug = slug;

    while (existingPost) {
      slug = `${originalSlug}-${counter}`;
      existingPost = await prisma.post.findUnique({ where: { slug } });
      counter++;
      console.log("Updated slug:", slug);
    }

    console.log("Final unique slug to be used:", slug);

    // Extract location and timezone data from headers
    const country = req.headers["x-vercel-ip-country"];
    const region = req.headers["x-vercel-ip-country-region"];
    const timezone = req.headers["x-vercel-ip-timezone"];

    // Create post in the database
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        slug,
        title: req.body.title,
        content: req.body.content,
        location: country && region ? `${country}, ${region}` : null,
        timezone: timezone || null,
        createdAt: new Date(),
      },
    });

    console.log("Post saved successfully:", post);

    // Respond with the created post
    res.status(200).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Internal server error!" });
  }
};



export const deletePost = async (req, res) => {
  const clerkUserId = req.auth.userId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role === "admin") {
    await Post.findByIdAndDelete(req.params.id);
    return res.status(200).json("Post has been deleted");
  }

  const user = await User.findOne({ clerkUserId });

  const deletedPost = await Post.findOneAndDelete({
    _id: req.params.id,
    user: user._id,
  });

  if (!deletedPost) {
    return res.status(403).json("You can delete only your posts!");
  }

  res.status(200).json("Post has been deleted");
};

export const featurePost = async (req, res) => {
  const clerkUserId = req.auth.userId;
  const postId = req.body.postId;

  if (!clerkUserId) {
    return res.status(401).json("Not authenticated!");
  }

  const role = req.auth.sessionClaims?.metadata?.role || "user";

  if (role !== "admin") {
    return res.status(403).json("You cannot feature posts!");
  }

  const post = await Post.findById(postId);

  if (!post) {
    return res.status(404).json("Post not found!");
  }

  const isFeatured = post.isFeatured;

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    {
      isFeatured: !isFeatured,
    },
    { new: true }
  );

  res.status(200).json(updatedPost);
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};