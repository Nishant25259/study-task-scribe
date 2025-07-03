
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export function AppSettings() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    theme: "light",
    language: "en",
    autoSave: true,
    soundEffects: true,
    studyReminders: true,
    sessionDuration: [25], // Pomodoro timer in minutes
    dailyGoal: [3], // Study sessions per day
    weeklyGoal: [15], // Study sessions per week
  });

  // Apply theme on component mount and when theme changes
  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('dark', 'neon');
    
    // Add the appropriate theme class
    if (settings.theme === 'dark') {
      root.classList.add('dark');
    } else if (settings.theme === 'neon') {
      root.classList.add('neon');
    }
  }, [settings.theme]);

  const handleThemeChange = (value: string) => {
    setSettings({ ...settings, theme: value });
    console.log("Theme changed to:", value);
  };

  const handleSave = () => {
    // TODO: Implement actual save logic
    console.log("Saving settings:", settings);
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="theme">Theme</Label>
            <Select 
              value={settings.theme} 
              onValueChange={handleThemeChange}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <Select 
              value={settings.language} 
              onValueChange={(value) => setSettings({ ...settings, language: value })}
            >
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Study Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="autoSave">Auto-save progress</Label>
            <Switch
              id="autoSave"
              checked={settings.autoSave}
              onCheckedChange={(checked) => setSettings({ ...settings, autoSave: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="soundEffects">Sound effects</Label>
            <Switch
              id="soundEffects"
              checked={settings.soundEffects}
              onCheckedChange={(checked) => setSettings({ ...settings, soundEffects: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="studyReminders">Study reminders</Label>
            <Switch
              id="studyReminders"
              checked={settings.studyReminders}
              onCheckedChange={(checked) => setSettings({ ...settings, studyReminders: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label>Default session duration: {settings.sessionDuration[0]} minutes</Label>
            <Slider
              value={settings.sessionDuration}
              onValueChange={(value) => setSettings({ ...settings, sessionDuration: value })}
              max={120}
              min={5}
              step={5}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Daily goal: {settings.dailyGoal[0]} sessions</Label>
            <Slider
              value={settings.dailyGoal}
              onValueChange={(value) => setSettings({ ...settings, dailyGoal: value })}
              max={10}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Weekly goal: {settings.weeklyGoal[0]} sessions</Label>
            <Slider
              value={settings.weeklyGoal}
              onValueChange={(value) => setSettings({ ...settings, weeklyGoal: value })}
              max={50}
              min={5}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full">
        Save Settings
      </Button>
    </div>
  );
}
