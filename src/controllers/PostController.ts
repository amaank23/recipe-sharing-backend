import { NextFunction, Response } from "express";
import { PostImagesRepository } from "../repository/postImages.repository";
import Post from "../entities/Post";
import { PostRepository } from "../repository/post.repository";
import CustomError from "../utils/error";
import { CustomRequest } from "../middlewares/authMiddleware";
import PostImages from "../entities/PostImages";

async function create(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    let postImages = [];
    const post: Post = PostRepository.create();
    post.user = req.user.data.id;

    if ("postContent" in req.body) {
      post.content = req.body.postContent;
    }
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
    res.status(201).json({
      message: "Post Successfully Created",
      data: { post, postImages },
    });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

async function getAll(req: CustomRequest, res: Response, next: NextFunction) {
  try {
    const { page, limit } = req.query;
    const itemsToSkip = (+page - 1) * +limit;
    const userId = req.user.data.id;
    const posts = await PostRepository.createQueryBuilder("post")
      .where("post.userId = :userId", { userId })
      .leftJoinAndSelect("post.postImages", "postImages")
      .loadRelationCountAndMap("post.commentsCount", "post.postComments")
      .loadRelationCountAndMap("post.likesCount", "post.postLikes")
      .limit(+limit)
      .offset(itemsToSkip)
      .getMany();
    res
      .status(200)
      .json({ data: posts, message: "Posts Successfully Retrieved" });
  } catch (error) {
    const errors = {
      status: CustomError.getStatusCode(error),
      message: CustomError.getMessage(error),
    };
    next(errors);
  }
}

export default { create, getAll };
