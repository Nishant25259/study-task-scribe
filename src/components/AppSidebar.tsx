
import { Book, BookCheck, Calendar, ListTodo, History } from "lucide-react";
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
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
    </Sidebar>
  );
}
