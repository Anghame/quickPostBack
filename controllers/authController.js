const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Inscription

exports.register = async (req, res) => {
    try {
        const { email, username,password, firstName, lastName, gender, dateOfBirth } = req.body;

        // Vérifier si l'utilisateur existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Un utilisateur avec cet e-mail existe déjà.' });
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 12);

        // Créer un nouvel utilisateur
        const newUser = new User({
            email,
            username,
            password: hashedPassword,
            firstName,
            lastName,
            gender,
            dateOfBirth,
        });

        // Sauvegarder l'utilisateur dans la base de données
        await newUser.save();

        // Réponse réussie
        res.status(201).json({ message: 'Utilisateur créé avec succès.', user: newUser });
    } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
        res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
    }
};

// Connexion

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Générer un token JWT
    const token = jwt.sign({ userId: user._id }, 'votre_secret_jwt', { expiresIn: '1h' });

    // Retourner le token et les informations de l'utilisateur
    res.status(200).json({
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
        gender: user.gender,
        firstName:user.firstName,
        lastName:user.lastName

        // Ajoutez d'autres champs si nécessaire
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la connexion', error });
  }
};