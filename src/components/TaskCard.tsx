
import { useState } from "react";
import { Task } from "@/pages/Index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { BookCheck, Calendar, Check, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onUpdate: (taskId: string, updates: Partial<Task>) => void;
  onDelete: (taskId: string) => void;
}

export function TaskCard({ task, onUpdate, onDelete }: TaskCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const { toast } = useToast();

  const handleAddSession = () => {
    if (task.completedSessions < task.totalSessions) {
      setIsUpdating(true);
      const nextIncompleteIndex = task.sessions.findIndex(session => !session);
      if (nextIncompleteIndex !== -1) {
        const newSessions = [...task.sessions];
        newSessions[nextIncompleteIndex] = true;
        const newCompletedSessions = newSessions.filter(Boolean).length;
        const newProgress = Math.round((newCompletedSessions / task.totalSessions) * 100);
        const isCompleted = newCompletedSessions === task.totalSessions;

        onUpdate(task.id, {
          sessions: newSessions,
          completedSessions: newCompletedSessions,
          progress: newProgress,
          isCompleted,
        });

        toast({
          title: "Session completed! 🎉",
          description: `Progress: ${newProgress}%`,
        });
      }

      setTimeout(() => setIsUpdating(false), 500);
    }
  };

  const handleSessionToggle = (sessionIndex: number) => {
    const newSessions = [...task.sessions];
    newSessions[sessionIndex] = !newSessions[sessionIndex];
    const newCompletedSessions = newSessions.filter(Boolean).length;
    const newProgress = Math.round((newCompletedSessions / task.totalSessions) * 100);
    const isCompleted = newCompletedSessions === task.totalSessions;

    onUpdate(task.id, {
      sessions: newSessions,
      completedSessions: newCompletedSessions,
      progress: newProgress,
      isCompleted,
    });

    toast({
      title: newSessions[sessionIndex] ? "Session completed! ✅" : "Session unmarked",
      description: `Progress: ${newProgress}%`,
    });
  };

  const handleMarkComplete = () => {
    const allCompleteSessions = Array(task.totalSessions).fill(true);
    onUpdate(task.id, {
      isCompleted: true,
      progress: 100,
      completedSessions: task.totalSessions,
      sessions: allCompleteSessions,
    });

    toast({
      title: "Task completed! 🎊",
      description: "Great job on finishing your study task!",
    });
  };

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
    <Card className={`transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
      task.isCompleted ? "bg-green-50 border-green-200" : "bg-white"
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className={`font-semibold text-lg mb-2 ${
              task.isCompleted ? "text-green-800 line-through" : "text-gray-900"
            }`}>
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">
              {task.description}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-500 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={getCategoryColor(task.category)}>
            {task.category}
          </Badge>
          {task.isCompleted && (
            <Badge className="bg-green-100 text-green-800">
              <Check className="w-3 h-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Progress</span>
            <span className="font-medium">{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-2" />
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <BookCheck className="w-4 h-4" />
            <span>{task.completedSessions}/{task.totalSessions} sessions</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{task.createdAt.toLocaleDateString()}</span>
          </div>
        </div>

        <Collapsible open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-2 h-8 text-sm">
              <span>Session Details</span>
              {isDetailsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-2">
            <div className="grid grid-cols-5 gap-2 p-2">
              {task.sessions.map((completed, index) => (
                <Button
                  key={index}
                  variant={completed ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "h-8 text-xs",
                    completed 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "hover:bg-gray-50"
                  )}
                  onClick={() => handleSessionToggle(index)}
                  disabled={task.isCompleted}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>

        <div className="flex gap-2 pt-2">
          {!task.isCompleted && (
            <>
              <Button
                onClick={handleAddSession}
                disabled={isUpdating || task.completedSessions >= task.totalSessions}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Session
              </Button>
              
              <Button
                onClick={handleMarkComplete}
                variant="outline"
                size="sm"
                className="border-green-300 text-green-700 hover:bg-green-50"
              >
                <Check className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
