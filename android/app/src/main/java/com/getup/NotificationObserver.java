package com.getup;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;
import androidx.core.app.NotificationManagerCompat;

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
        Log.d(AlarmModule.class.getSimpleName(), String.format("sendNotification(): alarm_name: %s",
                intent.getStringExtra("alarm_name")));

        // TODO - Destination Activity (e.g. what happens when you press on the notification
//        Intent i = new Intent(context, DestinationActivity.class);
//        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
//        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, i, PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder notification = new NotificationCompat.Builder(context, AlarmModule.CHANNEL_ID)
                .setSmallIcon(R.drawable.redbox_top_border_background)
                .setContentTitle("Alarm notification")
                .setContentText(intent.getStringExtra("alarm_name"))
                .setDefaults(NotificationCompat.DEFAULT_ALL)
                .setPriority(NotificationCompat.PRIORITY_HIGH);
//                .setContentIntent(pendingIntent);

        NotificationManagerCompat notificationManager = NotificationManagerCompat.from(context);
        notificationManager.notify(123, notification.build());
    }
}
