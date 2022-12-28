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

import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebView;

@SuppressLint({"AddJavascriptInterface", "SetJavaScriptEnabled"})
public class MainActivity extends AppCompatActivity {

    private static final String TAG = "MainActivity";

    private WebView mWebView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Initialize WebView and enable JavaScript
        mWebView = (WebView) findViewById(R.id.webview);
        mWebView.getSettings().setJavaScriptEnabled(true);

        // Restrict requests in the WebView to a single domain (in this case, our Firebase
        // Hosting domain) so that no other websites can call into our Java code.
        String hostingUrl = "https://xxx.xxx.xxx/"; //webpages hosting something like /faw
//        String hostingUrl = getHostingUrl();
        mWebView.setWebViewClient(new SingleDomainWebViewClient(hostingUrl));

        // [START add_javascript_interface]
        // Only add the JavaScriptInterface on API version JELLY_BEAN_MR1 and above, due to
        // security concerns, see link below for more information:
        // https://developer.android.com/reference/android/webkit/WebView.html#addJavascriptInterface(java.lang.Object,%20java.lang.String)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            mWebView.addJavascriptInterface(
                    new AnalyticsWebInterface(this), AnalyticsWebInterface.TAG);
        } else {
            Log.w(TAG, "Not adding JavaScriptInterface, API Version: " + Build.VERSION.SDK_INT);
        }
        // [END add_javascript_interface]

        // Navigate to site
//        mWebView.clearCache(true);
        mWebView.loadUrl(hostingUrl);
    }

    /**
     * Determine the Firebase Hosting URL for this application by modifying the Firebase Database
     * URL. This constant will be used to limit the URLs that the WebView can display.
     */
//    private String getHostingUrl() {
//        // Database URl is https://<app-name>.firebaseio.com
//        String databaseUrl = getString(R.string.firebase_database_url);
//
//        // Hosting URL is https://<app-name>.firebaseapp.com
//        return databaseUrl.replace("firebaseio", "firebaseapp");
//    }
}
