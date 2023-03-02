package com.sundartech.cricfen.model;

public class Banner {
    private int mId;
    private String mBannerTitle, mButtonName, mBannerImage, mAction, mActionPage, mColor;

    public Banner(){}

    public Banner(int mId, String mBannerTitle, String mButtonName, String mBannerImage, String mAction, String mActionPage, String mColor){
        this.mId = mId;
        this.mBannerTitle = mBannerTitle;
        this.mButtonName = mButtonName;
        this.mBannerImage = mBannerImage;
        this.mAction = mAction;
        this.mActionPage = mActionPage;
        this.mColor = mColor;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getBannerTitle() {
        return mBannerTitle;
    }

    public void setBannerTitle(String mBannerTitle) {
        this.mBannerTitle = mBannerTitle;
    }

    public String getButtonName() {
        return mButtonName;
    }

    public void setButtonName(String mButtonName) {
        this.mButtonName = mButtonName;
    }

    public String getBannerImage() {
        return mBannerImage;
    }

    public void setBannerImage(String mBannerImage) {
        this.mBannerImage = mBannerImage;
    }

    public String getAction() {
        return mAction;
    }

    public void setAction(String mAction) {
        this.mAction = mAction;
    }

    public String getActionPage() {
        return mActionPage;
    }

    public void setActionPage(String mActionPage) {
        this.mActionPage = mActionPage;
    }

    public String getColor() {
        return mColor;
    }

    public void setColor(String mColor) {
        this.mColor = mColor;
    }
}
