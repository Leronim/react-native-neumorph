package com.neomorphapp

import android.content.res.ColorStateList
import android.graphics.Color
import android.util.Log
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import soup.neumorphism.CornerFamily
import soup.neumorphism.NeumorphCardView
import soup.neumorphism.NeumorphShapeAppearanceModel
import soup.neumorphism.ShapeType

class NeumorphViewManager : ViewGroupManager<NeumorphCardView>() {
    companion object {
        const val REACT_CLASS = "RNCNeumorph"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): NeumorphCardView {
        val neumorphCardView = NeumorphCardView(reactContext)
        return neumorphCardView
    }

    @ReactProp(name = "backgroundColor")
    fun setBackgroundColor(neumorphCardView: NeumorphCardView, backgroundColor: String) {
        if (backgroundColor == "transparent") {
            neumorphCardView.setBackgroundColor(0x60FFFFFF)
        } else {
            neumorphCardView.setBackgroundColor(Color.parseColor(backgroundColor))
        }
    }

    @ReactProp(name = "inner")
    fun setTypeShadow(neumorphCardView: NeumorphCardView, inner: Boolean) {
        if(inner) {
            neumorphCardView.setShapeType(ShapeType.PRESSED);
        } else {
        	neumorphCardView.setShapeType(ShapeType.FLAT);
		}
    }

    @ReactProp(name = "basin")
    fun setShapeType(neumorphCardView: NeumorphCardView, type: Boolean) {
    	if(type) {
			neumorphCardView.setShapeType(ShapeType.BASIN);
		} else {
    		neumorphCardView.setShapeType(ShapeType.DEFAULT);
		}
    }

    @ReactProp(name = "darkShadowColor")
    fun setShadowDark(neumorphCardView: NeumorphCardView, darkShadowColor: ReadableMap) {
    	val alpha = darkShadowColor.getInt("alpha")
    	val r = darkShadowColor.getInt("r")
    	val g = darkShadowColor.getInt("g")
    	val b = darkShadowColor.getInt("b")
		neumorphCardView.setShadowColorDark(Color.argb(alpha, r, g, b));
    }

    @ReactProp(name = "lightShadowColor")
    fun setShadowLight(neumorphCardView: NeumorphCardView, lightShadowColor: ReadableMap) {
		val alpha = lightShadowColor.getInt("alpha")
		val r = lightShadowColor.getInt("r")
		val g = lightShadowColor.getInt("g")
		val b = lightShadowColor.getInt("b")
		neumorphCardView.setShadowColorLight(Color.argb(alpha, r, g, b));
    }

    @ReactProp(name = "shadowOffset")
    fun setShadowOffset(neumorphCardView: NeumorphCardView, shadowOffset: ReadableMap) {
    	neumorphCardView.setInset(
    		shadowOffset.getInt("width"),
			shadowOffset.getInt("height"),
			shadowOffset.getInt("width"),
			shadowOffset.getInt("height")
		);
    }

    @ReactProp(name = "borderRadius", defaultInt = 0)
    fun setBorderRadiusTwo(neumorphCardView: NeumorphCardView, borderRadius: Float) {
        val newBorderRadius: NeumorphShapeAppearanceModel = NeumorphShapeAppearanceModel.builder()
                .setAllCorners(CornerFamily.ROUNDED, borderRadius)
//                .setAllCornerSizes(borderRadius)
                .build();
        neumorphCardView.setShapeAppearanceModel(newBorderRadius);
    }

    @ReactProp(name = "shadowRadius", defaultInt = 0)
    fun setShadowRadius(neumorphCardView: NeumorphCardView, shadowRadius: Int) {
        neumorphCardView.setShadowElevation(shadowRadius.toFloat())
    }

    @ReactProp(name = "borderColor")
    fun setBorderColor(neumorphCardView: NeumorphCardView, borderColor: String) {
		neumorphCardView.setStrokeColor(ColorStateList.valueOf(Color.parseColor(borderColor)));
    }

    @ReactProp(name = "borderWidth", defaultInt = 0)
    fun setBorderWidth(neumorphCardView: NeumorphCardView, borderWidth: Float) {
    	neumorphCardView.setStrokeWidth(borderWidth);
    }
}