package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.res.ColorStateList;
import android.graphics.Color;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.Banner;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.viewholder.ViewHolderBanner;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterBanner extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Banner> mListBanner;
    private Context mContext;

    public AdapterBanner(Context mContext, List<Banner> mListBanner) {
        this.mContext = mContext;
        this.mListBanner = mListBanner;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_banner, parent, false);
        return new ViewHolderBanner(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderBanner) {
            populateCastItem((ViewHolderBanner) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateCastItem(final ViewHolderBanner holder, final int position) {

        holder.mLayout.setBackgroundTintList(ColorStateList.valueOf(Color.parseColor(mListBanner.get(position).getColor())));

        holder.mTextViewBannerTitle.setText(mListBanner.get(position).getBannerTitle());
        holder.mBannerButton.setText(mListBanner.get(position).getButtonName());

        holder.mBannerButton.setTextColor(Color.parseColor(mListBanner.get(position).getColor()));

        /*Glide.with(mContext)
                .load(mListBanner.get(position).getBannerImage())
                *//*.placeholder(R.drawable.ic_play)
                .error(R.drawable.ic_share)
                .priority( Priority.HIGH )*//*
                .into(holder.mImageViewBannerImage);*/

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

        holder.mLayout.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                holder.itemView.performClick();
            }
        });

    }

    public static int getResId(String resName, Class<?> c) {

        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int getItemCount() {
        return mListBanner.size();
    }

    public void clear() {
        int size = mListBanner.size();
        mListBanner.clear();
        notifyItemRangeRemoved(0, size);
    }
}