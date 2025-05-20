import React from "react";
import { 
  MaterialCard, 
  MaterialCardHeader, 
  MaterialCardTitle, 
  MaterialCardContent,
  MaterialCardFooter
} from "../ui/material-card";
import { MaterialButton } from "../ui/material-button";
import { MaterialTextField } from "../ui/material-text-field";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Home, 
  Users, 
  Calendar,
  PlusCircle,
  Search
} from "lucide-react";

export function MaterialDashboard() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-light mb-6">Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stats Cards */}
          <MaterialCard>
            <MaterialCardContent className="flex items-center justify-between">
              <div>
                <p className="text-materialGray-500 dark:text-materialGray-400 text-sm font-medium">ACTIVE DEALS</p>
                <h3 className="text-2xl font-medium mt-1">8</h3>
                <p className="text-sm flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" /> 12% <span className="text-materialGray-500 dark:text-materialGray-400">vs last month</span>
                </p>
              </div>
              <div className="bg-primary/10 p-3 rounded-full">
                <Home className="w-6 h-6 text-primary" />
              </div>
            </MaterialCardContent>
          </MaterialCard>
          
          <MaterialCard>
            <MaterialCardContent className="flex items-center justify-between">
              <div>
                <p className="text-materialGray-500 dark:text-materialGray-400 text-sm font-medium">REVENUE</p>
                <h3 className="text-2xl font-medium mt-1">$34,245</h3>
                <p className="text-sm flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" /> 8% <span className="text-materialGray-500 dark:text-materialGray-400">vs last month</span>
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
            </MaterialCardContent>
          </MaterialCard>
          
          <MaterialCard>
            <MaterialCardContent className="flex items-center justify-between">
              <div>
                <p className="text-materialGray-500 dark:text-materialGray-400 text-sm font-medium">LEADS</p>
                <h3 className="text-2xl font-medium mt-1">256</h3>
                <p className="text-sm flex items-center gap-1 mt-1 text-red-600">
                  <TrendingDown className="w-4 h-4" /> 3% <span className="text-materialGray-500 dark:text-materialGray-400">vs last month</span>
                </p>
              </div>
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
            </MaterialCardContent>
          </MaterialCard>
          
          <MaterialCard>
            <MaterialCardContent className="flex items-center justify-between">
              <div>
                <p className="text-materialGray-500 dark:text-materialGray-400 text-sm font-medium">APPOINTMENTS</p>
                <h3 className="text-2xl font-medium mt-1">12</h3>
                <p className="text-sm flex items-center gap-1 mt-1 text-green-600">
                  <TrendingUp className="w-4 h-4" /> 18% <span className="text-materialGray-500 dark:text-materialGray-400">vs last month</span>
                </p>
              </div>
              <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
            </MaterialCardContent>
          </MaterialCard>
        </div>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Deals */}
        <MaterialCard className="lg:col-span-2">
          <MaterialCardHeader className="flex justify-between items-center">
            <MaterialCardTitle>Recent Deals</MaterialCardTitle>
            <MaterialButton variant="text" size="sm">View All</MaterialButton>
          </MaterialCardHeader>
          <MaterialCardContent>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-materialGray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search deals..."
                  className="w-full bg-materialGray-100 dark:bg-materialGray-800 rounded-md py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              {/* Deal List */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase border-b border-materialGray-200 dark:border-materialGray-700">
                    <tr>
                      <th className="px-4 py-3 font-medium">Property</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Value</th>
                      <th className="px-4 py-3 font-medium">ROI</th>
                      <th className="px-4 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-materialGray-200 dark:border-materialGray-700">
                      <td className="px-4 py-3">123 Main St.</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">Active</span>
                      </td>
                      <td className="px-4 py-3">$250,000</td>
                      <td className="px-4 py-3 text-green-600">18.5%</td>
                      <td className="px-4 py-3">
                        <MaterialButton variant="text" size="sm">View</MaterialButton>
                      </td>
                    </tr>
                    <tr className="border-b border-materialGray-200 dark:border-materialGray-700">
                      <td className="px-4 py-3">456 Oak Ave.</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">Pending</span>
                      </td>
                      <td className="px-4 py-3">$320,000</td>
                      <td className="px-4 py-3 text-green-600">15.2%</td>
                      <td className="px-4 py-3">
                        <MaterialButton variant="text" size="sm">View</MaterialButton>
                      </td>
                    </tr>
                    <tr className="border-b border-materialGray-200 dark:border-materialGray-700">
                      <td className="px-4 py-3">789 Pine Rd.</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">Negotiating</span>
                      </td>
                      <td className="px-4 py-3">$185,000</td>
                      <td className="px-4 py-3 text-green-600">21.3%</td>
                      <td className="px-4 py-3">
                        <MaterialButton variant="text" size="sm">View</MaterialButton>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3">512 Cedar Ln.</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">Closed</span>
                      </td>
                      <td className="px-4 py-3">$420,000</td>
                      <td className="px-4 py-3 text-green-600">12.8%</td>
                      <td className="px-4 py-3">
                        <MaterialButton variant="text" size="sm">View</MaterialButton>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </MaterialCardContent>
          <MaterialCardFooter className="flex justify-between items-center">
            <p className="text-sm text-materialGray-500 dark:text-materialGray-400">Showing 4 of 8 deals</p>
            <div className="flex gap-2">
              <MaterialButton variant="outlined" size="sm">Prev</MaterialButton>
              <MaterialButton variant="outlined" size="sm">Next</MaterialButton>
            </div>
          </MaterialCardFooter>
        </MaterialCard>
        
        {/* Add New Deal Card */}
        <MaterialCard>
          <MaterialCardHeader>
            <MaterialCardTitle>Add New Deal</MaterialCardTitle>
          </MaterialCardHeader>
          <MaterialCardContent>
            <form className="space-y-4">
              <MaterialTextField
                variant="outlined"
                label="Property Address"
                fullWidth
              />
              <MaterialTextField
                variant="outlined"
                label="Purchase Price"
                type="number"
                startIcon={<DollarSign className="w-4 h-4" />}
                fullWidth
              />
              <MaterialTextField
                variant="outlined"
                label="Estimated ARV"
                type="number"
                startIcon={<DollarSign className="w-4 h-4" />}
                fullWidth
              />
              <MaterialTextField
                variant="outlined"
                label="Repair Costs"
                type="number"
                startIcon={<DollarSign className="w-4 h-4" />}
                fullWidth
              />
              <div className="pt-4">
                <MaterialButton variant="primary" fullWidth>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Add Deal
                </MaterialButton>
              </div>
            </form>
          </MaterialCardContent>
        </MaterialCard>
      </section>
      
      <section>
        {/* Marketing Campaigns */}
        <MaterialCard>
          <MaterialCardHeader className="flex justify-between items-center">
            <MaterialCardTitle>Active Marketing Campaigns</MaterialCardTitle>
            <MaterialButton variant="text" size="sm">Manage Campaigns</MaterialButton>
          </MaterialCardHeader>
          <MaterialCardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-materialGray-100 dark:bg-materialGray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Direct Mail</h4>
                <p className="text-sm text-materialGray-600 dark:text-materialGray-400 mb-4">Targeted mailers to absentee owners</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">68%</span>
                </div>
                <div className="w-full h-2 bg-materialGray-300 dark:bg-materialGray-700 rounded-full mt-1">
                  <div className="h-full bg-primary rounded-full" style={{ width: "68%" }}></div>
                </div>
              </div>
              
              <div className="bg-materialGray-100 dark:bg-materialGray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Facebook Ads</h4>
                <p className="text-sm text-materialGray-600 dark:text-materialGray-400 mb-4">Rental property investment opportunity ads</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">42%</span>
                </div>
                <div className="w-full h-2 bg-materialGray-300 dark:bg-materialGray-700 rounded-full mt-1">
                  <div className="h-full bg-primary rounded-full" style={{ width: "42%" }}></div>
                </div>
              </div>
              
              <div className="bg-materialGray-100 dark:bg-materialGray-800 p-4 rounded-lg">
                <h4 className="text-lg font-medium mb-2">Cold Calling</h4>
                <p className="text-sm text-materialGray-600 dark:text-materialGray-400 mb-4">Foreclosure list in zip codes 12345, 67890</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm font-medium">89%</span>
                </div>
                <div className="w-full h-2 bg-materialGray-300 dark:bg-materialGray-700 rounded-full mt-1">
                  <div className="h-full bg-primary rounded-full" style={{ width: "89%" }}></div>
                </div>
              </div>
            </div>
          </MaterialCardContent>
        </MaterialCard>
      </section>
    </div>
  );
} 