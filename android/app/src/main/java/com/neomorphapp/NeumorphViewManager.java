package com.neomorphapp;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;

import javax.annotation.Nullable;

import soup.neumorphism.CornerFamily;
import soup.neumorphism.NeumorphCardView;
import soup.neumorphism.NeumorphShapeAppearanceModel;
import soup.neumorphism.NeumorphShapeAppearanceModel.Builder;
import soup.neumorphism.ShapeType;

public class NeumorphViewManager extends ViewGroupManager<NeumorphCardView> {

    public static final String REACT_CLASS = "RNCNeumorph";
    public int shapeType = ShapeType.DEFAULT;
    public NeumorphShapeAppearanceModel borderRadius = new Builder()
		.setAllCorners(CornerFamily.OVAL)
		.setAllCornerSizes(20f)
		.build();

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected NeumorphCardView createViewInstance(ThemedReactContext reactContext) {
        NeumorphCardView neumorphCardView = new NeumorphCardView(reactContext);
//        neumorphCardView.setShadowElevation(12);
//        neumorphCardView.setShadowColorLight(0x60FFFFFF);
//        neumorphCardView.setShadowColorDark(0x60000000);
//        neumorphCardView.setBackgroundColor(0x212121);
        neumorphCardView.setStrokeWidth(10);
        neumorphCardView.setShapeAppearanceModel(borderRadius);
        neumorphCardView.invalidate();
        return  neumorphCardView;
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(NeumorphCardView neumorphCardView, String backgroundColor) {
    	if(backgroundColor.equals("transparent")) {
    		neumorphCardView.setBackgroundColor(0x60FFFFFF);
		} else {
			neumorphCardView.setBackgroundColor(Color.parseColor(backgroundColor));
		}
    }

    @ReactProp(name = "inner")
    public void setTypeShadow(NeumorphCardView neumorphCardView, Boolean inner) {
        if(inner) {
            neumorphCardView.setShapeType(ShapeType.PRESSED);
        } else {
        	neumorphCardView.setShapeType(ShapeType.FLAT);
		}
    }

    @ReactProp(name = "basin")
	public void setShapeType(NeumorphCardView neumorphCardView, Boolean type) {
    	if(type) {
			neumorphCardView.setShapeType(ShapeType.BASIN);
		} else {
    		neumorphCardView.setShapeType(ShapeType.DEFAULT);
		}
	}

	@ReactProp(name = "darkShadowColor")
	public void setShadowDark(NeumorphCardView neumorphCardView, String darkShadowColor) {
		neumorphCardView.setShadowColorDark(Color.parseColor(darkShadowColor));
	}

	@ReactProp(name = "lightShadowColor")
	public void setShadowLight(NeumorphCardView neumorphCardView, String lightShadowColor) {
		neumorphCardView.setShadowColorLight(Color.parseColor(lightShadowColor));
	}

	@ReactProp(name = "shadowOffset")
	public void setShadowOffset(NeumorphCardView neumorphCardView, ReadableMap shadowOffset) {
    	neumorphCardView.setInset(
    		shadowOffset.getInt("width"),
			shadowOffset.getInt("height"),
			shadowOffset.getInt("width"),
			shadowOffset.getInt("height")
		);
	}

	@ReactProp(name = "borderRadius", defaultInt = 0)
	public void setBorderRadius(NeumorphCardView neumorphCardView, Integer borderRadius) {
		NeumorphShapeAppearanceModel newBorderRadius = new Builder()
			.setAllCornerSizes(borderRadius)
			.build();
		neumorphCardView.setShapeAppearanceModel(newBorderRadius);
	}

	@ReactProp(name = "shadowRadius", defaultInt = 0)
	public void setShadowRadius(NeumorphCardView neumorphCardView, Integer shadowRadius) {
    	neumorphCardView.setShadowElevation(shadowRadius);
	}

}
