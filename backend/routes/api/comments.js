/**
 * Express router for handling comment-related API endpoints.
 * 
 * Endpoints:
 * - GET /: Retrieve all comments.
 * - POST /: Create a new comment.
 * - DELETE /:id: Delete a comment by its ID.
 * - PUT /:id: Update a comment by its ID.
 * - DELETE /admin/:id: Delete a comment by its ID (admin use).
 * 
 * Uses Mongoose Comment model.
 * 
 * @module routes/api/comments
 */
const router = require("express").Router();
const mongoose = require("mongoose");
const Comment = mongoose.model("Comment");

module.exports = router;

 router.get("/", async (req, res) => {
   try {
     const comments = await Comment.find();
     res.json(comments);
   } catch (err) {
     res.status(500).json({ error: "Failed to fetch comments" });
   }
 });

router.post("/", async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to create comment" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  }
    catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Failed to update comment" });
  }
});

// add another endpoint to delete a comment by its ID
// this is useful for admin users to manage comments
router.delete("/admin/:id", async (req, res) => {
    try {
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        if (!deletedComment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json({ message: "Comment deleted successfully by admin" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete comment by admin" });
    }
});

