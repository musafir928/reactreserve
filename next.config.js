// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV:
      "mongodb+srv://musafir928:000sun1016@reactreserve-y3yeb.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "asdfgh",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dlqbkzezu/image/upload",
    STRIPE_SECRET_KEY: "<insert-stripe-secret-key>"
  }
};
