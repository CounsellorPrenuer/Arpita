import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Mail, CreditCard, Download, Users, CheckCircle, Download as DownloadIcon } from "lucide-react";
import * as XLSX from "xlsx";
import type { Booking, Contact, Payment, Download as DownloadType } from "@shared/schema";

interface AdminStats {
  bookings: number;
  contacts: number;
  payments: number;
  downloads: number;
  pending: number;
  contacted: number;
  completed: number;
}

export default function AdminDashboard() {
  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["/api/admin/stats"],
  });

  const { data: recentBookings } = useQuery<Booking[]>({
    queryKey: ["/api/admin/recent-bookings"],
  });

  const { data: recentContacts } = useQuery<Contact[]>({
    queryKey: ["/api/admin/recent-contacts"],
  });

  const leads = [
    ...(recentBookings || []).map(b => ({ ...b, type: "booking" as const })),
    ...(recentContacts || []).map(c => ({ ...c, type: "contact" as const }))
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const { data: recentPayments } = useQuery<Payment[]>({
    queryKey: ["/api/admin/recent-payments"],
  });

  const { data: recentDownloads } = useQuery<DownloadType[]>({
    queryKey: ["/api/admin/recent-downloads"],
  });

  const exportToExcel = async (type: "bookings" | "contacts" | "payments" | "downloads" | "all") => {
    try {
      const response = await fetch(`/api/admin/export/${type}`);
      const data = await response.json();

      if (type === "all") {
        const wb = XLSX.utils.book_new();
        
        Object.entries(data).forEach(([key, value]) => {
          const ws = XLSX.utils.json_to_sheet(value as any[]);
          XLSX.utils.book_append_sheet(wb, ws, key.charAt(0).toUpperCase() + key.slice(1));
        });
        
        XLSX.writeFile(wb, `admin_all_data_${new Date().toISOString().split('T')[0]}.xlsx`);
      } else {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, type.charAt(0).toUpperCase() + type.slice(1));
        XLSX.writeFile(wb, `${type}_${new Date().toISOString().split('T')[0]}.xlsx`);
      }
    } catch (error) {
      console.error("Export failed:", error);
    }
  };

  const statCards = [
    { label: "BOOKINGS", value: stats?.bookings || 0, icon: BookOpen, bgColor: "bg-blue-500", testId: "stat-bookings" },
    { label: "CONTACTS", value: stats?.contacts || 0, icon: Mail, bgColor: "bg-emerald-500", testId: "stat-contacts" },
    { label: "PAYMENTS", value: stats?.payments || 0, icon: CreditCard, bgColor: "bg-purple-500", testId: "stat-payments" },
    { label: "DOWNLOADS", value: stats?.downloads || 0, icon: Download, bgColor: "bg-orange-500", testId: "stat-downloads" },
    { label: "PENDING", value: stats?.pending || 0, icon: Users, bgColor: "bg-yellow-500", testId: "stat-pending" },
    { label: "CONTACTED", value: stats?.contacted || 0, icon: Users, bgColor: "bg-cyan-500", testId: "stat-contacted" },
    { label: "COMPLETED", value: stats?.completed || 0, icon: CheckCircle, bgColor: "bg-green-500", testId: "stat-completed" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900" data-testid="text-page-title">Admin Dashboard</h1>
          <p className="text-slate-600 mt-1">Comprehensive business analytics and management center</p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">Customer Data</h2>
          </div>
          
          <Button 
            onClick={() => exportToExcel("all")} 
            className="bg-emerald-600 hover:bg-emerald-700"
            data-testid="button-export-all"
          >
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export to Excel
          </Button>
        </div>

        <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {statCards.map((stat) => (
                  <Card key={stat.label} className="p-4" data-testid={stat.testId}>
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                        <stat.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-slate-900" data-testid={`${stat.testId}-value`}>{stat.value}</p>
                        <p className="text-xs text-slate-600 uppercase tracking-wide" data-testid={`${stat.testId}-label`}>{stat.label}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900" data-testid="text-leads-title">
                      All Leads ({leads.length})
                    </h2>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => exportToExcel("bookings")} 
                        variant="outline" 
                        size="sm"
                        data-testid="button-export-leads-bookings"
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Export Bookings
                      </Button>
                      <Button 
                        onClick={() => exportToExcel("contacts")} 
                        variant="outline" 
                        size="sm"
                        data-testid="button-export-leads-contacts"
                      >
                        <DownloadIcon className="w-4 h-4 mr-2" />
                        Export Contacts
                      </Button>
                    </div>
                  </div>
                  <Card className="p-4">
                    {leads.length > 0 ? (
                      <div className="space-y-3">
                        {leads.map((lead, index) => (
                          <div 
                            key={`${lead.type}-${lead.id}`}
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            data-testid={`lead-item-${index}`}
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold text-slate-900" data-testid={`lead-name-${index}`}>{lead.name}</p>
                                <Badge 
                                  variant={lead.type === "booking" ? "default" : "secondary"}
                                  className={lead.type === "booking" ? "bg-blue-500" : "bg-emerald-500"}
                                  data-testid={`lead-type-${index}`}
                                >
                                  {lead.type === "booking" ? "Package Booking" : "Contact Form"}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-600" data-testid={`lead-email-${index}`}>{lead.email}</p>
                              {lead.type === "booking" && (
                                <p className="text-xs text-slate-500 mt-1" data-testid={`lead-package-${index}`}>
                                  {(lead as Booking).packageType} - {(lead as Booking).packageName} ({(lead as Booking).price})
                                </p>
                              )}
                              {lead.type === "contact" && (
                                <p className="text-xs text-slate-500 mt-1" data-testid={`lead-message-${index}`}>
                                  {(lead as Contact).message.substring(0, 100)}...
                                </p>
                              )}
                              {lead.type === "booking" && (lead as Booking).phone && (
                                <p className="text-xs text-slate-500" data-testid={`lead-phone-${index}`}>
                                  📱 {(lead as Booking).phone}
                                </p>
                              )}
                            </div>
                            <p className="text-sm text-slate-500" data-testid={`lead-date-${index}`}>
                              {new Date(lead.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No Leads Yet</p>
                        <p className="text-sm text-slate-400">Package bookings and contact submissions will appear here.</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900" data-testid="text-recent-bookings-title">
                      Recent Bookings ({recentBookings?.length || 0})
                    </h2>
                    <Button 
                      onClick={() => exportToExcel("bookings")} 
                      variant="outline" 
                      size="sm"
                      data-testid="button-export-bookings"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <Card className="p-4">
                    {recentBookings && recentBookings.length > 0 ? (
                      <div className="space-y-3">
                        {recentBookings.map((booking, index) => (
                          <div 
                            key={booking.id} 
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            data-testid={`booking-item-${index}`}
                          >
                            <div>
                              <p className="font-semibold text-slate-900" data-testid={`booking-name-${index}`}>{booking.name}</p>
                              <p className="text-sm text-slate-600" data-testid={`booking-email-${index}`}>{booking.email}</p>
                              <p className="text-xs text-slate-500" data-testid={`booking-package-${index}`}>
                                {booking.packageType} - {booking.packageName} ({booking.price})
                              </p>
                            </div>
                            <p className="text-sm text-slate-500" data-testid={`booking-date-${index}`}>
                              {new Date(booking.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No Bookings Yet</p>
                        <p className="text-sm text-slate-400">When customers book packages, they'll appear here.</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900" data-testid="text-contact-submissions-title">
                      Contact Form Submissions ({recentContacts?.length || 0})
                    </h2>
                    <Button 
                      onClick={() => exportToExcel("contacts")} 
                      variant="outline" 
                      size="sm"
                      data-testid="button-export-contacts"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <Card className="p-4">
                    {recentContacts && recentContacts.length > 0 ? (
                      <div className="space-y-3">
                        {recentContacts.map((contact, index) => (
                          <div 
                            key={contact.id} 
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            data-testid={`contact-item-${index}`}
                          >
                            <div>
                              <p className="font-semibold text-slate-900" data-testid={`contact-name-${index}`}>{contact.name}</p>
                              <p className="text-sm text-slate-600" data-testid={`contact-email-${index}`}>{contact.email}</p>
                              <p className="text-xs text-slate-500" data-testid={`contact-message-${index}`}>
                                {contact.message.substring(0, 100)}...
                              </p>
                            </div>
                            <p className="text-sm text-slate-500" data-testid={`contact-date-${index}`}>
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Mail className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No Contact Submissions</p>
                        <p className="text-sm text-slate-400">Contact form submissions will appear here.</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900" data-testid="text-payment-records-title">
                      Payment Records ({recentPayments?.length || 0})
                    </h2>
                    <Button 
                      onClick={() => exportToExcel("payments")} 
                      variant="outline" 
                      size="sm"
                      data-testid="button-export-payments"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <Card className="p-4">
                    {recentPayments && recentPayments.length > 0 ? (
                      <div className="space-y-3">
                        {recentPayments.map((payment, index) => (
                          <div 
                            key={payment.id} 
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            data-testid={`payment-item-${index}`}
                          >
                            <div>
                              <p className="font-semibold text-slate-900" data-testid={`payment-customer-${index}`}>
                                {payment.customerName}
                              </p>
                              <p className="text-sm text-slate-600" data-testid={`payment-order-${index}`}>
                                Order ID: {payment.orderId}
                              </p>
                              <p className="text-xs text-slate-500" data-testid={`payment-amount-${index}`}>
                                ₹{payment.amount} - {payment.status}
                              </p>
                            </div>
                            <p className="text-sm text-slate-500" data-testid={`payment-date-${index}`}>
                              {new Date(payment.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No Payments</p>
                        <p className="text-sm text-slate-400">Payment records will appear here.</p>
                      </div>
                    )}
                  </Card>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-slate-900" data-testid="text-resource-downloads-title">
                      Resource Downloads ({recentDownloads?.length || 0})
                    </h2>
                    <Button 
                      onClick={() => exportToExcel("downloads")} 
                      variant="outline" 
                      size="sm"
                      data-testid="button-export-downloads"
                    >
                      <DownloadIcon className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <Card className="p-4">
                    {recentDownloads && recentDownloads.length > 0 ? (
                      <div className="space-y-3">
                        {recentDownloads.map((download, index) => (
                          <div 
                            key={download.id} 
                            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                            data-testid={`download-item-${index}`}
                          >
                            <div>
                              <p className="font-semibold text-slate-900" data-testid={`download-resource-${index}`}>
                                {download.resourceName}
                              </p>
                              <p className="text-sm text-slate-600" data-testid={`download-email-${index}`}>
                                {download.userEmail}
                              </p>
                            </div>
                            <p className="text-sm text-slate-500" data-testid={`download-date-${index}`}>
                              {new Date(download.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <Download className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                        <p className="text-slate-500">No Downloads</p>
                        <p className="text-sm text-slate-400">Resource download records will appear here.</p>
                      </div>
                    )}
                  </Card>
                </div>
              </div>
        </div>
      </div>
    </div>
  );
}
