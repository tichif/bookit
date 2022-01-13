module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI:
      'mongodb+srv://tichif:tichif@bookit.zkgjb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    CLOUDINARY_CLOUD_NAME: 'di1rwb3im',
    CLOUDINARY_API_KEY: '478836676388755',
    CLOUDINARY_API_SECRET: '5nOUfmF6VApETPLMBTJi3AmGsQY',
    FROM_NAME: 'Book It',
    FROM_EMAIL: 'noreply@bookit.com',
  },
  images: {
    domains: ['res.cloudinary.com'],
  },
};
