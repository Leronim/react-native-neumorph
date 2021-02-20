package com.neomorphapp;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

import soup.neumorphism.NeumorphCardView;
import soup.neumorphism.ShapeType;

public class NeumorphViewManager extends ViewGroupManager<NeumorphCardView> {

    public static final String REACT_CLASS = "Neumorph";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected NeumorphCardView createViewInstance(ThemedReactContext reactContext) {
        NeumorphCardView neumorphCardView = new NeumorphCardView(reactContext);
        neumorphCardView.setShadowElevation(12);
        neumorphCardView.setShadowColorLight(0x60FFFFFF);
        neumorphCardView.setShadowColorDark(0x60000000);
//        neumorphCardView.setBackgroundColor(0x212121);
        neumorphCardView.setShapeType(ShapeType.FLAT);
        neumorphCardView.setInset(20, 20, 20, 20);
        neumorphCardView.setStrokeWidth(3);
        neumorphCardView.invalidate();
        return  neumorphCardView;
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(NeumorphCardView neumorphCardView, @Nullable String backgroundColor) {
        Log.d("NEUMORPH", "Value: " + Integer.parseInt(backgroundColor, 16));

        neumorphCardView.setBackgroundColor(Integer.parseInt(backgroundColor, 16));
    }

    @ReactProp(name = "shadowDark")
    public void setShadowDark(NeumorphCardView neumorphCardView, @Nullable String shadowDark) {
        int formatShadowDark = Integer.parseInt(shadowDark, 16);
        Log.d("Neumorph", "value: " + formatShadowDark);
        neumorphCardView.setShadowColorDark(formatShadowDark);
    }

    @ReactProp(name = "inner")
    public void setTypeShadow(NeumorphCardView neumorphCardView, @Nullable Boolean inner) {
        int type = 0;
        if(inner) {
            type = ShapeType.PRESSED;
        }
        neumorphCardView.setShapeType(type);
    }

}
