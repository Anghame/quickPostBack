const Post = require('../models/Post');
const User = require('../models/User');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

// Récupérer tous les posts avec les informations utilisateur


// Créer un post
exports.createPost = async (req, res) => {
    const { content, authorId } = req.body;
  
    try {
      // Vérifier si l'utilisateur existe
      const user = await User.findById(authorId);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Créer un nouveau post
      const post = new Post({ content, author: authorId });
      await post.save();
  
      // Ajouter le post à la liste des posts de l'utilisateur
      await User.findByIdAndUpdate(authorId, { $push: { posts: post._id } });
  
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la création du post', error });
    }
  };
  
  // Récupérer tous les posts avec les informations de l'utilisateur
  exports.getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find()
        .populate({
          path: 'author',
          select: 'username profileImage gender', // Ajoutez 'gender' ici
        })
        .populate({
          path: 'likes',
          populate: {
            path: 'user',
            select: 'username profileImage gender', // Ajoutez 'gender' ici si nécessaire
          },
        })
        .populate({
          path: 'comments',
          populate: {
            path: 'author',
            select: 'username profileImage gender', // Ajoutez 'gender' ici si nécessaire
          },
        })
        .sort({ createdAt: -1 }); // Trier par date de création (du plus récent au plus ancien)
  
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors de la récupération des posts', error });
    }
  };

// Liker un post
exports.likePost = async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) {
      return res.status(400).json({ message: 'Vous avez déjà liké ce post' });
    }

    const like = new Like({ user: userId, post: postId });
    await like.save();
    await User.findByIdAndUpdate(userId, { $push: { likedPosts: like._id } });
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du like' });
  }
};

// Ajouter un commentaire
exports.addComment = async (req, res) => {
  const { postId, text, authorId } = req.body;
  try {
    const comment = new Comment({ text, author: authorId, post: postId });
    await comment.save();
    await User.findByIdAndUpdate(authorId, { $push: { comments: comment._id } });
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de l\'ajout du commentaire' });
  }
};