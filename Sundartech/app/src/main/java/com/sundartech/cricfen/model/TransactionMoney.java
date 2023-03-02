package com.sundartech.cricfen.model;

public class TransactionMoney {
    private int mId;
    private String mTransactionTitle, mTransactionStatus, mTransactionTime, mTransactionType, mTransactionAmount;

    public TransactionMoney(){}

    public TransactionMoney(int mId, String mTransactionTitle, String mTransactionStatus, String mTransactionTime, String mTransactionType,
                            String mTransactionAmount){
        this.mId = mId;
        this.mTransactionTitle = mTransactionTitle;
        this.mTransactionStatus = mTransactionStatus;
        this.mTransactionTime = mTransactionTime;
        this.mTransactionType = mTransactionType;
        this.mTransactionAmount = mTransactionAmount;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getTransactionTitle() {
        return mTransactionTitle;
    }

    public void setTransactionTitle(String mTransactionTitle) {
        this.mTransactionTitle = mTransactionTitle;
    }

    public String getTransactionStatus() {
        return mTransactionStatus;
    }

    public void setTransactionStatus(String mTransactionStatus) {
        this.mTransactionStatus = mTransactionStatus;
    }

    public String getTransactionTime() {
        return mTransactionTime;
    }

    public void setTransactionTime(String mTransactionTime) {
        this.mTransactionTime = mTransactionTime;
    }

    public String getTransactionType() {
        return mTransactionType;
    }

    public void setTransactionType(String mTransactionType) {
        this.mTransactionType = mTransactionType;
    }

    public String getTransactionAmount() {
        return mTransactionAmount;
    }

    public void setTransactionAmount(String mTransactionAmount) {
        this.mTransactionAmount = mTransactionAmount;
    }
}
