package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderCategory extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public ImageView mImageViewCategoryImage;

    public ViewHolderCategory(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mImageViewCategoryImage = (ImageView) findViewById(R.id.imageViewCategoryImage);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}