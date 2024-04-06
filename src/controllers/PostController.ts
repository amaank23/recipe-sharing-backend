import { NextFunction, Request, Response } from "express";
import { PostImagesRepository } from "../repository/postImages.repository";
import Post from "../entities/Post";
import { PostRepository } from "../repository/post.repository";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    let postImages = [];
    const post: Post = PostRepository.create();
    post.user = req.user.data.id;
    await PostRepository.save(post);
    if ("images" in req.files) {
      const files = await PostImagesRepository.uploadImages(
        req.files.images,
        post.id
      );
      if ("error" in files) {
        throw new CustomError(files.error, 500).errorInstance();
      }
      postImages = files;
    }
    if ("postContent" in req.body) {
      post.content = req.body.postContent;
    }
    await PostRepository.save(post);
    res.status(201).json({
      message: "Post Successfully Created",
      post: { ...post, postImages },
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { create };
