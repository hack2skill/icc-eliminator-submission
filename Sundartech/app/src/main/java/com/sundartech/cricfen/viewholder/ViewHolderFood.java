package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderFood extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public TextView mTextViewFoodName, mTextViewFoodPrice, mTextViewFoodRate;
    public ImageView mImageViewFoodImage;

    public ViewHolderFood(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mTextViewFoodName = (TextView) findViewById(R.id.textViewFoodName);
        mTextViewFoodPrice = (TextView) findViewById(R.id.textViewFoodPrice);
        mTextViewFoodRate = (TextView) findViewById(R.id.textViewFoodRate);
        mImageViewFoodImage = (ImageView) findViewById(R.id.imageViewFoodImage);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}