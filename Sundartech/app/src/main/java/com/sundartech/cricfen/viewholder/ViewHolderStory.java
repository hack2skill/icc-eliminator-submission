package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.LinearLayout;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

import de.hdodenhof.circleimageview.CircleImageView;

public class ViewHolderStory extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public CircleImageView mMatchImage;

    public ViewHolderStory(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mMatchImage = (CircleImageView) findViewById(R.id.matchImage);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}