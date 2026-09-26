import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'reminder' | 'achievement' | 'system';
  read: boolean;
  createdAt: string;
}

export interface Reminder {
  id: string;
  time: string; // HH:mm
  days: number[]; // 0=Sun, 1=Mon, ..., 6=Sat
  message: string;
  enabled: boolean;
  emailNotify: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  reminders: Reminder[];
  unreadCount: number;
  addNotification: (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => void;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
  addReminder: (r: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, r: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  reminders: [],
  unreadCount: 0,
  addNotification: () => {},
  markAsRead: () => {},
  markAllRead: () => {},
  deleteNotification: () => {},
  clearAll: () => {},
  addReminder: () => {},
  updateReminder: () => {},
  deleteReminder: () => {},
});

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    const saved = localStorage.getItem('vstep_notifications');
    if (saved) return JSON.parse(saved);
    // Default welcome notifications
    return [
      {
        id: 'welcome-1',
        title: 'Chào mừng đến VSTEP Master! 🎉',
        message: 'Bắt đầu luyện thi VSTEP ngay hôm nay. Hãy đặt mục tiêu và luyện tập đều đặn mỗi ngày.',
        type: 'system',
        read: false,
        createdAt: new Date().toISOString(),
      },
      {
        id: 'welcome-2',
        title: 'Mẹo: Học từ vựng mỗi ngày 📖',
        message: 'Học 10 từ mới mỗi ngày sẽ giúp bạn mở rộng vốn từ nhanh chóng. Vào mục Từ vựng để bắt đầu!',
        type: 'reminder',
        read: false,
        createdAt: new Date(Date.now() - 60000).toISOString(),
      },
      {
        id: 'welcome-3',
        title: 'Đặt lịch nhắc nhở ⏰',
        message: 'Vào Thông báo > Nhắc nhở để đặt lịch học cố định. App sẽ nhắc bạn đúng giờ!',
        type: 'info',
        read: false,
        createdAt: new Date(Date.now() - 120000).toISOString(),
      },
    ];
  });

  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('vstep_reminders');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'default-1',
        time: '08:00',
        days: [1, 2, 3, 4, 5], // Mon-Fri
        message: 'Đến giờ học từ vựng rồi! 📖 Hãy học 10 từ mới hôm nay.',
        enabled: true,
        emailNotify: false,
      },
      {
        id: 'default-2',
        time: '20:00',
        days: [1, 3, 5], // Mon, Wed, Fri
        message: 'Đến giờ luyện nghe/đọc! 🎧 Hoàn thành 1 bài practice tối nay.',
        enabled: true,
        emailNotify: false,
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem('vstep_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('vstep_reminders', JSON.stringify(reminders));
  }, [reminders]);

  // Check reminders every minute
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const currentDay = now.getDay();

      reminders.forEach((r) => {
        if (!r.enabled) return;
        if (r.time !== currentTime) return;
        if (!r.days.includes(currentDay)) return;

        // Check if we already sent this reminder today
        const todayKey = `reminder_${r.id}_${now.toDateString()}`;
        if (localStorage.getItem(todayKey)) return;

        localStorage.setItem(todayKey, '1');
        addNotification({
          title: '⏰ Nhắc nhở học tập',
          message: r.message,
          type: 'reminder',
        });

        // Browser notification if permitted
        if (Notification.permission === 'granted') {
          new Notification('VSTEP Master - Nhắc nhở', { body: r.message });
        }
      });
    };

    const interval = setInterval(checkReminders, 60000);
    return () => clearInterval(interval);
  }, [reminders]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const addNotification = (n: Omit<Notification, 'id' | 'read' | 'createdAt'>) => {
    const newNotif: Notification = {
      ...n,
      id: `notif_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  const addReminder = (r: Omit<Reminder, 'id'>) => {
    setReminders((prev) => [...prev, { ...r, id: `rem_${Date.now()}` }]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders((prev) => prev.map((r) => r.id === id ? { ...r, ...updates } : r));
  };

  const deleteReminder = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications, reminders, unreadCount,
      addNotification, markAsRead, markAllRead, deleteNotification, clearAll,
      addReminder, updateReminder, deleteReminder,
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
