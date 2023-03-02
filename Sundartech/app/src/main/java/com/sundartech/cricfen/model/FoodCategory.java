package com.sundartech.cricfen.model;

public class FoodCategory {
    private int mId, mCategoryIcon;
    private String mCategoryName;

    public FoodCategory(){}

    public FoodCategory(int mId, int mCategoryIcon, String mCategoryName){
        this.mId = mId;
        this.mCategoryIcon = mCategoryIcon;
        this.mCategoryName = mCategoryName;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public int getCategoryIcon() {
        return mCategoryIcon;
    }

    public void setCategoryIcon(int mCategoryIcon) {
        this.mCategoryIcon = mCategoryIcon;
    }

    public String getCategoryName() {
        return mCategoryName;
    }

    public void setCategoryName(String mCategoryName) {
        this.mCategoryName = mCategoryName;
    }
}
