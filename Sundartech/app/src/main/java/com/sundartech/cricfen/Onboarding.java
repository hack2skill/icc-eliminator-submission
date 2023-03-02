package com.sundartech.cricfen;

public class Onboarding {

    private int mBanner;
    private String mTitle, mDescription;

    public Onboarding(){}

    public Onboarding(int mBanner, String mTitle, String mDescription){
        this.mBanner = mBanner;
        this.mTitle = mTitle;
        this.mDescription = mDescription;
    }

    public int getBanner() {
        return mBanner;
    }

    public void setBanner(int mBanner) {
        this.mBanner = mBanner;
    }

    public String getTitle() {
        return mTitle;
    }

    public void setTitle(String mTitle) {
        this.mTitle = mTitle;
    }

    public String getDescription() {
        return mDescription;
    }

    public void setDescription(String mDescription) {
        this.mDescription = mDescription;
    }
}
