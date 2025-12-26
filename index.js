// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// server/storage.ts
import { randomUUID } from "crypto";
var MemStorage = class {
  users;
  bookings;
  contacts;
  payments;
  downloads;
  blogPosts;
  constructor() {
    this.users = /* @__PURE__ */ new Map();
    this.bookings = /* @__PURE__ */ new Map();
    this.contacts = /* @__PURE__ */ new Map();
    this.payments = /* @__PURE__ */ new Map();
    this.downloads = /* @__PURE__ */ new Map();
    this.blogPosts = /* @__PURE__ */ new Map();
  }
  async getUser(id) {
    return this.users.get(id);
  }
  async getUserByUsername(username) {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }
  async createUser(insertUser) {
    const id = randomUUID();
    const user = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  // Bookings
  async getAllBookings() {
    return Array.from(this.bookings.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getRecentBookings(limit) {
    const all = await this.getAllBookings();
    return all.slice(0, limit);
  }
  async createBooking(insertBooking) {
    const id = randomUUID();
    const booking = {
      ...insertBooking,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  // Contacts
  async getAllContacts() {
    return Array.from(this.contacts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getRecentContacts(limit) {
    const all = await this.getAllContacts();
    return all.slice(0, limit);
  }
  async createContact(insertContact) {
    const id = randomUUID();
    const contact = {
      ...insertContact,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  // Payments
  async getAllPayments() {
    return Array.from(this.payments.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getRecentPayments(limit) {
    const all = await this.getAllPayments();
    return all.slice(0, limit);
  }
  async createPayment(insertPayment) {
    const id = randomUUID();
    const payment = {
      ...insertPayment,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }
  // Downloads
  async getAllDownloads() {
    return Array.from(this.downloads.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getRecentDownloads(limit) {
    const all = await this.getAllDownloads();
    return all.slice(0, limit);
  }
  async createDownload(insertDownload) {
    const id = randomUUID();
    const download = {
      ...insertDownload,
      id,
      createdAt: /* @__PURE__ */ new Date()
    };
    this.downloads.set(id, download);
    return download;
  }
  // Blog Posts
  async getAllBlogPosts() {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  async getBlogPost(id) {
    return this.blogPosts.get(id);
  }
  async createBlogPost(insertBlogPost) {
    const id = randomUUID();
    const now = /* @__PURE__ */ new Date();
    const blogPost = {
      ...insertBlogPost,
      imageUrl: insertBlogPost.imageUrl ?? null,
      published: insertBlogPost.published ?? false,
      id,
      createdAt: now,
      updatedAt: now
    };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  async updateBlogPost(id, updates) {
    const existing = this.blogPosts.get(id);
    if (!existing) return void 0;
    const updated = {
      ...existing,
      ...updates,
      updatedAt: /* @__PURE__ */ new Date()
    };
    this.blogPosts.set(id, updated);
    return updated;
  }
  async deleteBlogPost(id) {
    return this.blogPosts.delete(id);
  }
};
var storage = new MemStorage();

// shared/schema.ts
import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull()
});
var bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  packageType: text("package_type").notNull(),
  packageName: text("package_name").notNull(),
  price: text("price").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var contacts = pgTable("contacts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var payments = pgTable("payments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderId: text("order_id").notNull(),
  amount: integer("amount").notNull(),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var downloads = pgTable("downloads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  resourceName: text("resource_name").notNull(),
  userEmail: text("user_email").notNull(),
  downloadUrl: text("download_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull()
});
var blogPosts = pgTable("blog_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  category: text("category").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  published: boolean("published").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true
});
var insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true
});
var insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true
});
var insertPaymentSchema = createInsertSchema(payments).omit({
  id: true,
  createdAt: true
});
var insertDownloadSchema = createInsertSchema(downloads).omit({
  id: true,
  createdAt: true
});
var insertBlogPostSchema = createInsertSchema(blogPosts).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

// server/routes.ts
import Razorpay from "razorpay";
import crypto from "crypto";
async function registerRoutes(app2) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_YOUR_KEY_ID",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET"
  });
  app2.post("/api/create-order", async (req, res) => {
    try {
      const { amount, currency = "INR" } = req.body;
      const options = {
        amount: amount * 100,
        // amount in smallest currency unit
        currency,
        receipt: `receipt_${Date.now()}`
      };
      const order = await razorpay.orders.create(options);
      res.json(order);
    } catch (error) {
      console.error("Razorpay order creation failed:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  });
  app2.post("/api/verify-payment", async (req, res) => {
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
      const sign = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET").update(sign.toString()).digest("hex");
      if (razorpay_signature === expectedSign) {
        res.json({ success: true, message: "Payment verified successfully" });
      } else {
        res.status(400).json({ error: "Invalid signature" });
      }
    } catch (error) {
      console.error("Payment verification failed:", error);
      res.status(500).json({ error: "Payment verification failed" });
    }
  });
  app2.get("/api/admin/stats", async (_req, res) => {
    try {
      const bookings2 = await storage.getAllBookings();
      const contacts2 = await storage.getAllContacts();
      const payments2 = await storage.getAllPayments();
      const downloads2 = await storage.getAllDownloads();
      const blogPosts2 = await storage.getAllBlogPosts();
      const stats = {
        bookings: bookings2.length,
        contacts: contacts2.length,
        payments: payments2.length,
        downloads: downloads2.length,
        blogPosts: blogPosts2.filter((b) => b.published).length,
        pending: 0,
        contacted: contacts2.length,
        completed: payments2.filter((p) => p.status === "completed").length,
        totalRecords: bookings2.length + contacts2.length + payments2.length + downloads2.length
      };
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });
  app2.get("/api/admin/recent-bookings", async (_req, res) => {
    try {
      const bookings2 = await storage.getRecentBookings(5);
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent bookings" });
    }
  });
  app2.get("/api/admin/recent-contacts", async (_req, res) => {
    try {
      const contacts2 = await storage.getRecentContacts(5);
      res.json(contacts2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent contacts" });
    }
  });
  app2.get("/api/admin/recent-payments", async (_req, res) => {
    try {
      const payments2 = await storage.getRecentPayments(5);
      res.json(payments2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent payments" });
    }
  });
  app2.get("/api/admin/recent-downloads", async (_req, res) => {
    try {
      const downloads2 = await storage.getRecentDownloads(5);
      res.json(downloads2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch recent downloads" });
    }
  });
  app2.get("/api/admin/export/bookings", async (_req, res) => {
    try {
      const data = await storage.getAllBookings();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export bookings" });
    }
  });
  app2.get("/api/admin/export/contacts", async (_req, res) => {
    try {
      const data = await storage.getAllContacts();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export contacts" });
    }
  });
  app2.get("/api/admin/export/payments", async (_req, res) => {
    try {
      const data = await storage.getAllPayments();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export payments" });
    }
  });
  app2.get("/api/admin/export/downloads", async (_req, res) => {
    try {
      const data = await storage.getAllDownloads();
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Failed to export downloads" });
    }
  });
  app2.get("/api/admin/export/all", async (_req, res) => {
    try {
      const [bookings2, contacts2, payments2, downloads2] = await Promise.all([
        storage.getAllBookings(),
        storage.getAllContacts(),
        storage.getAllPayments(),
        storage.getAllDownloads()
      ]);
      res.json({
        bookings: bookings2,
        contacts: contacts2,
        payments: payments2,
        downloads: downloads2
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to export all data" });
    }
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(validated);
      res.json(contact);
    } catch (error) {
      res.status(400).json({ error: "Invalid contact data" });
    }
  });
  app2.post("/api/bookings", async (req, res) => {
    try {
      const validated = insertBookingSchema.parse(req.body);
      const booking = await storage.createBooking(validated);
      res.json(booking);
    } catch (error) {
      res.status(400).json({ error: "Invalid booking data" });
    }
  });
  app2.get("/api/bookings", async (_req, res) => {
    try {
      const bookings2 = await storage.getAllBookings();
      res.json(bookings2);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookings" });
    }
  });
  app2.get("/api/blog-posts", async (_req, res) => {
    try {
      const posts = await storage.getAllBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog-posts/:id", async (req, res) => {
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
  app2.post("/api/blog-posts", async (req, res) => {
    try {
      const validated = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validated);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid blog post data" });
    }
  });
  app2.patch("/api/blog-posts/:id", async (req, res) => {
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
  app2.delete("/api/blog-posts/:id", async (req, res) => {
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
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  base: "/Arpita/",
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      ),
      await import("@replit/vite-plugin-dev-banner").then(
        (m) => m.devBanner()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
