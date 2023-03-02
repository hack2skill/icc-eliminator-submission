package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.view.View;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.sundartech.cricfen.activity.ActivityMain;
import com.tbuonomo.viewpagerdotsindicator.DotsIndicator;

import java.util.ArrayList;
import java.util.List;

public class ActivityOnboarding extends AppCompatActivity implements View.OnClickListener{

    private DotsIndicator mPagerDotIndicator;

    private ViewPager mViewPager;
    private AdapterOnboarding mAdapterOnboarding;
    private TextView mGetStartedButton;
    private ProgressBar mProgressBar;

    private List<Onboarding> mListOnboarding;

    private static final String TAG = ActivityOnboarding.class.getName();

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_onboarding);

        findViews();
        setUpViews();
    }

    private void findViews() {

        mPagerDotIndicator = (DotsIndicator) findViewById(R.id.pagerDotsIndicator);
        mViewPager = (ViewPager) findViewById(R.id.viewPager);
        mGetStartedButton = (TextView) findViewById(R.id.getStartedButton);
        mProgressBar = (ProgressBar) findViewById(R.id.progressBar);

        mListOnboarding = new ArrayList<>();
        mAdapterOnboarding = new AdapterOnboarding(ActivityOnboarding.this, mListOnboarding);
    }

    private void setUpViews() {
        loadData();

        mViewPager.setAdapter(mAdapterOnboarding);
        mViewPager.setCurrentItem(0);
        mViewPager.addOnPageChangeListener(new ViewPager.OnPageChangeListener() {
            @Override
            public void onPageScrolled(int position, float positionOffset, int positionOffsetPixels) {

            }

            @Override
            public void onPageSelected(int position) {

            }

            @Override
            public void onPageScrollStateChanged(int state) {

            }
        });

        mPagerDotIndicator.setViewPager(mViewPager);

        mGetStartedButton.setOnClickListener(this);
    }

    // Load data into the viewpager
    public void loadData() {
        int[] titleArray = {R.string.onboarding_title_1, R.string.onboarding_title_2, R.string.onboarding_title_3, R.string.onboarding_title_4, R.string.onboarding_title_5, R.string.onboarding_title_6};
        int[] descriptionArray = {R.string.onboarding_description_1, R.string.onboarding_description_2, R.string.onboarding_description_3, R.string.onboarding_description_4, R.string.onboarding_description_5, R.string.onboarding_description_6};
        int[] imageArray = {R.drawable.img_onboarding_1, R.drawable.img_onboarding_2, R.drawable.img_onboarding_3, R.drawable.img_onboarding_4, R.drawable.img_onboarding_5, R.drawable.img_onboarding_6};

        for(int i=0; i<imageArray.length; i++) {
            mListOnboarding.add(new Onboarding(imageArray[i], getResources().getString(titleArray[i]), getResources().getString(descriptionArray[i])));
        }
    }

    public void setOnboardingScreenShow(boolean showOnboardingScreen) {
        SharedPreferences.Editor editor =  CONFIG.sharedPreferences.edit();
        editor.putBoolean(CONFIG.showOnboardingScreen, showOnboardingScreen);
        editor.apply();
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();

        finishAffinity();
        System.exit(0);
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        if (mId == R.id.getStartedButton) {
            startActivity(new Intent(ActivityOnboarding.this, ActivityMain.class));
            finish();
            setOnboardingScreenShow(true);
        }
    }
}
