const express = require('express');
const connectDB = require('./db/db')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
const signup = require('./routes/signup')
const login = require('./routes/login')
const product = require('./routes/product')
const passport = require('./config/passport')
const footer = require('./routes/footer')
const logout = require('./routes/logout')
const wishlist = require('./routes/wishlist')
const cart = require('./routes/cart')
const address = require('./routes/address')
const order = require('./routes/order')

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
connectDB();

app.use(cors({
  origin: 'https://ecom-store-sandy.vercel.app',
  credentials: true
}));

// ✅ Needed for Google Auth without sessions
app.use(passport.initialize());

app.get("/", (req, res) => { // for uptime robot.
  res.send("Backend is awake 🚀");
});

app.use(signup);
app.use(login);
app.use(product);
app.use(footer);
app.use(logout);
app.use(wishlist);
app.use(cart);
app.use(address);
app.use(order);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});
