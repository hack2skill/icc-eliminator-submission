package com.sundartech.cricfen.model;

public class News {
    private int mId;
    private String mNewsThumbnail, mNewsTitle, mNewsDescription, mNewsEvent, mNewsTime;

    public News(){}

    public News(int mId, String mNewsThumbnail, String mNewsTitle, String mNewsDescription, String mNewsEvent,
                String mNewsTime){
        this.mId = mId;
        this.mNewsThumbnail = mNewsThumbnail;
        this.mNewsTitle = mNewsTitle;
        this.mNewsDescription = mNewsDescription;
        this.mNewsEvent = mNewsEvent;
        this.mNewsTime = mNewsTime;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getNewsThumbnail() {
        return mNewsThumbnail;
    }

    public void setNewsThumbnail(String mNewsThumbnail) {
        this.mNewsThumbnail = mNewsThumbnail;
    }

    public String getNewsTitle() {
        return mNewsTitle;
    }

    public void setNewsTitle(String mNewsTitle) {
        this.mNewsTitle = mNewsTitle;
    }

    public String getNewsDescription() {
        return mNewsDescription;
    }

    public void setNewsDescription(String mNewsDescription) {
        this.mNewsDescription = mNewsDescription;
    }

    public String getNewsEvent() {
        return mNewsEvent;
    }

    public void setNewsEvent(String mNewsEvent) {
        this.mNewsEvent = mNewsEvent;
    }

    public String getNewsTime() {
        return mNewsTime;
    }

    public void setNewsTime(String mNewsTime) {
        this.mNewsTime = mNewsTime;
    }
}
