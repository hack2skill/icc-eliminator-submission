package com.sundartech.cricfen.model;

public class TrendingMatch {
    private int mId;
    private String mFirstTeamName, mFirstTeamShortName, mFirstTeamFlag, mFirstTeamUpdate1, mFirstTeamUpdate2, mSecondTeamName,
            mSecondTeamShortName, mSecondTeamFlag, mSecondTeamUpdate1, mSecondTeamUpdate2, mMatchType, mMatchStatus, mTourName,
            mMatchBackdrop, mMatchRemarks;

    public TrendingMatch(){}

    public TrendingMatch(int mId, String mFirstTeamName, String mFirstTeamShortName, String mFirstTeamFlag, String mFirstTeamUpdate1,
                         String mFirstTeamUpdate2, String mSecondTeamName, String mSecondTeamShortName, String mSecondTeamFlag,
                         String mSecondTeamUpdate1, String mSecondTeamUpdate2, String mMatchType, String mMatchStatus, String mTourName,
                         String mMatchBackdrop, String mMatchRemarks){
        this.mId = mId;
        this.mFirstTeamName = mFirstTeamName;
        this.mFirstTeamShortName = mFirstTeamShortName;
        this.mFirstTeamFlag = mFirstTeamFlag;
        this.mFirstTeamUpdate1 = mFirstTeamUpdate1;
        this.mFirstTeamUpdate2 = mFirstTeamUpdate2;
        this.mSecondTeamName = mSecondTeamName;
        this.mSecondTeamShortName = mSecondTeamShortName;
        this.mSecondTeamFlag = mSecondTeamFlag;
        this.mSecondTeamUpdate1 = mSecondTeamUpdate1;
        this.mSecondTeamUpdate2 = mSecondTeamUpdate2;
        this.mMatchType = mMatchType;
        this.mMatchStatus = mMatchStatus;
        this.mTourName = mTourName;
        this.mMatchBackdrop = mMatchBackdrop;
        this.mMatchRemarks = mMatchRemarks;

    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getFirstTeamName() {
        return mFirstTeamName;
    }

    public void setFirstTeamName(String mFirstTeamName) {
        this.mFirstTeamName = mFirstTeamName;
    }

    public String getFirstTeamShortName() {
        return mFirstTeamShortName;
    }

    public void setFirstTeamShortName(String mFirstTeamShortName) {
        this.mFirstTeamShortName = mFirstTeamShortName;
    }

    public String getFirstTeamFlag() {
        return mFirstTeamFlag;
    }

    public void setFirstTeamFlag(String mFirstTeamFlag) {
        this.mFirstTeamFlag = mFirstTeamFlag;
    }

    public String getFirstTeamUpdate1() {
        return mFirstTeamUpdate1;
    }

    public void setFirstTeamUpdate1(String mFirstTeamUpdate1) {
        this.mFirstTeamUpdate1 = mFirstTeamUpdate1;
    }

    public String getFirstTeamUpdate2() {
        return mFirstTeamUpdate2;
    }

    public void setFirstTeamUpdate2(String mFirstTeamUpdate2) {
        this.mFirstTeamUpdate2 = mFirstTeamUpdate2;
    }

    public String getSecondTeamName() {
        return mSecondTeamName;
    }

    public void setSecondTeamName(String mSecondTeamName) {
        this.mSecondTeamName = mSecondTeamName;
    }

    public String getSecondTeamShortName() {
        return mSecondTeamShortName;
    }

    public void setSecondTeamShortName(String mSecondTeamShortName) {
        this.mSecondTeamShortName = mSecondTeamShortName;
    }

    public String getSecondTeamFlag() {
        return mSecondTeamFlag;
    }

    public void setSecondTeamFlag(String mSecondTeamFlag) {
        this.mSecondTeamFlag = mSecondTeamFlag;
    }

    public String getSecondTeamUpdate1() {
        return mSecondTeamUpdate1;
    }

    public void setSecondTeamUpdate1(String mSecondTeamUpdate1) {
        this.mSecondTeamUpdate1 = mSecondTeamUpdate1;
    }

    public String getSecondTeamUpdate2() {
        return mSecondTeamUpdate2;
    }

    public void setSecondTeamUpdate2(String mSecondTeamUpdate2) {
        this.mSecondTeamUpdate2 = mSecondTeamUpdate2;
    }

    public String getMatchType() {
        return mMatchType;
    }

    public void setMatchType(String mMatchType) {
        this.mMatchType = mMatchType;
    }

    public String getMatchStatus() {
        return mMatchStatus;
    }

    public void setMatchStatus(String mMatchStatus) {
        this.mMatchStatus = mMatchStatus;
    }

    public String getTourName() {
        return mTourName;
    }

    public void setTourName(String mTourName) {
        this.mTourName = mTourName;
    }

    public String getMatchBackdrop() {
        return mMatchBackdrop;
    }

    public void setMatchBackdrop(String mMatchBackdrop) {
        this.mMatchBackdrop = mMatchBackdrop;
    }

    public String getMatchRemarks() {
        return mMatchRemarks;
    }

    public void setMatchRemarks(String mMatchRemarks) {
        this.mMatchRemarks = mMatchRemarks;
    }
}
