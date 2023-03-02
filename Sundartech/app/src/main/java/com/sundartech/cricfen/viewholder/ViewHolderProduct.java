package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderProduct extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public TextView mTextViewDiscount, mTextViewTeamName, mTextViewProductFor, mTextViewProductName, mTextViewPriceAfterDicsount, mTextViewPrice;
    public ImageView mImageViewProductImage, mWishlistButton;

    public ViewHolderProduct(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mTextViewDiscount = (TextView) findViewById(R.id.textViewDicount);
        mTextViewTeamName = (TextView) findViewById(R.id.textViewTeamName);
        mTextViewProductFor = (TextView) findViewById(R.id.textViewProductFor);
        mTextViewProductName = (TextView) findViewById(R.id.textViewProductName);
        mTextViewPriceAfterDicsount = (TextView) findViewById(R.id.textViewProductPriceAfterDiscount);
        mTextViewPrice = (TextView) findViewById(R.id.textViewProductPrice);
        mImageViewProductImage = (ImageView) findViewById(R.id.imageViewProductImage);
        mWishlistButton = (ImageView) findViewById(R.id.wishlistButton);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}