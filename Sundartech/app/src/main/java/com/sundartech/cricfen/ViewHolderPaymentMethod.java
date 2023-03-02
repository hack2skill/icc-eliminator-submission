package com.sundartech.cricfen;

import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.recyclerview.widget.RecyclerView;

import de.hdodenhof.circleimageview.CircleImageView;

public class ViewHolderPaymentMethod extends RecyclerView.ViewHolder {

    public LinearLayout mLayout;
    public CircleImageView mCircleImageViewPaymentMethodIcon;
    public TextView mTextViewMethodName;

    public ViewHolderPaymentMethod(View itemView) {
        super(itemView);
        assignViews();
    }

    private void assignViews() {
        mLayout = (LinearLayout) findViewById(R.id.layout);
        mCircleImageViewPaymentMethodIcon = (CircleImageView) findViewById(R.id.circleImageViewPaymentMethodIcon);
        mTextViewMethodName = (TextView) findViewById(R.id.textViewMethodName);
    }

    private View findViewById(final int id) {
        return itemView.findViewById(id);
    }
}