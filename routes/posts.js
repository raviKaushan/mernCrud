const express = require("express");
const Posts = require("../models/posts");

const router = express.Router();

//Save posts

router.post('/posts/save', (req,res) => {
    let newPost = new Posts(req.body);

    newPost.save((err) =>{
        if (err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Post Saved Successfully"
        });
    });
});

//Display

router.get('/posts', (req, res) => {
    Posts.find().exec((err,posts) =>{
        if (err) {
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:true,
            existingPosts:posts
        });
    });
});

//get a specific post
router.get('/posts/:id', (req, res) => {
    
    let postID = req.params.id;

    Posts.findById(postID,(err,post) => {
        if (err) {
            return res.status(400).json({success:false,err});
        }

        return res.status(200).json({
            success:true,
            post
        });
    });
});


//Update

router.put('/posts/update/:id',(req,res)=>{
    Posts.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err,post)=>{
            if (err) {
                return res.status(400).json({
                    error:err
                });
            }
            return res.status(200).json({
                success:"Updated Successfully"
            });
        }
    );
});


//Delete
router.delete('/posts/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(
        req.params.id
    ).exec((err,deletedpost)=>{
        if (err)  {
            return res.status(400).json({
            message:"Delete Unsuccessfull"
        });
    }
        return res.json({
            message:"Delete Successfull",deletedpost
        });
    });

});
module.exports = router;