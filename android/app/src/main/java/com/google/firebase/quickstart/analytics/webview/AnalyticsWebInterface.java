/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.google.firebase.quickstart.analytics.webview;

import android.content.Context;
import android.os.Bundle;
import android.text.TextUtils;
import android.util.Log;
import android.webkit.JavascriptInterface;

import com.google.firebase.analytics.FirebaseAnalytics;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;
import java.util.ArrayList;

import java.util.Iterator;

// [START analytics_web_interface]
public class AnalyticsWebInterface {

    public static final String TAG = "AnalyticsWebInterface";
    private FirebaseAnalytics mAnalytics;

    public AnalyticsWebInterface(Context context) {
        mAnalytics = FirebaseAnalytics.getInstance(context);
    }

    @JavascriptInterface
    public void logEvent(String name, String jsonParams) {
        LOG("logEvent:" + name);
        mAnalytics.logEvent(name, bundleFromJson(jsonParams));
    }

    @JavascriptInterface
    public void setUserProperty(String name, String value) {
        LOG("setUserProperty:" + name);
        mAnalytics.setUserProperty(name, value);
    }

    private void LOG(String message) {
        // Only log on debug builds, for privacy
        if (BuildConfig.DEBUG) {
            Log.d(TAG, message);
        }
    }

    private Bundle bundleFromJson(String json) {
        // [START_EXCLUDE]
        if (TextUtils.isEmpty(json)) {
            return new Bundle();
        }

        Bundle result = new Bundle();
        try {
            JSONObject jsonObject = new JSONObject(json);
            Iterator<String> keys = jsonObject.keys();

            while (keys.hasNext()) {
                String key = keys.next();
                Object value = jsonObject.get(key);

                if (value instanceof String) {
                    result.putString(key, (String) value);
                } else if (value instanceof Integer) {
                    result.putInt(key, (Integer) value);
                } else if (value instanceof Double) {
                    result.putDouble(key, (Double) value);
                }else if (value instanceof JSONArray) {
                    JSONArray items = (JSONArray) value;
                    ArrayList itemBundleList = new ArrayList();

                    for (int i = 0; i < items.length(); i++) {
                        Bundle itemBundle = new Bundle();
                        JSONObject itemParams = items.getJSONObject(i);
                        Iterator<String> itemKeys = itemParams.keys();

                        while (itemKeys.hasNext()) {
                            String itemKey = itemKeys.next();
                            Object itemValue = itemParams.get(itemKey);
                            if (itemValue instanceof String) {
                                itemBundle.putString(itemKey, (String) itemValue);
                            } else if (itemValue instanceof Integer) {
                                itemBundle.putInt(itemKey, (Integer) itemValue);
                            } else if (itemValue instanceof Double) {
                                itemBundle.putDouble(itemKey, (Double) itemValue);
                            } else if (itemValue instanceof Long) {
                                itemBundle.putLong(itemKey, (Long) itemValue);
                            }
                        }

                        itemBundleList.add(itemBundle);
                    }

                    result.putParcelableArrayList(key, itemBundleList);
                } else {
                    Log.w(TAG, "Value for key " + key + " seems not ok");
                }
            }
        } catch (JSONException e) {
            Log.w(TAG, "Failed to parse JSON, returning empty Bundle.", e);
            return new Bundle();
        }

        return result;
        // [END_EXCLUDE]
    }

}
// [END analytics_web_interface]
