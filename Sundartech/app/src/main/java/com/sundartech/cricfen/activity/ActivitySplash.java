package com.sundartech.cricfen.activity;

import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.sundartech.cricfen.ActivityOnboarding;
import com.sundartech.cricfen.CONFIG;
import com.sundartech.cricfen.R;

public class ActivitySplash extends AppCompatActivity {

    private CountDownTimer mCountDownTimer;

    private static final String TAG = ActivitySplash.class.getName();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        CONFIG.sharedPreferences = getSharedPreferences(CONFIG.pref_name, MODE_PRIVATE);

        mCountDownTimer = new CountDownTimer(3000, 1000) {
            @Override
            public void onTick(long millisUntilFinished) {

            }

            @Override
            public void onFinish() {
                if (!CONFIG.sharedPreferences.getBoolean(CONFIG.showOnboardingScreen, false)) {
                    startActivity(new Intent(ActivitySplash.this, ActivityOnboarding.class));
                }else {
                    startActivity(new Intent(ActivitySplash.this, ActivityMain.class));
                    finish();
                }
            }
        }.start();
    }

    @Override
    protected void onPause() {
        super.onPause();
        if (mCountDownTimer != null){
            mCountDownTimer.cancel();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (mCountDownTimer != null){
            mCountDownTimer.cancel();
        }
    }

    @Override
    protected void onRestart() {
        super.onRestart();
        if (mCountDownTimer != null){
            mCountDownTimer.start();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (mCountDownTimer != null){
            mCountDownTimer.start();
        }
    }
}
