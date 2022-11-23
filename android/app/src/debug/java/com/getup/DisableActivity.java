package com.getup;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

public class DisableActivity extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.d(AlarmModule.class.getSimpleName(), "Stop Service");
        Intent intentService = new Intent(context, AlarmService.class);
        context.stopService(intentService);
    }
}
