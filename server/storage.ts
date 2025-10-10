import { 
  type User, 
  type InsertUser, 
  type Booking, 
  type InsertBooking,
  type Contact, 
  type InsertContact,
  type Payment, 
  type InsertPayment,
  type Download, 
  type InsertDownload,
  type BlogPost, 
  type InsertBlogPost
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Bookings
  getAllBookings(): Promise<Booking[]>;
  getRecentBookings(limit: number): Promise<Booking[]>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Contacts
  getAllContacts(): Promise<Contact[]>;
  getRecentContacts(limit: number): Promise<Contact[]>;
  createContact(contact: InsertContact): Promise<Contact>;
  
  // Payments
  getAllPayments(): Promise<Payment[]>;
  getRecentPayments(limit: number): Promise<Payment[]>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  
  // Downloads
  getAllDownloads(): Promise<Download[]>;
  getRecentDownloads(limit: number): Promise<Download[]>;
  createDownload(download: InsertDownload): Promise<Download>;
  
  // Blog Posts
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, blogPost: Partial<InsertBlogPost>): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private bookings: Map<string, Booking>;
  private contacts: Map<string, Contact>;
  private payments: Map<string, Payment>;
  private downloads: Map<string, Download>;
  private blogPosts: Map<string, BlogPost>;

  constructor() {
    this.users = new Map();
    this.bookings = new Map();
    this.contacts = new Map();
    this.payments = new Map();
    this.downloads = new Map();
    this.blogPosts = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Bookings
  async getAllBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getRecentBookings(limit: number): Promise<Booking[]> {
    const all = await this.getAllBookings();
    return all.slice(0, limit);
  }
  
  async createBooking(insertBooking: InsertBooking): Promise<Booking> {
    const id = randomUUID();
    const booking: Booking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, booking);
    return booking;
  }
  
  // Contacts
  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getRecentContacts(limit: number): Promise<Contact[]> {
    const all = await this.getAllContacts();
    return all.slice(0, limit);
  }
  
  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, contact);
    return contact;
  }
  
  // Payments
  async getAllPayments(): Promise<Payment[]> {
    return Array.from(this.payments.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getRecentPayments(limit: number): Promise<Payment[]> {
    const all = await this.getAllPayments();
    return all.slice(0, limit);
  }
  
  async createPayment(insertPayment: InsertPayment): Promise<Payment> {
    const id = randomUUID();
    const payment: Payment = { 
      ...insertPayment, 
      id,
      createdAt: new Date()
    };
    this.payments.set(id, payment);
    return payment;
  }
  
  // Downloads
  async getAllDownloads(): Promise<Download[]> {
    return Array.from(this.downloads.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getRecentDownloads(limit: number): Promise<Download[]> {
    const all = await this.getAllDownloads();
    return all.slice(0, limit);
  }
  
  async createDownload(insertDownload: InsertDownload): Promise<Download> {
    const id = randomUUID();
    const download: Download = { 
      ...insertDownload, 
      id,
      createdAt: new Date()
    };
    this.downloads.set(id, download);
    return download;
  }
  
  // Blog Posts
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }
  
  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const now = new Date();
    const blogPost: BlogPost = { 
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
  
  async updateBlogPost(id: string, updates: Partial<InsertBlogPost>): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = {
      ...existing,
      ...updates,
      updatedAt: new Date()
    };
    this.blogPosts.set(id, updated);
    return updated;
  }
  
  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }
}

export const storage = new MemStorage();
