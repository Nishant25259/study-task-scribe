
import { useState, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { TaskGrid } from "@/components/TaskGrid";
import { TaskForm } from "@/components/TaskForm";
import { StudyProgress } from "@/components/StudyProgress";
import { TaskHistory } from "@/components/TaskHistory";
import { AuthPage } from "@/components/AuthPage";
import { Button } from "@/components/ui/button";
import { Plus, History, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  totalSessions: number;
  completedSessions: number;
  sessions: boolean[]; // Track individual session completion
  createdAt: Date;
  isCompleted: boolean;
  completedAt?: Date;
}

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskHistory, setTaskHistory] = useState<Task[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  // Load tasks from Supabase
  useEffect(() => {
    if (user) {
      loadTasks();
      loadCompletedTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', false)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const formattedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        progress: task.progress,
        totalSessions: task.total_sessions,
        completedSessions: task.completed_sessions,
        sessions: task.sessions as boolean[],
        isCompleted: task.is_completed,
        createdAt: new Date(task.created_at),
        completedAt: task.completed_at ? new Date(task.completed_at) : undefined,
      }));
      
      setTasks(formattedTasks);
    } catch (error) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const loadCompletedTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('is_completed', true)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      
      const formattedTasks = data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description,
        category: task.category,
        progress: task.progress,
        totalSessions: task.total_sessions,
        completedSessions: task.completed_sessions,
        sessions: task.sessions as boolean[],
        isCompleted: task.is_completed,
        createdAt: new Date(task.created_at),
        completedAt: task.completed_at ? new Date(task.completed_at) : undefined,
      }));
      
      setTaskHistory(formattedTasks);
    } catch (error) {
      toast({
        title: "Error loading completed tasks",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const addTask = async (newTask: Omit<Task, "id" | "createdAt">) => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([{
          user_id: user?.id,
          title: newTask.title,
          description: newTask.description,
          category: newTask.category,
          progress: newTask.progress,
          total_sessions: newTask.totalSessions,
          completed_sessions: newTask.completedSessions,
          sessions: Array(newTask.totalSessions).fill(false),
          is_completed: newTask.isCompleted,
        }])
        .select()
        .single();

      if (error) throw error;
      
      const formattedTask = {
        id: data.id,
        title: data.title,
        description: data.description,
        category: data.category,
        progress: data.progress,
        totalSessions: data.total_sessions,
        completedSessions: data.completed_sessions,
        sessions: data.sessions as boolean[],
        isCompleted: data.is_completed,
        createdAt: new Date(data.created_at),
        completedAt: data.completed_at ? new Date(data.completed_at) : undefined,
      };
      
      setTasks([formattedTask, ...tasks]);
      setShowTaskForm(false);
      
      toast({
        title: "Task created",
        description: "Your task has been saved successfully!",
      });
    } catch (error) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTask = async (taskId: string, updates: Partial<Task>) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({
          title: updates.title,
          description: updates.description,
          category: updates.category,
          progress: updates.progress,
          total_sessions: updates.totalSessions,
          completed_sessions: updates.completedSessions,
          sessions: updates.sessions,
          is_completed: updates.isCompleted,
          completed_at: updates.isCompleted ? new Date().toISOString() : null,
        })
        .eq('id', taskId);

      if (error) throw error;

      // Update local state
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          const updatedTask = { ...task, ...updates };
          
          // If task is being completed, move it to history
          if (updates.isCompleted && !task.isCompleted) {
            const completedTask = { ...updatedTask, completedAt: new Date() };
            setTaskHistory(prev => [completedTask, ...prev]);
            return null; // Will be filtered out below
          }
          
          return updatedTask;
        }
        return task;
      }).filter(Boolean) as Task[]);
      
      toast({
        title: "Task updated",
        description: "Your changes have been saved!",
      });
    } catch (error) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', taskId);

      if (error) throw error;
      
      setTasks(tasks.filter(task => task.id !== taskId));
      
      toast({
        title: "Task deleted",
        description: "Task has been removed successfully!",
      });
    } catch (error) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const filteredTasks = activeCategory === "All" 
    ? tasks 
    : tasks.filter(task => task.category === activeCategory);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <AppSidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          tasks={tasks}
          taskHistory={taskHistory}
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
              
              <div className="flex gap-2">
                <Button 
                  onClick={signOut}
                  variant="outline"
                  className="border-gray-300"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
                
                <Button 
                  onClick={() => setShowHistory(!showHistory)}
                  variant="outline"
                  className="border-gray-300"
                >
                  <History className="w-4 h-4 mr-2" />
                  {showHistory ? "Hide History" : "Show History"}
                </Button>
                
                <Button 
                  onClick={() => setShowTaskForm(true)}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Task
                </Button>
              </div>
            </div>

            <StudyProgress tasks={tasks} taskHistory={taskHistory} />
            
            {showHistory ? (
              <TaskHistory tasks={taskHistory} />
            ) : (
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
            )}
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
