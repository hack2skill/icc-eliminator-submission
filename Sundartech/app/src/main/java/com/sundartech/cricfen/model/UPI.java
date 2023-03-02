package com.sundartech.cricfen.model;

public class UPI {
    private int mId, mIcon;
    private String mName, mUPI_ID;

    public UPI(){}

    public UPI(int mId, int mIcon, String mName, String mUPI_ID){
        this.mId = mId;
        this.mIcon = mIcon;
        this.mName = mName;
        this.mUPI_ID = mUPI_ID;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public int getIcon() {
        return mIcon;
    }

    public void setIcon(int mIcon) {
        this.mIcon = mIcon;
    }

    public String getName() {
        return mName;
    }

    public void setName(String mName) {
        this.mName = mName;
    }

    public String getUPI_ID() {
        return mUPI_ID;
    }

    public void setUPI_ID(String mUPI_ID) {
        this.mUPI_ID = mUPI_ID;
    }
}
