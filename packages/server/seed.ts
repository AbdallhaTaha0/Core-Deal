import mongoose from "mongoose";
const User = require("./models/user");
const Category = require("./models/category");
const Product = require("./models/product");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");
const Cart = require("./models/cart");

const seedDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the environment.");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for seeding...");

    // Clear existing data
    await User.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await OrderItem.deleteMany({});
    await Cart.deleteMany({});
    console.log("Cleared existing data.");

    // Create Users
    const adminUser = await User.create({
      name: "Admin User",
      email: "admin@coredeal.com",
      password: "password123", // In a real app, hash this!
      phone: "1234567890",
      address: "123 Admin St, City",
      role: "admin",
    });

    const customerUser = await User.create({
      name: "John Doe",
      email: "john@example.com",
      password: "password123", // Same here
      phone: "0987654321",
      address: "456 Customer Ave, City",
      role: "customer",
    });
    console.log("Created users.");

    // Create Categories
    const electronics = await Category.create({
      name: "Electronics",
      description: "Electronic devices and accessories",
    });

    const laptops = await Category.create({
      name: "Laptops",
      description: "Portable computers",
      parentCategory: electronics._id,
    });

    const smartphones = await Category.create({
      name: "Smartphones",
      description: "Mobile phones",
      parentCategory: electronics._id,
    });
    console.log("Created categories.");

    // Create Products
    const product1 = await Product.create({
      name: "MacBook Pro 16",
      description: "Powerful Apple Laptop",
      price: 2499,
      discountPrice: 2399,
      stockQuantity: 50,
      brand: "Apple",
      images: ["https://example.com/macbook.jpg"],
      specifications: {
        cpu: "M3 Max",
        ram: "36GB",
        storage: "1TB SSD",
        screenSize: "16-inch",
        color: "Space Black"
      },
      status: "active",
      categoryId: laptops._id,
    });

    const product2 = await Product.create({
      name: "Samsung Galaxy S24 Ultra",
      description: "Flagship Android Smartphone",
      price: 1299,
      stockQuantity: 100,
      brand: "Samsung",
      images: ["https://example.com/s24.jpg"],
      specifications: {
        cpu: "Snapdragon 8 Gen 3",
        ram: "12GB",
        storage: "512GB",
        screenSize: "6.8-inch",
        color: "Titanium Black"
      },
      status: "active",
      categoryId: smartphones._id,
    });
    console.log("Created products.");

    // Create an Order
    const order1 = await Order.create({
      userId: customerUser._id,
      totalPrice: 2499, // Before discount logic, just a dummy value
      paymentMethod: "card",
      paymentStatus: "paid",
      orderStatus: "processing",
      shippingAddress: customerUser.address,
    });

    // Create Order Item
    await OrderItem.create({
      orderId: order1._id,
      productId: product1._id,
      quantity: 1,
      price: 2499,
      subtotal: 2499,
    });
    console.log("Created sample order.");

    // Create a Cart item
    await Cart.create({
      userId: customerUser._id,
      productId: product2._id,
      quantity: 2,
      priceAtTime: 1299,
    });
    console.log("Created cart item.");

    console.log("Database successfully seeded!");
    process.exit(0);

  } catch (error) {
    console.error("Error seeding the database: ", error);
    process.exit(1);
  }
};

seedDatabase();
