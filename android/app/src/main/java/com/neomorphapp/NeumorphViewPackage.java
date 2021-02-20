package com.neomorphapp;

import androidx.annotation.NonNull;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import org.jetbrains.annotations.NotNull;

import java.util.Collections;
import java.util.List;

import soup.neumorphism.NeumorphCardView;

public class NeumorphViewPackage implements ReactPackage {

    @NonNull
    @NotNull
    @Override
    public List<NativeModule> createNativeModules(@NonNull @NotNull ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @NonNull
    @NotNull
    @Override
    public List<ViewManager> createViewManagers(@NonNull @NotNull ReactApplicationContext reactContext) {
        return Collections.<ViewManager>singletonList(
                new NeumorphViewManager()
        );
    }
}
