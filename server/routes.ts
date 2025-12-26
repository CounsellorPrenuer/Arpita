import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertContactSchema,
  insertBookingSchema,
  insertBlogPostSchema
} from "@shared/schema";
import Razorpay from "razorpay";
import crypto from "crypto";

export async function registerRoutes(app: Express): Promise<Server> {
  // Use environment variables or fallback to test credentials (NOT RECOMMENDED for production)
  // Ideally, these should be in process.env
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET",
  });

  // Create Razorpay Order
  app.post("/api/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;

      const options = {
        amount: amount * 100, // amount in smallest currency unit
        currency,
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Razorpay order creation failed:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });

  // Verify Razorpay Payment
  app.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET")
        .update(sign.toString())
        .digest("hex");

      if (razorpay_signature === expectedSign) {
        // Payment verified successfully
        // Here you would typically save the payment info to your database
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });

  // Admin Dashboard Stats
  app.get("/api/admin/stats", async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      const contacts = await storage.getAllContacts();
      const payments = await storage.getAllPayments();
      const downloads = await storage.getAllDownloads();
      const blogPosts = await storage.getAllBlogPosts();

      const stats = {
        bookings: bookings.length,
        contacts: contacts.length,
        payments: payments.length,
        downloads: downloads.length,
        blogPosts: blogPosts.filter(b => b.published).length,
        pending: 0,
        contacted: contacts.length,
        completed: payments.filter(p => p.status === 'completed').length,
        totalRecords: bookings.length + contacts.length + payments.length + downloads.length,
      };

      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Recent Data
  app.get("/api/admin/recent-bookings", async (_req, res) => {
    try {
      const bookings = await storage.getRecentBookings(5);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent bookings" });
    }
  });

  app.get("/api/admin/recent-contacts", async (_req, res) => {
    try {
      const contacts = await storage.getRecentContacts(5);
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent contacts" });
    }
  });

  app.get("/api/admin/recent-payments", async (_req, res) => {
    try {
      const payments = await storage.getRecentPayments(5);
      res.json(payments);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent payments" });
    }
  });

  app.get("/api/admin/recent-downloads", async (_req, res) => {
    try {
      const downloads = await storage.getRecentDownloads(5);
      res.json(downloads);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent downloads" });
    }
  });

  // Export All Data
  app.get("/api/admin/export/bookings", async (_req, res) => {
    try {
      const data = await storage.getAllBookings();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export bookings" });
    }
  });

  app.get("/api/admin/export/contacts", async (_req, res) => {
    try {
      const data = await storage.getAllContacts();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export contacts" });
    }
  });

  app.get("/api/admin/export/payments", async (_req, res) => {
    try {
      const data = await storage.getAllPayments();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export payments" });
    }
  });

  app.get("/api/admin/export/downloads", async (_req, res) => {
    try {
      const data = await storage.getAllDownloads();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export downloads" });
    }
  });

  app.get("/api/admin/export/all", async (_req, res) => {
    try {
      const [bookings, contacts, payments, downloads] = await Promise.all([
        storage.getAllBookings(),
        storage.getAllContacts(),
        storage.getAllPayments(),
        storage.getAllDownloads(),
      ]);

      res.json({
        bookings,
        contacts,
        payments,
        downloads,
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to export all data" });
    }
  });

  // Contact Form Submission
  app.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validated);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });

  // Booking Submission
  app.post("/api/bookings", async (req, res) => {
    try {
      const validated = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validated);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });

  // Get All Bookings
  app.get("/api/bookings", async (_req, res) => {
    try {
      const bookings = await storage.getAllBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });

  // Blog Posts
  app.get("/api/blog-posts", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog-posts", async (req, res) => {
    try {
      const validated = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validated);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });

  app.patch("/api/blog-posts/:id", async (req, res) => {
    try {
      const post = await storage.updateBlogPost(req.params.id, req.body);
      if (!post) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Failed to update blog post" });
    }
  });

  app.delete("/api/blog-posts/:id", async (req, res) => {
    try {
      const success = await storage.deleteBlogPost(req.params.id);
      if (!success) {
        return res.status(404).json({ error: "Blog post not found" });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
