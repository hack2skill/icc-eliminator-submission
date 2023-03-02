package com.sundartech.cricfen.model;

public class Story {

    private int mId;
    private String mStoryTitle, mStoryImage;
    private String[] mStoryVideos;

    public Story(){}

    public Story(int mId, String mStoryTitle, String mStoryImage, String[] mStoryVideos){
        this.mId = mId;
        this.mStoryTitle = mStoryTitle;
        this.mStoryImage = mStoryImage;
        this.mStoryVideos = mStoryVideos;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getStoryTitle() {
        return mStoryTitle;
    }

    public void setStoryTitle(String mStoryTitle) {
        this.mStoryTitle = mStoryTitle;
    }

    public String getStoryImage() {
        return mStoryImage;
    }

    public void setStoryImage(String mStoryImage) {
        this.mStoryImage = mStoryImage;
    }

    public String[] getStoryVideos() {
        return mStoryVideos;
    }

    public void setStoryVideos(String[] mStoryVideos) {
        this.mStoryVideos = mStoryVideos;
    }
}
