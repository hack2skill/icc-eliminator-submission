package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.core.content.ContextCompat;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.FoodCategory;
import com.sundartech.cricfen.R;

import java.util.List;

public class AdapterFoodCategory extends RecyclerView.Adapter<AdapterFoodCategory.MyViewHolder> {

    private Context mContext;
    public List<FoodCategory> mListFoodCategory;
    public List<FoodCategory> mListFoodCategorySelected;

    public class MyViewHolder extends RecyclerView.ViewHolder {
        public LinearLayout mLayout;
        public ImageView mImageViewCategoryImage;
        public TextView mTextViewCategory;

        public MyViewHolder(View view) {
            super(view);
            mLayout = (LinearLayout) view.findViewById(R.id.layout);
            mImageViewCategoryImage = (ImageView) view.findViewById(R.id.imageViewCategoryImage);
            mTextViewCategory = (TextView) view.findViewById(R.id.textViewCategory);

        }
    }


    public AdapterFoodCategory(Context mContext, List<FoodCategory> mListFoodCategory, List<FoodCategory> mListFoodCategorySelected) {
        this.mContext = mContext;
        this.mListFoodCategory = mListFoodCategory;
        this.mListFoodCategorySelected = mListFoodCategorySelected;
    }

    @Override
    public AdapterFoodCategory.MyViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_food_category, parent, false);

        return new AdapterFoodCategory.MyViewHolder(itemView);
    }

    @Override
    public void onBindViewHolder(AdapterFoodCategory.MyViewHolder holder, int position) {
        holder.mImageViewCategoryImage.setImageResource(mListFoodCategory.get(position).getCategoryIcon());
        holder.mTextViewCategory.setText(mListFoodCategory.get(position).getCategoryName());

        if (mListFoodCategorySelected.contains(mListFoodCategory.get(position))) {
            holder.mLayout.setBackground(mContext.getDrawable(R.drawable.bg_button_white));
            holder.mLayout.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.white));
            holder.mTextViewCategory.setTextColor(mContext.getResources().getColor(R.color.primary_background_color));
        } else {
            holder.mLayout.setBackground(mContext.getDrawable(R.drawable.bg_text));
            holder.mLayout.setBackgroundTintList(ContextCompat.getColorStateList(mContext, R.color.primary_icon_color));
            holder.mTextViewCategory.setTextColor(mContext.getResources().getColor(R.color.primary_icon_color));
        }


    }

    @Override
    public int getItemCount() {
        return mListFoodCategory.size();
    }
}