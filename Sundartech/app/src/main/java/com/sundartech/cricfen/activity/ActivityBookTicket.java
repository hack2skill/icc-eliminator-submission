package com.sundartech.cricfen.activity;

import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.sundartech.cricfen.R;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ActivityBookTicket extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_book_ticket);

        WebView webView = findViewById(R.id.webView);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new WebViewInterface(), "Android");

        String svg = loadSvg();
        //webView.loadData(svg, "image/svg+xml", "utf-8");
        webView.loadUrl("file:///android_asset/stadium_map.html");
    }

    String loadSvg() {
        try {
            BufferedReader input = new BufferedReader(new InputStreamReader(
                    getAssets().open("test.svg")));
            StringBuffer buf = new StringBuffer();
            String s = null;
            while ((s = input.readLine()) != null) {
                buf.append(s);
                buf.append('\n');
            }
            input.close();
            return buf.toString();
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        return null;
    }

    public class WebViewInterface {
        @JavascriptInterface
        public void showDetail(String content) {
            Toast.makeText(ActivityBookTicket.this, content, Toast.LENGTH_SHORT).show();
        }
    }
}
