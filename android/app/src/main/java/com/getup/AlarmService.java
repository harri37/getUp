package com.getup;

import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.os.IBinder;
import android.os.Vibrator;
import android.util.Log;

import androidx.annotation.Nullable;
import androidx.annotation.RequiresApi;
import androidx.core.app.NotificationCompat;

public class AlarmService extends Service {
    private MediaPlayer mediaPlayer;
    private Vibrator vibrator;

    @Override
    public void onCreate() {
        mediaPlayer = null;
        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
    }

    @RequiresApi(api = Build.VERSION_CODES.M)
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.d(AlarmModule.class.getSimpleName(), "Start Media");

        Uri sound = intent.getParcelableExtra("sound");
        mediaPlayer = MediaPlayer.create(this, sound);
        mediaPlayer.setLooping(true);
        mediaPlayer.setVolume(1f, 1f);

        Intent i = new Intent(this, DisableActivity.class);
        i.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, this.hashCode(), i,
                PendingIntent.FLAG_IMMUTABLE);

        NotificationCompat.Builder notification = new NotificationCompat.Builder(this, AlarmModule.CHANNEL_ID)
                .setSmallIcon(R.drawable.redbox_top_border_background)
                .setContentTitle(intent.getStringExtra("title"))
                .setContentText(intent.getStringExtra("text"))
                .setForegroundServiceBehavior(NotificationCompat.FOREGROUND_SERVICE_IMMEDIATE)
                .setContentIntent(pendingIntent)
                .setPriority(NotificationCompat.PRIORITY_HIGH);

        long[] pattern = {0, 100, 1000};

        vibrator.vibrate(pattern, 0);
        mediaPlayer.start();
        startForeground(101, notification.build());

        return START_STICKY;
    }

    @Override
    public void onDestroy() {
        Log.d(AlarmModule.class.getSimpleName(), "onDestroy()");

        mediaPlayer.stop();
        vibrator.cancel();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
