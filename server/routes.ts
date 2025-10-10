import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSchema, 
  insertBookingSchema, 
  insertBlogPostSchema 
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
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
