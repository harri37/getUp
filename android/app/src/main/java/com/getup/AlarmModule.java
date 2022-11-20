package com.getup;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.res.Resources;
import android.os.Build;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationManagerCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;

import java.util.Arrays;
import java.util.Calendar;


public class AlarmModule extends ReactContextBaseJavaModule {
    private NotificationManagerCompat notificationManagerCompat;
    private ReactApplicationContext context;
    private Resources resources;
    public static final String CHANNEL_ID = "Get Up Alarm";

    AlarmModule(ReactApplicationContext context) {
        super(context);
        this.context = context;
        this.resources = context.getResources();
        notificationManagerCompat = NotificationManagerCompat.from(context);
        createNotificationChannel();
        checkPermissions();
    }

    @NonNull
    @Override
    public String getName() {
        return getClass().getSimpleName(); // "AlarmModule"
    }

    private void createNotificationChannel() {
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

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void createEvent(int hours, int mins, String name) {
        Intent intent = new Intent(context, NotificationObserver.class);
        intent.putExtra("alarm_name", name);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, 0, intent, PendingIntent.FLAG_IMMUTABLE);

        Calendar c = Calendar.getInstance();
        c.set(Calendar.HOUR_OF_DAY, hours);
        c.set(Calendar.MINUTE, mins);
        c.set(Calendar.SECOND, 0);
        c.set(Calendar.MILLISECOND, 0);
        Log.d(getName(), String.format("createEvent(): for %dth day of the week at %02d:%02d",
                c.get(Calendar.DAY_OF_WEEK), c.get(Calendar.HOUR_OF_DAY), c.get(Calendar.MINUTE)));

        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, c.getTimeInMillis(), pendingIntent);
    }

    @ReactMethod
    public void createAlarm(String name, Double h, Double m, ReadableArray days) {
        int hours = h.intValue();
        int mins = m.intValue();
        Log.d(getName(), String.format("createAlarm(): Time:%02d:%02d, Days:%s", hours, mins,
                Arrays.toString(days.toArrayList().toArray())));

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            createEvent(hours, mins, name);
        }
    }



}