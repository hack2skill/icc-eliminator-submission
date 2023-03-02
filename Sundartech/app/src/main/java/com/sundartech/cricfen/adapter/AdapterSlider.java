package com.sundartech.cricfen.adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;

import com.bumptech.glide.Glide;
import com.sundartech.autoimageslider.SliderViewAdapter;
import com.sundartech.cricfen.R;

import java.util.ArrayList;
import java.util.List;

public class AdapterSlider extends
        SliderViewAdapter<AdapterSlider.SliderAdapterVH> {

    private Context context;
    private List<String> mSliderItems = new ArrayList<>();
    private int mLayout;

    public AdapterSlider(Context context, int mLayout) {
        this.context = context;
        this.mLayout = mLayout;
    }

    public void renewItems(List<String> sliderItems) {
        this.mSliderItems = sliderItems;
        notifyDataSetChanged();
    }

    public void deleteItem(int position) {
        this.mSliderItems.remove(position);
        notifyDataSetChanged();
    }

    public void addItem(String sliderItem) {
        this.mSliderItems.add(sliderItem);
        notifyDataSetChanged();
    }

    @Override
    public SliderAdapterVH onCreateViewHolder(ViewGroup parent) {
        View inflate = LayoutInflater.from(parent.getContext()).inflate(mLayout, null);
        return new SliderAdapterVH(inflate);
    }

    @Override
    public void onBindViewHolder(SliderAdapterVH viewHolder, final int position) {

        String sliderItem = mSliderItems.get(position);

        Glide.with(viewHolder.itemView)
                .load(sliderItem)
                .fitCenter()
                .into(viewHolder.mImageView);

        viewHolder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

            }
        });
    }

    @Override
    public int getCount() {
        //slider view count could be dynamic size
        return mSliderItems.size();
    }

    class SliderAdapterVH extends SliderViewAdapter.ViewHolder {

        View mItemView;
        ImageView mImageView;

        public SliderAdapterVH(View itemView) {
            super(itemView);
            mImageView = itemView.findViewById(R.id.imageView);
            this.mItemView = itemView;
        }
    }

}