package com.neomorphapp

import android.graphics.Color
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.ViewGroupManager
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.views.view.ReactViewGroup
import soup.neumorphism.CornerFamily
import soup.neumorphism.NeumorphCardView
import soup.neumorphism.NeumorphShapeAppearanceModel
import soup.neumorphism.ShapeType

class NeumorphViewManager : ViewGroupManager<ReactViewGroup>() {
    companion object {
        const val REACT_CLASS = "RNCNeumorph"
    }

    override fun getName(): String {
        return REACT_CLASS
    }

    override fun createViewInstance(reactContext: ThemedReactContext): ReactViewGroup {
        val neumorphCardView = NeumorphCardView(reactContext)
        return neumorphCardView
    }

    @ReactProp(name = "backgroundColor")
    fun setBackgroundColor(neumorphCardView: NeumorphCardView, backgroundColor: String) {
        if (backgroundColor !== "transparent") {
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

    @ReactProp(name = "borderRadius")
    fun setBorderRadiusTwo(neumorphCardView: NeumorphCardView, borderRadius: ReadableMap) {
        val type = borderRadius.getBoolean("type");
        val radius = borderRadius.getInt("radius");
        val newBorderRadius: NeumorphShapeAppearanceModel;
        if(type) {
            neumorphCardView.setShapeAppearanceModel(
                    NeumorphShapeAppearanceModel.builder().setAllCorners(CornerFamily.OVAL).build()
            )
        } else {
            neumorphCardView.setShapeAppearanceModel(
                    NeumorphShapeAppearanceModel.builder().setAllCorners(
                            CornerFamily.ROUNDED, radius.toFloat()
                    ).build()
            )
        }
    }

    @ReactProp(name = "swapShadow", defaultBoolean = false)
    fun setSwapShadow(neumorphCardView: NeumorphCardView, swapShadow: Boolean) {
        neumorphCardView.setSwapShadow(swapShadow)
    }

    @ReactProp(name = "shadowRadius", defaultFloat = 12f)
    fun setShadowRadius(neumorphCardView: NeumorphCardView, shadowRadius: Float) {
        neumorphCardView.setShadowElevation(shadowRadius * 2)
    }
}
