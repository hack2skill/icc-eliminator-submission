package com.sundartech.cricfen.model;

public class InternetBanking {
    private int mId, mBankIcon;
    private String mBankName, mBankingURL;

    public InternetBanking(){}

    public InternetBanking(int mId, int mBankIcon, String mBankName, String mBankingURL){
        this.mId = mId;
        this.mBankIcon = mBankIcon;
        this.mBankName = mBankName;
        this.mBankingURL = mBankingURL;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public int getBankIcon() {
        return mBankIcon;
    }

    public void setBankIcon(int mBankIcon) {
        this.mBankIcon = mBankIcon;
    }

    public String getBankName() {
        return mBankName;
    }

    public void setBankName(String mBankName) {
        this.mBankName = mBankName;
    }

    public String getBankingURL() {
        return mBankingURL;
    }

    public void setBankingURL(String mBankingURL) {
        this.mBankingURL = mBankingURL;
    }
}
