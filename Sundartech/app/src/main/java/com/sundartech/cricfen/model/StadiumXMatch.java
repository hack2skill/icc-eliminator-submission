package com.sundartech.cricfen.model;

public class StadiumXMatch {
    private int mId;
    private String mFirstTeamName, mFirstTeamShortName, mFirstTeamFlag, mSecondTeamName,
            mSecondTeamShortName, mSecondTeamFlag, mMatchStatus, mStadiumName, mMatchTime;

    public StadiumXMatch(){}

    public StadiumXMatch(int mId, String mFirstTeamName, String mFirstTeamShortName, String mFirstTeamFlag, String mSecondTeamName,
                         String mSecondTeamShortName, String mSecondTeamFlag, String mMatchStatus, String mStadiumName, String mMatchTime){
        this.mId = mId;
        this.mFirstTeamName = mFirstTeamName;
        this.mFirstTeamShortName = mFirstTeamShortName;
        this.mFirstTeamFlag = mFirstTeamFlag;
        this.mSecondTeamName = mSecondTeamName;
        this.mSecondTeamShortName = mSecondTeamShortName;
        this.mSecondTeamFlag = mSecondTeamFlag;
        this.mMatchStatus = mMatchStatus;
        this.mStadiumName = mStadiumName;
        this.mMatchTime = mMatchTime;
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

    public String getMatchStatus() {
        return mMatchStatus;
    }

    public void setMatchStatus(String mMatchStatus) {
        this.mMatchStatus = mMatchStatus;
    }

    public String getStadiumName() {
        return mStadiumName;
    }

    public void setStadiumName(String mStadiumName) {
        this.mStadiumName = mStadiumName;
    }

    public String getMatchTime() {
        return mMatchTime;
    }

    public void setMatchTime(String mMatchTime) {
        this.mMatchTime = mMatchTime;
    }
}
