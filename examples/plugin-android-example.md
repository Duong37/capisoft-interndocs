Implementing for Android
Development for the plugin is nearly complete. All that’s left is the Android implementation!

Register the plugin with Capacitor
Prerequisite: Familiarize yourself with the Capacitor Custom Native Android Code documentation before continuing.

Open up the Capacitor application’s Android project in Android Studio by running npx cap open android. Expand the app module and the java folder and right-click on your app’s Java package (the io.ionic.cap.plugin package). Select New -> Package from the context menu and create a subpackage named plugins. Right-click the plugins package and repeat the preceding process to create a subpackage named ScreenOrientation.

Next, right-click the ScreenOrientation package and add a new Java file by selecting New -> Java File from the context menu. Name this file ScreenOrientationPlugin.java. Repeat the process to create a new file named ScreenOrientation.java.

Copy the following code into ScreenOrientationPlugin.java:

package io.ionic.cap.plugin.plugins.ScreenOrientation;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   @PluginMethod()
   public void orientation(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void lock(PluginCall call) {
       call.resolve();
   }

   @PluginMethod()
   public void unlock(PluginCall call) {
       call.resolve();
   }
}

Register the plugin class within the project’s MainActivity to bridge between Java and JavaScript. Open MainActivity.java and add an onCreate() method where we can register the plugin:

package io.ionic.cap.plugin;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import io.ionic.cap.plugin.plugins.ScreenOrientation.ScreenOrientationPlugin;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ScreenOrientationPlugin.class);
        super.onCreate(savedInstanceState);
    }
}

Getting the current screen orientation
Like iOS, we will tackle getting the current screen orientation first. Open ScreenOrientation.java to set up the class and write a method to get the current orientation:

package io.ionic.cap.plugin.plugins.ScreenOrientation;

import android.view.Surface;
import androidx.appcompat.app.AppCompatActivity;

public class ScreenOrientation {
   private AppCompatActivity activity;

   public ScreenOrientation(AppCompatActivity activity) {
       this.activity = activity;
   }

   public String getCurrentOrientationType() {
       int rotation = activity.getWindowManager().getDefaultDisplay().getRotation();
       return fromRotationToOrientationType(rotation);
   }

   private String fromRotationToOrientationType(int rotation) {
       switch (rotation) {
           case Surface.ROTATION_90:
               return "landscape-primary";
           case Surface.ROTATION_180:
               return "portrait-secondary";
           case Surface.ROTATION_270:
               return "landscape-secondary";
           default:
               return "portrait-primary";
       }
   }
}

Next, wire up the orientation method in ScreenOrientationPlugin.java to call the implementation class’s method:

package io.ionic.cap.plugins.ScreenOrientation;

import com.getcapacitor.JSObject;
/* Remaining imports omitted for brevity */

@CapacitorPlugin(name = "ScreenOrientation")
public class ScreenOrientationPlugin extends Plugin {

   private ScreenOrientation implementation;

   @Override
   public void load() {
       implementation = new ScreenOrientation(getActivity());
   }

   @PluginMethod()
   public void orientation(PluginCall call) {
       JSObject ret = new JSObject();
       String type = implementation.getCurrentOrientationType();
       ret.put("type", type);
       call.resolve(ret);
   }

   /* Remaining code omitted for brevity */
}

The load() method is the proper place to initialize the ScreenOrientation class instance with the Capacitor bridge object.

Run the app from within Android Studio, either on an actual device or an Android emulator. Open Logcat and you should see the call logged:

V/Capacitor/Plugin: To native (Capacitor plugin): callbackId: 89582874, pluginId: ScreenOrientation, methodName: orientation


Note: The exact value of the logs will be different for you. In this example, 89582874 is an arbitrary ID assigned to the method call made from the plugin.

Listening for screen orientation changes
Android considers the rotation of a device a runtime configuration change, so we need a way for our plugin to handle configuration changes.

Capacitor provides an overridable method, handleOnConfigurationChanged(), that can be used to respond to runtime configuration changes.

First add the following import to the ScreenOrientationPlugin class:

import android.content.res.Configuration;

Then add the following methods to the ScreenOrientationPlugin class:

@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   this.onOrientationChanged();
}

private void onOrientationChanged() {
   JSObject ret = new JSObject();
   String type = implementation.getCurrentOrientationType();
   ret.put("type", type);
   notifyListeners("screenOrientationChange", ret);
}

When Android notifies an application of a configuration change, it returns the entire new configuration object, presenting two challenges:

How do we make sure we only notify listeners when the orientation changes?
How do we know that the configuration change was due to an orientation change?
We will need the plugin to keep track of the previous newConfig.orientation value to compare against additional configuration changes to address those challenges.

Make the following additions to the ScreenOrientation class:

@Nullable private int configOrientation;

public boolean hasOrientationChanged(int orientation) {
    if (orientation == configOrientation) {
        return false;
    } else {
        this.configOrientation = orientation;
        return true;
    }
}

Don't forget to import androidx.annotation.Nullable to ScreenOrientation.java.

Then update the handleOnConfigurationChanged() method in ScreenOrientationPlugin.java:

@Override
public void handleOnConfigurationChanged(Configuration newConfig) {
   super.handleOnConfigurationChanged(newConfig);
   if(implementation.hasOrientationChanged(newConfig.orientation)) {
       this.onOrientationChanged();
   }
}

Now, the plugin will only notify listeners if-and-only-if runtime configuration changes pertain to the orientation changing.

Locking and unlocking the screen orientation
As we saw with the iOS implementation, we’ll need a helper method to map the JavaScript OrientationType into a corresponding native enumeration value. For Android, we’ll map an OrientationType to an ActivityInfo enumeration value. Add the following method to the ScreenOrientation class:

private int fromOrientationTypeToEnum(String orientationType) {
   switch (orientationType) {
       case "landscape-primary":
           return ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE;
       case "landscape-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_LANDSCAPE;
       case "portrait-secondary":
           return ActivityInfo.SCREEN_ORIENTATION_REVERSE_PORTRAIT;
       default:
           // Case: portrait-primary
           return ActivityInfo.SCREEN_ORIENTATION_PORTRAIT;
   }
}

Make sure to import android.content.pm.ActivityInfo to ScreenOrientation.java.

Next, add a lock() method to the ScreenOrientation class:

public void lock(String orientationType) {
   int orientationEnum = fromOrientationTypeToEnum(orientationType);
   activity.setRequestedOrientation(orientationEnum);
}

This method needs to get called from the ScreenOrientationPlugin class:

@PluginMethod()
public void lock(PluginCall call) {
   String orientationType = call.getString("orientation");
   if(orientationType == null) {
       call.reject("Input option 'orientation' must be provided.");
       return;
   }
   implementation.lock(orientationType);
   call.resolve();
}

Note, we guard against calls to the lock() method that do not supply the orientation input parameter.

To unlock the screen orientation, we set the activity’s orientation type to the unspecified enumeration value. Add the following method to the ScreenOrientation class:

public void unlock() {
   activity.setRequestedOrientation(ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED);
}

Then call the implementation method from the ScreenOrientationPlugin class:

@PluginMethod()
public void unlock(PluginCall call) {
   implementation.unlock();
   call.resolve();
}