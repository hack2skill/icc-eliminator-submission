package com.sundartech.cricfen.activity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.sundartech.cricfen.R;

public class ActivityIteractiveSeatView extends AppCompatActivity implements View.OnClickListener {

    private WebView mWebView;
    private LinearLayout mLayoutIteractiveView;
    private ImageView mBackButton, mCancel, mImageViewIteractiveView;
    private TextView mTextViewBay, mTextViewRow, mTextViewAdultFair, mCancelButton, mView360Button;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_interactive_seat_view);

        findViews();
        setViews();
    }

    private void findViews(){
        mWebView = (WebView) findViewById(R.id.webView);

        mLayoutIteractiveView = (LinearLayout) findViewById(R.id.layoutIteractiveView);

        mBackButton = (ImageView) findViewById(R.id.backButton);
        mCancel = (ImageView) findViewById(R.id.cancel);
        mImageViewIteractiveView = (ImageView) findViewById(R.id.imageViewIteractiveView);

        mTextViewBay = (TextView) findViewById(R.id.textViewBay);
        mTextViewRow = (TextView) findViewById(R.id.textViewRow);
        mTextViewAdultFair = (TextView) findViewById(R.id.texytViewAdultFair);
        mCancelButton = (TextView) findViewById(R.id.cancelButton);
        mView360Button = (TextView) findViewById(R.id.view360Button);

        mBackButton.setOnClickListener(this);
        mCancel.setOnClickListener(this);
        mCancelButton.setOnClickListener(this);
        mView360Button.setOnClickListener(this);
    }

    private void setViews(){
        loadStadium();
    }

    @SuppressLint("SetJavaScriptEnabled")
    private void loadStadium(){
        mWebView.getSettings().setJavaScriptEnabled(true);
        mWebView.getSettings().setLightTouchEnabled(true);
        mWebView.getSettings().setBuiltInZoomControls(true);
        mWebView.getSettings().setDisplayZoomControls(false);
        mWebView.setVerticalScrollBarEnabled(false);
        mWebView.addJavascriptInterface(new ActivityIteractiveSeatView.WebViewInterface(), "Android");

        mWebView.loadUrl("file:///android_asset/stadium_map.html");
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                onBackPressed();
                break;
            case R.id.cancel:
                mLayoutIteractiveView.setVisibility(View.GONE);
                break;
            case R.id.cancelButton:
                mLayoutIteractiveView.setVisibility(View.GONE);
                break;
            case R.id.view360Button:
                startActivity(new Intent(ActivityIteractiveSeatView.this, Activity360View.class));
                break;
        }
    }

    public void randomAction(String content){
        mLayoutIteractiveView.setVisibility(View.VISIBLE);
        if (!content.contains("path")){
            int randomBay = (int) Math.random()*(54-1+1)+1;
            mTextViewBay.setText("" + randomBay);
            mTextViewRow.setText(content.substring(2));
            int randomFair = (int) Math.random()*(1700-500+1)+500;
            mTextViewAdultFair.setText("₹ " + randomFair);
        }
        Toast.makeText(ActivityIteractiveSeatView.this, content, Toast.LENGTH_SHORT).show();
    }

    public class WebViewInterface {
        @JavascriptInterface
        public void showDetail(String content) {
            //Toast.makeText(ActivityIteractiveSeatView.this, content, Toast.LENGTH_SHORT).show();
            /*if (mLayoutIteractiveView.getVisibility() == View.VISIBLE){
                mLayoutIteractiveView.setVisibility(View.GONE);
            }*/
            //mLayoutIteractiveView.setVisibility(View.VISIBLE);
            //randomAction(content);
            mWebView.post(new Runnable() {
                public void run() {
                    //mView.loadUrl("javascript:ChangeColor()");
                    randomAction(content);
                }
            });
        }
    }
}
