package com.sundartech.cricfen.model;

public class Wallet {
    private int mId, mIcon;
    private String mName;

    public Wallet(){}

    public Wallet(int mId, int mIcon, String mName){
        this.mId = mId;
        this.mIcon = mIcon;
        this.mName = mName;
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
}
