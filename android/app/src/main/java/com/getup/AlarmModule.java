package com.getup;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.res.Resources;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableType;

import java.util.ArrayList;
import java.util.List;


public class AlarmModule extends ReactContextBaseJavaModule {

    private NotificationManagerCompat notificationManagerCompat;
    private ReactApplicationContext context;
    private Resources resources;
    private List<Alarm> alarmList;

    public static final String CHANNEL_ID = "Get Up Alarm";

    AlarmModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        this.resources = context.getResources();

        this.notificationManagerCompat = NotificationManagerCompat.from(context);
        this.alarmList = new ArrayList<>();
        createNotificationChannel();
        checkPermissions();
    }

    @NonNull
    @Override
    public String getName() {
        return getClass().getSimpleName(); // "AlarmModule"
    }

    private void createNotificationChannel() {
        if (notificationManagerCompat.getNotificationChannel(CHANNEL_ID) != null) {
            Log.d(getName(), "Notification Channel already exists");
            return;
        }
        // Create the NotificationChannel, but only on API 26+ because
        // the NotificationChannel class is new and not in the support library
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d(getName(), "createNotificationChannel()");
            CharSequence name = resources.getString(R.string.channel_name);
            int importance = NotificationManager.IMPORTANCE_HIGH;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, name, importance);
            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            notificationManagerCompat.createNotificationChannel(channel);
        }
    }

    private void checkPermissions() {
        if (!notificationManagerCompat.areNotificationsEnabled()) {
            Log.d(getName(), "Notifications are not enabled:" +
                    notificationManagerCompat.areNotificationsEnabled());
        }
    }

    @ReactMethod
    public void createAlarm(int id, Double h, Double m, ReadableArray d) {
        int hours = h.intValue();
        int mins = m.intValue();
        boolean[] days = toBoolArray(d);
        Alarm alarm = new Alarm(id, days, hours, mins);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            alarm.registerAlarms(context);
        }
        alarmList.add(alarm);
    }

    public Alarm getAlarm(int id) {
        for (Alarm alarm : alarmList) {
            if (alarm.getId() == id) {
                return alarm;
            }
        }
        return null;
    }

    @ReactMethod
    public boolean cancelAlarm(int id) {
        Alarm alarm = getAlarm(id);
        if (alarm == null) return false;
        alarm.cancelAlarms(context);
        return true;
    }

    private boolean[] toBoolArray(ReadableArray readableArray) {
        boolean[] array = new boolean[readableArray.size()];
        int j = 0;
        for (int i = 0; i < readableArray.size(); i++) {
            ReadableType readableType = readableArray.getType(i);
            if (readableType == ReadableType.Boolean) {
                array[j++] = readableArray.getBoolean(i);
            }
        }
        return array;
    }

}