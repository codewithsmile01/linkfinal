"use server";
import { Post } from "@/models/post.model";
import { IUser } from "@/models/user.model";
import { Comment } from "@/models/comment.model";
import { currentUser } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";
import connectDB from "./db";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//create Post

export const createPostAction = async (
  inputText: string,
  selectedFile: string
) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error("User not athenticated");
  if (!inputText) throw new Error("Input field is required");
  const image = selectedFile;
  const userDatabase: IUser = {
    firstName: user.firstName || "smile",
    lastName: user.lastName || "smile",
    userId: user.id,
    profilePhoto: user.imageUrl,
  };
  let uploadResponse;
  try {
    if (image) {
      uploadResponse = await cloudinary.uploader.upload(image);
      await Post.create({
        description: inputText,
        user: userDatabase,
        imageUrl: uploadResponse?.secure_url,
      });
    } else {
      await Post.create({
        description: inputText,
        user: userDatabase,
      });
    }
    revalidatePath("/");
  } catch (error: any) {
    throw new Error(error);
  }
};

//get all post using server actions

export const getAllPosts = async () => {
  try {
    await connectDB();
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "comments", options: { sort: { created: -1 } } });
    if (!posts) return [];
    return JSON.parse(JSON.stringify(posts));
  } catch (error) {
    console.log(error);
  }
};

//delete post by id

export const deletePostAction = async (postId: string) => {
  await connectDB();
  const user = await currentUser();
  if (!user) throw new Error(" User not authenticated");
  const post = await Post.findById(postId);
  if (!post) throw new Error(`Post not found`);
  if (post.user.userId !== user.id) {
    throw new Error("You are not an owner of this  Post.");
  }
  try {
    await Post.deleteOne({ _id: postId });
    revalidatePath("/");
  } catch (error: any) {
    throw new Error("an error occurred", error);
  }
};

//comment on post

export const createCommentAction = async (
  postId: string,
  fromData: FormData
) => {
  try {
    const user = await currentUser();
    if (!user) throw new Error("User not authenticated");
    const inputText = formData.get("inputText") as string;
    if (!inputText) throw new Error("Field is required");
    if (!postId) throw new Error("Post id required");

    const userDataBase: IUser = {
      firstName: user.firstName || "Patel",
      lastName: user.lastName || "Mern Stack",
      userId: user.id,
      profilePhoto: user.imageUrl,
    };
    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post new found");

    const comment = await Comment.create({
      textMessage: inputText,
      user: userDataBase,
    });
    post.comments?.push(comment._id);
    await post.save();
    revalidatePath("/");
  } catch (error) {
    throw new Error("An error occurred");
  }
};
