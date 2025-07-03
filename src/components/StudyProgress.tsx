
import { Task } from "@/pages/Index";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BookCheck, Calendar, ListTodo, TrendingUp } from "lucide-react";

interface StudyProgressProps {
  tasks: Task[];
  taskHistory: Task[];
}

export function StudyProgress({ tasks, taskHistory }: StudyProgressProps) {
  const activeTasks = tasks.length;
  const completedTasks = taskHistory.length;
  const totalTasks = activeTasks + completedTasks;
  const totalSessions = tasks.reduce((sum, task) => sum + task.totalSessions, 0);
  const completedSessions = tasks.reduce((sum, task) => sum + task.completedSessions, 0) + 
                           taskHistory.reduce((sum, task) => sum + task.totalSessions, 0);
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const sessionProgress = totalSessions > 0 ? Math.round((completedSessions / totalSessions) * 100) : 0;

  const stats = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ListTodo,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: BookCheck,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Study Sessions",
      value: completedSessions,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Progress",
      value: `${overallProgress}%`,
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ];

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">
            Overall Progress
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Task Completion</span>
              <span className="font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
          
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Session Progress</span>
              <span className="font-medium">{sessionProgress}%</span>
            </div>
            <Progress value={sessionProgress} className="h-3" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
