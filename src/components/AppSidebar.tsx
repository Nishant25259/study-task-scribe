
import { Book, BookCheck, Calendar, ListTodo, History, User, Settings, LogOut, Bell } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProfileDrawer } from "./ProfileDrawer";
import { Task } from "@/pages/Index";

interface AppSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  tasks: Task[];
  taskHistory: Task[];
}

export function AppSidebar({ activeCategory, setActiveCategory, tasks, taskHistory }: AppSidebarProps) {
  const categories = [
    { name: "All", icon: ListTodo, count: tasks.length },
    { name: "Programming", icon: Book, count: tasks.filter(t => t.category === "Programming").length },
    { name: "Mathematics", icon: BookCheck, count: tasks.filter(t => t.category === "Mathematics").length },
    { name: "Languages", icon: Book, count: tasks.filter(t => t.category === "Languages").length },
    { name: "Science", icon: BookCheck, count: tasks.filter(t => t.category === "Science").length },
  ];

  const activeTasks = tasks.length;
  const completedTasks = taskHistory.length;
  const totalSessions = tasks.reduce((sum, task) => sum + task.completedSessions, 0) + 
                       taskHistory.reduce((sum, task) => sum + task.totalSessions, 0);

  const handleSignOut = () => {
    // TODO: Implement actual sign out logic
    console.log("Signing out...");
  };

  return (
    <Sidebar className="border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <SidebarHeader className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Book className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">StudyScribe</span>
            <span className="text-xs text-gray-500">Learning Tracker</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-medium">
            Categories
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {categories.map((category) => (
                <SidebarMenuItem key={category.name}>
                  <SidebarMenuButton
                    onClick={() => setActiveCategory(category.name)}
                    isActive={activeCategory === category.name}
                    className="w-full justify-between hover:bg-blue-50 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-900"
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-700 font-medium">
            Statistics
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg mx-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Active Tasks</span>
                  <span className="font-semibold text-blue-600">{activeTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Completed</span>
                  <span className="font-semibold text-green-600">{completedTasks}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Study Sessions</span>
                  <span className="font-semibold text-purple-600">{totalSessions}</span>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-gray-100">
        <div className="space-y-3">
          {/* Compact User Profile Section */}
          <ProfileDrawer>
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                  JS
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate">
                  John Student
                </p>
              </div>
            </div>
          </ProfileDrawer>

          <Separator />

          {/* Compact Icon-only Menu */}
          <div className="flex items-center justify-between">
            <ProfileDrawer>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100">
                <User className="w-4 h-4" />
              </Button>
            </ProfileDrawer>
            
            <ProfileDrawer>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100">
                <Settings className="w-4 h-4" />
              </Button>
            </ProfileDrawer>
            
            <ProfileDrawer>
              <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-gray-100">
                <Bell className="w-4 h-4" />
              </Button>
            </ProfileDrawer>

            <Button 
              onClick={handleSignOut}
              variant="ghost" 
              size="sm"
              className="w-8 h-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
