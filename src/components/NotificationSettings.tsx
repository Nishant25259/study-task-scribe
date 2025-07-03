
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Bell, BellOff, Clock, Trophy, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function NotificationSettings() {
  const { toast } = useToast();
  const [notifications, setNotifications] = useState({
    enabled: true,
    studyReminders: true,
    breakReminders: true,
    goalAchievements: true,
    weeklyProgress: true,
    taskDeadlines: true,
    reminderTime: "09:00",
    frequency: "daily",
    sound: true,
    vibration: true,
  });

  const handleSave = () => {
    // TODO: Implement actual save logic
    console.log("Saving notification settings:", notifications);
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleTestNotification = () => {
    toast({
      title: "Test Notification",
      description: "This is how your notifications will appear!",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {notifications.enabled ? (
              <Bell className="w-5 h-5 text-blue-600" />
            ) : (
              <BellOff className="w-5 h-5 text-gray-400" />
            )}
            Notification Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Enable notifications</Label>
            <Switch
              id="notifications"
              checked={notifications.enabled}
              onCheckedChange={(checked) => 
                setNotifications({ ...notifications, enabled: checked })
              }
            />
          </div>

          {notifications.enabled && (
            <>
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-sm">Notification Types</h4>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <Label htmlFor="studyReminders">Study reminders</Label>
                  </div>
                  <Switch
                    id="studyReminders"
                    checked={notifications.studyReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, studyReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-green-500" />
                    <Label htmlFor="breakReminders">Break reminders</Label>
                  </div>
                  <Switch
                    id="breakReminders"
                    checked={notifications.breakReminders}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, breakReminders: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <Label htmlFor="goalAchievements">Goal achievements</Label>
                  </div>
                  <Switch
                    id="goalAchievements"
                    checked={notifications.goalAchievements}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, goalAchievements: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-purple-500" />
                    <Label htmlFor="weeklyProgress">Weekly progress</Label>
                  </div>
                  <Switch
                    id="weeklyProgress"
                    checked={notifications.weeklyProgress}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, weeklyProgress: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-red-500" />
                    <Label htmlFor="taskDeadlines">Task deadlines</Label>
                  </div>
                  <Switch
                    id="taskDeadlines"
                    checked={notifications.taskDeadlines}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, taskDeadlines: checked })
                    }
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-sm">Timing & Frequency</h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="reminderTime">Daily reminder time</Label>
                  <Select 
                    value={notifications.reminderTime} 
                    onValueChange={(value) => 
                      setNotifications({ ...notifications, reminderTime: value })
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="07:00">7:00 AM</SelectItem>
                      <SelectItem value="08:00">8:00 AM</SelectItem>
                      <SelectItem value="09:00">9:00 AM</SelectItem>
                      <SelectItem value="10:00">10:00 AM</SelectItem>
                      <SelectItem value="18:00">6:00 PM</SelectItem>
                      <SelectItem value="19:00">7:00 PM</SelectItem>
                      <SelectItem value="20:00">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="frequency">Reminder frequency</Label>
                  <Select 
                    value={notifications.frequency} 
                    onValueChange={(value) => 
                      setNotifications({ ...notifications, frequency: value })
                    }
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium text-sm">Notification Style</h4>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="sound">Sound notifications</Label>
                  <Switch
                    id="sound"
                    checked={notifications.sound}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, sound: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="vibration">Vibration (mobile)</Label>
                  <Switch
                    id="vibration"
                    checked={notifications.vibration}
                    onCheckedChange={(checked) => 
                      setNotifications({ ...notifications, vibration: checked })
                    }
                  />
                </div>
              </div>

              <Button 
                onClick={handleTestNotification} 
                variant="outline" 
                className="w-full mt-4"
              >
                Test Notification
              </Button>
            </>
          )}
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Notification Settings
      </Button>
    </div>
  );
}
