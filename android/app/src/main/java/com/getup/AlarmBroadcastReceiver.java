package com.getup;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import java.util.Locale;

public class AlarmBroadcastReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(AlarmModule.class.getSimpleName(), "onReceive()");

        Alarm alarm = (Alarm) intent.getParcelableExtra("alarm");
        Intent intentService = new Intent(context, AlarmService.class);
        intentService.putExtra("title", String.format(Locale.ENGLISH,
                "%02d:%02d", alarm.getHours(), alarm.getMins()));
        intentService.putExtra("text", "id=" + alarm.getId());
        intentService.putExtra("sound", alarm.getSound());

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            context.startForegroundService(intentService);
        } else {
            context.startService(intentService);
        }
    }
}
