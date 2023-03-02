package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

import de.hdodenhof.circleimageview.CircleImageView;

public class ViewHolderTrendingMatch extends RecyclerView.ViewHolder {

    public FrameLayout mLayout;
    public CardView mCardView;
    public ImageView mImageViewMatchBackDrop, mImageViewFirstTeamFlag, mImageViewSecondTeamFlag;
    public TextView mTextViewMatchType, mTextViewMatchStatus, mTextViewTourName, mTextViewFirstTeamName,
            mTextViewFirstTeamUpdate1, mTextViewFirstTeamUpdate2, mTextViewSecondTeamName, mTextViewSecondTeamUpdate1,
            mTextViewSecondTeamUpdate2, mTextViewMatchRemarks;

    public ViewHolderTrendingMatch(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (FrameLayout) findViewById(R.id.layout);
        mCardView = (CardView) findViewById(R.id.cardView);
        mImageViewMatchBackDrop = (ImageView) findViewById(R.id.imageViewMatchBackdrop);
        mImageViewFirstTeamFlag = (ImageView) findViewById(R.id.imageViewFirstTeamFlag);
        mImageViewSecondTeamFlag = (ImageView) findViewById(R.id.imageViewSecondTeamFlag);

        mTextViewMatchType = (TextView) findViewById(R.id.textViewMatchType);
        mTextViewMatchStatus = (TextView) findViewById(R.id.textViewMatchStatus);
        mTextViewTourName = (TextView) findViewById(R.id.textViewTour);
        mTextViewFirstTeamName = (TextView) findViewById(R.id.textViewFirstTeamName);
        mTextViewFirstTeamUpdate1 = (TextView) findViewById(R.id.textViewFirstTeamUpdate1);
        mTextViewFirstTeamUpdate2 = (TextView) findViewById(R.id.textViewFirstTeamUpdate2);
        mTextViewSecondTeamName = (TextView) findViewById(R.id.textViewSecondTeamName);
        mTextViewSecondTeamUpdate1 = (TextView) findViewById(R.id.textViewSecondTeamUpdate1);
        mTextViewSecondTeamUpdate2 = (TextView) findViewById(R.id.textViewSecondTeamUpdate2);
        mTextViewMatchRemarks = (TextView) findViewById(R.id.textViewMatchRemarks);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}