package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderBanner extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public TextView mTextViewBannerTitle;
    public TextView mBannerButton;
    public ImageView mImageViewBannerImage;

    public ViewHolderBanner(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mTextViewBannerTitle = (TextView) findViewById(R.id.textViewBannerTitle);
        mBannerButton = (TextView) findViewById(R.id.bannerButton);
        mImageViewBannerImage = (ImageView) findViewById(R.id.imageViewBannerImage);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}