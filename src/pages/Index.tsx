
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskGrid } from "@/components/TaskGrid";
import { TaskForm } from "@/components/TaskForm";
import { StudyProgress } from "@/components/StudyProgress";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  createdAt: Date;
  isCompleted: boolean;
}

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "React Fundamentals",
      description: "Learn React basics, components, and state management",
      category: "Programming",
      progress: 60,
      totalSessions: 10,
      completedSessions: 6,
      createdAt: new Date(),
      isCompleted: false,
    },
    {
      id: "2",
      title: "Mathematics Study",
      description: "Advanced calculus and linear algebra",
      category: "Mathematics",
      progress: 30,
      totalSessions: 8,
      completedSessions: 2,
      createdAt: new Date(),
      isCompleted: false,
    },
  ]);

  const [activeCategory, setActiveCategory] = useState("All");
  const [showTaskForm, setShowTaskForm] = useState(false);

  const addTask = (newTask: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setTasks([...tasks, task]);
    setShowTaskForm(false);
  };

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const filteredTasks = activeCategory === "All" 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AppSidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          tasks={tasks}
        />
        
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Study Task Manager
                </h1>
                <p className="text-gray-600">
                  Track your learning progress and stay motivated
                </p>
              </div>
              
              <Button 
                onClick={() => setShowTaskForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </div>

            <StudyProgress tasks={tasks} />
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {activeCategory === "All" ? "All Tasks" : `${activeCategory} Tasks`}
              </h2>
              <TaskGrid 
                tasks={filteredTasks}
                onUpdateTask={updateTask}
                onDeleteTask={deleteTask}
              />
            </div>
          </div>
        </main>

        {showTaskForm && (
          <TaskForm 
            onSubmit={addTask}
            onCancel={() => setShowTaskForm(false)}
          />
        )}
      </div>
    </SidebarProvider>
  );
};

export default Index;
