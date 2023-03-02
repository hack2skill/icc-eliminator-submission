package com.sundartech.cricfen.viewholder;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

public class ViewHolderTeam extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public ImageView mImageViewTeamFlag;
    public TextView mTextViewTeamName;

    public ViewHolderTeam(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mImageViewTeamFlag = (ImageView) findViewById(R.id.imageViewTeamFlag);
        mTextViewTeamName = (TextView) findViewById(R.id.textViewTeamName);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}