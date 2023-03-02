package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderStadiumXMatch extends RecyclerView.ViewHolder {

    public FrameLayout mLayout;
    public CardView mCardView;
    public ImageView mImageViewFirstTeamFlag, mImageViewSecondTeamFlag;
    public TextView mTextViewMatchStatus, mTextViewStadiumName, mTextViewFirstTeamName,
            mTextViewSecondTeamName, mTextViewMatchTime;

    public ViewHolderStadiumXMatch(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (FrameLayout) findViewById(R.id.layout);
        mCardView = (CardView) findViewById(R.id.cardView);
        mImageViewFirstTeamFlag = (ImageView) findViewById(R.id.imageViewFirstTeamFlag);
        mImageViewSecondTeamFlag = (ImageView) findViewById(R.id.imageViewSecondTeamFlag);

        mTextViewMatchStatus = (TextView) findViewById(R.id.textViewMatchStatus);
        mTextViewStadiumName = (TextView) findViewById(R.id.textViewStadiumName);
        mTextViewFirstTeamName = (TextView) findViewById(R.id.textViewFirstTeamName);
        mTextViewSecondTeamName = (TextView) findViewById(R.id.textViewSecondTeamName);
        mTextViewMatchTime = (TextView) findViewById(R.id.textViewMatchTime);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}