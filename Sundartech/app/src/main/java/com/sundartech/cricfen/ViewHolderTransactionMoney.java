package com.sundartech.cricfen;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;

import de.hdodenhof.circleimageview.CircleImageView;

public class ViewHolderTransactionMoney extends RecyclerView.ViewHolder {

    public CardView mCardView;
    public ImageView mImageViewTransactionType;
    public TextView mTextViewTransactionTitle, mTextViewTransactionTime, mTextViewTransactionStatus, mTextViewTransactionAmount;

    public ViewHolderTransactionMoney(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mCardView = (CardView) findViewById(R.id.cardView);
        mImageViewTransactionType = (ImageView) findViewById(R.id.imageViewTransactionType);
        mTextViewTransactionTitle = (TextView) findViewById(R.id.textViewTransactionTitle);
        mTextViewTransactionTime = (TextView) findViewById(R.id.textViewTransactionTime);
        mTextViewTransactionStatus = (TextView) findViewById(R.id.textViewTransactionStatus);
        mTextViewTransactionAmount = (TextView) findViewById(R.id.textViewTransactionAmount);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}