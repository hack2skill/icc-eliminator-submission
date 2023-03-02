package com.sundartech.cricfen.model;

public class Video {
    private int mId;
    private String mVideoBackdrop, mVideoTitle, mVideoDuration, mVideoUpdatedTime;

    public Video(){}

    public Video(int mId, String mVideoBackdrop, String mVideoTitle, String mVideoDuration, String mVideoUpdatedTime){
        this.mId = mId;
        this.mVideoBackdrop = mVideoBackdrop;
        this.mVideoTitle = mVideoTitle;
        this.mVideoDuration = mVideoDuration;
        this.mVideoUpdatedTime = mVideoUpdatedTime;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getVideoBackdrop() {
        return mVideoBackdrop;
    }

    public void setVideoBackdrop(String mVideoBackdrop) {
        this.mVideoBackdrop = mVideoBackdrop;
    }

    public String getVideoTitle() {
        return mVideoTitle;
    }

    public void setVideoTitle(String mVideoTitle) {
        this.mVideoTitle = mVideoTitle;
    }

    public String getVideoDuration() {
        return mVideoDuration;
    }

    public void setVideoDuration(String mVideoDuration) {
        this.mVideoDuration = mVideoDuration;
    }

    public String getVideoUpdatedTime() {
        return mVideoUpdatedTime;
    }

    public void setVideoUpdatedTime(String mVideoUpdatedTime) {
        this.mVideoUpdatedTime = mVideoUpdatedTime;
    }
}
