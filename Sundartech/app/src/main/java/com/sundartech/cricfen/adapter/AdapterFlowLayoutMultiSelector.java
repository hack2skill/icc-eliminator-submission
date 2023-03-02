package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;

import java.util.List;

public class AdapterFlowLayoutMultiSelector extends RecyclerView.Adapter<AdapterFlowLayoutMultiSelector.MyViewHolder> {

    private Context mContext;
    public List<String> mListString;
    public List<String> mListStringSelected;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView mTextViewCategory;

        public MyViewHolder(View view) {
            super(view);
            mTextViewCategory = (TextView) view.findViewById(R.id.textViewCategory);

        }
    }


    public AdapterFlowLayoutMultiSelector(Context mContext, List<String> mListString, List<String> mListStringSelected) {
        this.mContext = mContext;
        this.mListString = mListString;
        this.mListStringSelected = mListStringSelected;
    }

    @Override
    public MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_match_category, parent, false);

        return new MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(MyViewHolder holder, int position) {
        holder.mTextViewCategory.setText(mListString.get(position));

        if (mListStringSelected.contains(mListString.get(position))) {
            holder.mTextViewCategory.setBackground(mContext.getDrawable(R.drawable.bg_button_white));
            holder.mTextViewCategory.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.white));
            holder.mTextViewCategory.setTextColor(mContext.getResources().getColor(R.color.primary_background_color));
        } else {
            holder.mTextViewCategory.setBackground(mContext.getDrawable(R.drawable.bg_text));
            holder.mTextViewCategory.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.primary_icon_color));
            holder.mTextViewCategory.setTextColor(mContext.getResources().getColor(R.color.primary_icon_color));
        }


    }

    @Override
    public int getItemCount() {
        return mListString.size();
    }
}