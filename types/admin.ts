export interface AdminStats {
  overview: {
    totalUsers: number;
    userGrowth: number;

    customers: number;
    customersThisMonth: number;
    customersPreviousMonth: number;
    customerPercentage: number;

    technicians: number;
    techniciansThisMonth: number;
    techniciansPreviousMonth: number;
    technicianPercentage: number;

    activeBookings: number;

    completedJobs: number;
    completionRate: number;

    totalRevenue: number;
    revenueGrowth: number;
  };

  charts: {
    bookingsOverTime: {
      month: string;
      bookings: number;
    }[];

    revenueOverTime: {
      month: string;
      revenue: number;
    }[];
  };

  recentActivity: {
    type: string;
    message: string;
    createdAt: string | null;
  }[];

  platformHealth: {
    api: string;
    payments: string;
    activeTechnicians: number;
  };
}
