package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderVideo extends RecyclerView.ViewHolder {

    public FrameLayout mLayout;
    public CardView mCardView;
    public ImageView mImageViewVideoBackdrop;
    public TextView mTextViewVideoTitle, mTextViewVideoDuration, mTextViewVideoUpdatedTime;

    public ViewHolderVideo(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (FrameLayout) findViewById(R.id.layout);
        mCardView = (CardView) findViewById(R.id.cardView);
        mImageViewVideoBackdrop = (ImageView) findViewById(R.id.imageViewVideoBackdrop);
        mTextViewVideoTitle = (TextView) findViewById(R.id.textViewVideoTitle);
        mTextViewVideoDuration = (TextView) findViewById(R.id.textViewVideoDuration);
        mTextViewVideoUpdatedTime = (TextView) findViewById(R.id.textViewVideoUpdateTime);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}