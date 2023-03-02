package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.adapter.AdapterFlowLayoutMultiSelector;

import java.util.List;

public class AdapterSize extends RecyclerView.Adapter<AdapterSize.MyViewHolder> {

    private Context mContext;
    public List<String> mListString;
    public List<String> mListStringSelected;
    public OnItemClick mOnItemClick;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public TextView mTextViewSize;

        public MyViewHolder(View view) {
            super(view);
            mTextViewSize = (TextView) view.findViewById(R.id.textViewCategory);

        }
    }


    public AdapterSize(Context mContext, List<String> mListString, List<String> mListStringSelected, OnItemClick mOnItemClick) {
        this.mContext = mContext;
        this.mListString = mListString;
        this.mListStringSelected = mListStringSelected;
        this.mOnItemClick = mOnItemClick;
    }

    @Override
    public AdapterSize.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_match_category, parent, false);

        return new AdapterSize.MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(AdapterSize.MyViewHolder holder, @SuppressLint("RecyclerView") int position) {
        holder.mTextViewSize.setText(mListString.get(position));

        if (mListStringSelected.contains(mListString.get(position))) {
            holder.mTextViewSize.setBackground(mContext.getDrawable(R.drawable.bg_button_white));
            holder.mTextViewSize.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.white));
            holder.mTextViewSize.setTextColor(mContext.getResources().getColor(R.color.primary_background_color));
        } else {
            holder.mTextViewSize.setBackground(mContext.getDrawable(R.drawable.bg_text));
            holder.mTextViewSize.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.primary_icon_color));
            holder.mTextViewSize.setTextColor(mContext.getResources().getColor(R.color.primary_icon_color));
        }

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                mOnItemClick.onClick(mListString.get(position));
            }
        });
    }

    @Override
    public int getItemCount() {
        return mListString.size();
    }

    public interface OnItemClick {
        void onClick(String string);
    }
}