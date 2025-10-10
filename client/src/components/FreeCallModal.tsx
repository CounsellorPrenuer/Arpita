import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Check, X, Clock, Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const freeCallSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  background: z.string().min(1, "Please select your background"),
});

type FreeCallFormData = z.infer<typeof freeCallSchema>;

interface FreeCallModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function FreeCallModal({ open, onOpenChange }: FreeCallModalProps) {
  const { toast } = useToast();
  const [background, setBackground] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<FreeCallFormData>({
    resolver: zodResolver(freeCallSchema),
    defaultValues: {
      name: "",
      phone: "",
      background: "",
    },
  });

  const bookCallMutation = useMutation({
    mutationFn: async (data: FreeCallFormData) => {
      return apiRequest("POST", "/api/bookings", {
        name: data.name,
        email: "freecall@skillzy.com", // Placeholder email for free calls
        phone: data.phone,
        packageType: "free-call",
        packageName: "Free Discovery Call",
        price: "0",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Confirmed!",
        description: "We'll call you within 4 hours. Check your phone!",
      });
      reset();
      setBackground("");
      onOpenChange(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Booking Failed",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FreeCallFormData) => {
    bookCallMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950 p-0" aria-describedby="free-call-description">
        <div className="p-6">
          <DialogHeader className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-50" />
                <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-2xl">
                  <Phone className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <DialogTitle className="text-3xl font-black bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent" data-testid="text-modal-title">
                  Free Discovery Call
                </DialogTitle>
                <div id="free-call-description" className="flex items-center gap-1 mt-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">Trusted by 3,725+ professionals</p>
                </div>
              </div>
            </div>
          </DialogHeader>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {/* What You'll Get */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">What You'll Get (Free)</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>10-min focused discussion</strong> about your career situation
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Actionable roadmap</strong> with 2-3 immediate next steps
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Expert assessment</strong> of your primary career challenge
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    <strong>Personalized guidance</strong> based on your unique needs
                  </span>
                </li>
              </ul>
            </div>

            {/* Not Included */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <X className="h-5 w-5 text-slate-400" />
                <h3 className="font-bold text-slate-900 dark:text-white">Not Included (Paid Only)</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <X className="h-3 w-3 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-500 line-through">
                    Full psychometric assessment & detailed report
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <X className="h-3 w-3 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-500 line-through">
                    60-90 minute deep-dive counseling session
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <X className="h-3 w-3 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-500 line-through">
                    Career-compatibility analysis
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1">
                    <X className="h-3 w-3 text-slate-400" />
                  </div>
                  <span className="text-sm text-slate-500 line-through">
                    Ongoing mentorship support
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Quick & Valuable Banner */}
          <div className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-4">
            <div className="flex items-center gap-3 text-white">
              <Clock className="h-5 w-5 flex-shrink-0" />
              <div>
                <h4 className="font-bold">Quick & Valuable</h4>
                <p className="text-sm opacity-90">Get clarity in just 10 minutes - no strings attached</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-900 dark:text-white font-semibold">
                  Full Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  data-testid="input-free-call-name"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-slate-900 dark:text-white font-semibold">
                  Phone Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="phone"
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600"
                  data-testid="input-free-call-phone"
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background" className="text-slate-900 dark:text-white font-semibold">
                Current Background <span className="text-red-500">*</span>
              </Label>
              <Select
                value={background}
                onValueChange={(value) => {
                  setBackground(value);
                  setValue("background", value, { shouldValidate: true });
                }}
              >
                <SelectTrigger className="bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600" data-testid="select-free-call-background">
                  <SelectValue placeholder="Select your current background" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student-8-9">Student (Class 8-9)</SelectItem>
                  <SelectItem value="student-10-12">Student (Class 10-12)</SelectItem>
                  <SelectItem value="college">College Student</SelectItem>
                  <SelectItem value="working-professional">Working Professional</SelectItem>
                  <SelectItem value="career-break">On Career Break</SelectItem>
                  <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.background && <p className="text-sm text-red-500">{errors.background.message}</p>}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-6 text-lg shadow-2xl shadow-blue-500/30"
              disabled={bookCallMutation.isPending}
              data-testid="button-book-free-call"
            >
              <Phone className="mr-2 h-5 w-5" />
              {bookCallMutation.isPending ? "Booking..." : "Book a Free Call →"}
            </Button>
          </form>

          {/* Timeline */}
          <div className="mt-6 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-orange-500 p-2 rounded-lg">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white">Your 10-Minute Call Timeline</h4>
            </div>
            <div className="space-y-2">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Minutes 0-3: Quick Introduction</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">We'll understand your current situation & immediate concerns</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Minutes 3-7: Problem Diagnosis</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">We'll identify your core challenges & hit one root causes</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white text-sm">Minutes 7-10: Action Plan</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">You'll get 2-3 specific steps to implement immediately</p>
                </div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-800 flex items-center justify-center gap-4 flex-wrap text-xs text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                We'll call within 4 hours
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                100% Free
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Check className="h-3 w-3" />
                Results-focused
              </span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
