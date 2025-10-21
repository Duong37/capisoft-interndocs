package com.duong.todoapp;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.interndocs.deviceshake.DeviceShakePlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(DeviceShakePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
