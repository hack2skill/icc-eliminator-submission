package com.sundartech.cricfen.model;

public class Food {
    private int mId;
    private String mFoodName, mFoodImage, mFoodPrice, mFoodDescription, mFoodCategory, mFoodRating, mFoodTagline;

    public Food(){}

    public Food(int mId, String mFoodName, String mFoodImage, String mFoodPrice, String mFoodDescription, String mFoodCategory,
                String mFoodRating, String mFoodTagline){
        this.mId = mId;
        this.mFoodName = mFoodName;
        this.mFoodImage = mFoodImage;
        this.mFoodPrice = mFoodPrice;
        this.mFoodDescription = mFoodDescription;
        this.mFoodCategory = mFoodCategory;
        this.mFoodRating = mFoodRating;
        this.mFoodTagline = mFoodTagline;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getFoodName() {
        return mFoodName;
    }

    public void setFoodName(String mFoodName) {
        this.mFoodName = mFoodName;
    }

    public String getFoodImage() {
        return mFoodImage;
    }

    public void setFoodImage(String mFoodImage) {
        this.mFoodImage = mFoodImage;
    }

    public String getFoodPrice() {
        return mFoodPrice;
    }

    public void setFoodPrice(String mFoodPrice) {
        this.mFoodPrice = mFoodPrice;
    }

    public String getFoodDescription() {
        return mFoodDescription;
    }

    public void setFoodDescription(String mFoodDescription) {
        this.mFoodDescription = mFoodDescription;
    }

    public String getFoodCategory() {
        return mFoodCategory;
    }

    public void setFoodCategory(String mFoodCategory) {
        this.mFoodCategory = mFoodCategory;
    }

    public String getFoodRating() {
        return mFoodRating;
    }

    public void setFoodRating(String mFoodRating) {
        this.mFoodRating = mFoodRating;
    }

    public String getFoodTagline() {
        return mFoodTagline;
    }

    public void setFoodTagline(String mFoodTagline) {
        this.mFoodTagline = mFoodTagline;
    }
}
