package com.sundartech.cricfen.model;

public class Team {
    private int mId, mTeamFlag;
    private String mTeamName;

    public Team(){}

    public Team(int mId, int mTeamFlag, String mTeamName){
        this.mId = mId;
        this.mTeamFlag = mTeamFlag;
        this.mTeamName = mTeamName;
    }

    public int getmId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public int getTeamFlag() {
        return mTeamFlag;
    }

    public void setTeamFlag(int mTeamFlag) {
        this.mTeamFlag = mTeamFlag;
    }

    public String getTeamName() {
        return mTeamName;
    }

    public void setTeamName(String mTeamName) {
        this.mTeamName = mTeamName;
    }
}
