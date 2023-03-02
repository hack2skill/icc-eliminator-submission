package com.sundartech.cricfen;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.viewpager.widget.PagerAdapter;

import java.util.List;

public class AdapterOnboarding extends PagerAdapter {

    private final Context context;
    private final List<Onboarding> mlistOnboarding;

    public AdapterOnboarding(Context context, List<Onboarding> mlistOnboarding) {
        this.context = context;
        this.mlistOnboarding = mlistOnboarding;
    }

    @NonNull
    @Override
    public Object instantiateItem(@NonNull ViewGroup container, int position) {
        View itemView = LayoutInflater.from(context).inflate(R.layout.item_onboarding, container, false);

        Onboarding itemOnboarding = mlistOnboarding.get(position);

        TextView mTextViewTitle = (TextView) itemView.findViewById(R.id.textViewTitle);
        TextView mTextViewDescription = (TextView) itemView.findViewById(R.id.textViewDescription);
        ImageView mImageViewBanner = (ImageView) itemView.findViewById(R.id.imageViewBanner);

        mTextViewTitle.setText(itemOnboarding.getTitle());
        mTextViewDescription.setText(itemOnboarding.getDescription());

        mImageViewBanner.setImageResource(itemOnboarding.getBanner());

        container.addView(itemView);

        return itemView;
    }

    @Override
    public void destroyItem(ViewGroup container, int position, @NonNull Object object) {
        container.removeView((FrameLayout) object);
    }

    @Override
    public int getCount() {
        return mlistOnboarding.size();
    }

    @Override
    public boolean isViewFromObject(@NonNull View view, @NonNull Object object) {
        return view == object;
    }
}