package com.getup;

import android.app.Notification;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

import java.util.Locale;

public class NotificationObserver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(AlarmModule.class.getSimpleName(), "onReceive()");
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            sendNotification(context, intent);
        }
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    private void sendNotification(Context context, Intent intent) {
        // TODO - Destination Activity (e.g. what happens when you press on the notification
//        Intent i = new Intent(context, DestinationActivity.class);
//        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, i, PendingIntent.FLAG_IMMUTABLE);
        Alarm alarm = (Alarm) intent.getParcelableExtra("alarm");
        Log.d(AlarmModule.class.getSimpleName(), String.format("sendNotification(): %s",
                alarm.toString()));

        NotificationCompat.Builder notification = new NotificationCompat.Builder(context, AlarmModule.CHANNEL_ID)
                .setSmallIcon(R.drawable.redbox_top_border_background)
                .setContentTitle(alarm.getName())
                .setContentText(String.format(Locale.ENGLISH, "%s", alarm.toString()))
                .setDefaults(Notification.DEFAULT_SOUND)
                .setPriority(NotificationCompat.PRIORITY_HIGH);
//                .setContentIntent(pendingIntent);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify(alarm.hashCode(), notification.build());
    }
}
