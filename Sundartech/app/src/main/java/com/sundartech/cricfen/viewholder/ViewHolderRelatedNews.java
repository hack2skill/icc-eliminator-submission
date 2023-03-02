package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderRelatedNews extends RecyclerView.ViewHolder {

    public FrameLayout mLayout;
    public CardView mCardView;
    public ImageView mImageViewNewsThumbnail;
    public TextView mTextViewNewsTitle, mTextViewNewsEventName, mTextViewNewsTime;

    public ViewHolderRelatedNews(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (FrameLayout) findViewById(R.id.layout);
        mCardView = (CardView) findViewById(R.id.cardView);
        mImageViewNewsThumbnail = (ImageView) findViewById(R.id.imageViewNewsThumbnail);
        mTextViewNewsTitle = (TextView) findViewById(R.id.textViewNewsTitle);
        mTextViewNewsEventName = (TextView) findViewById(R.id.textViewNewsEventName);
        mTextViewNewsTime = (TextView) findViewById(R.id.textViewNewsTime);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}