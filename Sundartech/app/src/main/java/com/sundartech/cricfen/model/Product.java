package com.sundartech.cricfen.model;

public class Product {
    private int mId;
    private String mProductName, mProductDiscount, mProductTeamName, mProductFor, mProductPrice, mProductDescription,
            mProductMainImage, mProductCategory;
    private String[] mProductImages, mProductSizes;

    public Product(){}

    public Product(int mId, String mProductName, String mProductDiscount, String mProductTeamName, String mProductFor,
                   String mProductPrice,String mProductDescription,String mProductMainImage, String mProductCategory, String[] mProductImages, String[] mProductSizes){
        this.mId = mId;
        this.mProductName = mProductName;
        this.mProductDiscount = mProductDiscount;
        this.mProductTeamName = mProductTeamName;
        this.mProductFor = mProductFor;
        this.mProductPrice = mProductPrice;
        this.mProductDescription = mProductDescription;
        this.mProductMainImage = mProductMainImage;
        this.mProductCategory = mProductCategory;
        this.mProductImages = mProductImages;
        this.mProductSizes = mProductSizes;
    }

    public int getId() {
        return mId;
    }

    public void setId(int mId) {
        this.mId = mId;
    }

    public String getProductName() {
        return mProductName;
    }

    public void setProductName(String mProductName) {
        this.mProductName = mProductName;
    }

    public String getProductDiscount() {
        return mProductDiscount;
    }

    public void setProductDiscount(String mProductDiscount) {
        this.mProductDiscount = mProductDiscount;
    }

    public String getProductTeamName() {
        return mProductTeamName;
    }

    public void setProductTeamName(String mProductTeamName) {
        this.mProductTeamName = mProductTeamName;
    }

    public String getProductFor() {
        return mProductFor;
    }

    public void setProductFor(String mProductFor) {
        this.mProductFor = mProductFor;
    }

    public String getProductPrice() {
        return mProductPrice;
    }

    public void setProductPrice(String mProductPrice) {
        this.mProductPrice = mProductPrice;
    }

    public String getProductDescription() {
        return mProductDescription;
    }

    public void setProductDescription(String mProductDescription) {
        this.mProductDescription = mProductDescription;
    }

    public String getProductMainImage() {
        return mProductMainImage;
    }

    public void setProductMainImage(String mProductMainImage) {
        this.mProductMainImage = mProductMainImage;
    }

    public String getProductCategory() {
        return mProductCategory;
    }

    public void setProductCategory(String mProductCategory) {
        this.mProductCategory = mProductCategory;
    }

    public String[] getProductImages() {
        return mProductImages;
    }

    public void setProductImages(String[] mProductImages) {
        this.mProductImages = mProductImages;
    }

    public String[] getProductSizes() {
        return mProductSizes;
    }

    public void setProductSizes(String[] mProductSizes) {
        this.mProductSizes = mProductSizes;
    }
}
