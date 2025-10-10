import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, Pencil, Trash2, Plus, Sparkles } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { BlogPost } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

interface BlogManagementProps {
  stats?: {
    blogPosts: number;
  };
}

export default function BlogManagement({ stats }: BlogManagementProps) {
  const { toast } = useToast();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    imageUrl: "",
    published: false,
  });

  const [aiFormData, setAiFormData] = useState({
    topic: "",
    keywords: "",
    tone: "Professional",
    wordCount: "700-1000",
  });

  const { data: blogPosts } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/blog-posts", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      setIsCreateOpen(false);
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const res = await apiRequest("PATCH", `/api/blog-posts/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      setEditingPost(null);
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest("DELETE", `/api/blog-posts/${id}`, undefined);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/blog-posts"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/stats"] });
      toast({
        title: "Success",
        description: "Blog post deleted successfully",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      content: "",
      imageUrl: "",
      published: false,
    });
    setAiFormData({
      topic: "",
      keywords: "",
      tone: "Professional",
      wordCount: "700-1000",
    });
  };

  const handleSubmit = () => {
    if (editingPost) {
      updateMutation.mutate({ id: editingPost.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      content: post.content,
      imageUrl: post.imageUrl || "",
      published: post.published,
    });
    setIsCreateOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      deleteMutation.mutate(id);
    }
  };

  const generateWithAI = () => {
    toast({
      title: "AI Generation",
      description: "AI blog generation feature coming soon!",
    });
  };

  const publishedPosts = blogPosts?.filter(p => p.published) || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-purple-500">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{blogPosts?.length || 0}</p>
              <p className="text-xs text-slate-600 uppercase">Total Blog Posts</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-emerald-50 border-emerald-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-emerald-500">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-emerald-700">AI Powered</p>
              <p className="text-xs text-emerald-600">Content Generation</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-lg bg-blue-500">
              <Eye className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue-700">Smart Editing</p>
              <p className="text-xs text-blue-600">AI Content Suggestions</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end">
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900" data-testid="button-create-blog">
              <Plus className="w-4 h-4 mr-2" />
              Create New Blog
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingPost ? "Edit Blog Post" : "Create New Blog Post"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <Card className="p-4 bg-purple-50 border-purple-200">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900">AI Blog Generation</h3>
                </div>
                <p className="text-sm text-purple-700 mb-4">
                  Generate a professional blog post using AI based on your topic and preferences.
                </p>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <Label htmlFor="topic">Topic *</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., How to transition to leadership roles"
                      value={aiFormData.topic}
                      onChange={(e) => setAiFormData({ ...aiFormData, topic: e.target.value })}
                      data-testid="input-ai-topic"
                    />
                  </div>
                  <div>
                    <Label htmlFor="keywords">Keywords (comma separated)</Label>
                    <Input
                      id="keywords"
                      placeholder="e.g., leadership, career, management"
                      value={aiFormData.keywords}
                      onChange={(e) => setAiFormData({ ...aiFormData, keywords: e.target.value })}
                      data-testid="input-ai-keywords"
                    />
                  </div>
                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={aiFormData.tone} onValueChange={(val) => setAiFormData({ ...aiFormData, tone: val })}>
                      <SelectTrigger id="tone" data-testid="select-ai-tone">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Professional">Professional</SelectItem>
                        <SelectItem value="Casual">Casual</SelectItem>
                        <SelectItem value="Formal">Formal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="wordCount">Word Count</Label>
                    <Select value={aiFormData.wordCount} onValueChange={(val) => setAiFormData({ ...aiFormData, wordCount: val })}>
                      <SelectTrigger id="wordCount" data-testid="select-ai-wordcount">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="500-700">500-700 words</SelectItem>
                        <SelectItem value="700-1000">700-1000 words</SelectItem>
                        <SelectItem value="1000-1500">1000-1500 words</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={generateWithAI} 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  data-testid="button-generate-ai"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Blog Post
                </Button>
              </Card>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter blog title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    data-testid="input-blog-title"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Career Development"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    data-testid="input-blog-category"
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    placeholder="Write your blog content in HTML format..."
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    rows={10}
                    data-testid="textarea-blog-content"
                  />
                </div>

                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    data-testid="input-blog-image"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-4 h-4"
                    data-testid="checkbox-blog-published"
                  />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => { setIsCreateOpen(false); setEditingPost(null); resetForm(); }} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  className="bg-green-600 hover:bg-green-700"
                  disabled={!formData.title || !formData.category || !formData.content}
                  data-testid="button-save-blog"
                >
                  {editingPost ? "Update" : "Create"} Blog Post
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4" data-testid="text-published-posts-title">
          Published Blog Posts ({publishedPosts.length})
        </h2>
        <div className="space-y-4">
          {blogPosts && blogPosts.length > 0 ? (
            blogPosts.map((post, index) => (
              <Card key={post.id} className="p-4" data-testid={`blog-post-${index}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-slate-900" data-testid={`blog-title-${index}`}>
                        {post.title}
                      </h3>
                      <Badge 
                        variant={post.published ? "default" : "secondary"}
                        className={post.published ? "bg-green-500" : ""}
                        data-testid={`blog-status-${index}`}
                      >
                        {post.published ? "PUBLISHED" : "DRAFT"}
                      </Badge>
                    </div>
                    <Badge className="mb-2" data-testid={`blog-category-${index}`}>{post.category}</Badge>
                    <p className="text-sm text-slate-600 mb-2" data-testid={`blog-content-${index}`}>
                      {post.content.substring(0, 150)}...
                    </p>
                    <p className="text-xs text-slate-500" data-testid={`blog-date-${index}`}>
                      Published: {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => alert("View functionality coming soon!")} data-testid={`button-view-${index}`}>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)} data-testid={`button-edit-${index}`}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleDelete(post.id)} data-testid={`button-delete-${index}`}>
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center">
              <Pencil className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500">No Blog Posts Yet</p>
              <p className="text-sm text-slate-400 mb-4">Create your first blog post to get started.</p>
              <Button onClick={() => setIsCreateOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-slate-900">
                <Plus className="w-4 h-4 mr-2" />
                Create First Blog Post
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
