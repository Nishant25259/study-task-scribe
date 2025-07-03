
import { Task } from "@/pages/Index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookCheck, Calendar, Check, Trophy } from "lucide-react";

interface TaskHistoryProps {
  tasks: Task[];
}

export function TaskHistory({ tasks }: TaskHistoryProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trophy className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No completed tasks yet</h3>
        <p className="text-gray-500">Complete your first study task to see it here!</p>
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Programming: "bg-blue-100 text-blue-800",
      Mathematics: "bg-green-100 text-green-800",
      Languages: "bg-purple-100 text-purple-800",
      Science: "bg-orange-100 text-orange-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="w-6 h-6 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Completed Tasks ({tasks.length})
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <Card key={task.id} className="bg-green-50 border-green-200 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 text-green-800 flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {task.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {task.description}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getCategoryColor(task.category)}>
                  {task.category}
                </Badge>
                <Badge className="bg-green-100 text-green-800">
                  <Trophy className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <BookCheck className="w-4 h-4" />
                  <span>{task.totalSessions} sessions completed</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>Started: {task.createdAt.toLocaleDateString()}</span>
                </div>
                {task.completedAt && (
                  <div className="text-green-600 font-medium">
                    Completed: {task.completedAt.toLocaleDateString()}
                  </div>
                )}
              </div>

              <div className="bg-green-100 p-3 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-700">100%</div>
                  <div className="text-sm text-green-600">Progress Complete</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
