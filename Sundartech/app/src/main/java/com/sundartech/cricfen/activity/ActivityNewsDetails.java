package com.sundartech.cricfen.activity;

import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.style.ClickableSpan;
import android.text.style.RelativeSizeSpan;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterRelatedNews;
import com.sundartech.cricfen.model.News;
import com.sundartech.cricfen.utils.InternetConnection;

import java.util.ArrayList;
import java.util.List;

public class ActivityNewsDetails extends AppCompatActivity implements View.OnClickListener {

    private ImageView mBackButton, mShareButton, mWishlistButton, mMoreOptionButton;
    private TextView mTextViewNewsEvent, mTextViewNewsTitle, mTextViewNewsTime, mTextViewNewsDescription;
    private ImageView mImageViewNewsImage;

    private LinearLayout mLayoutRelatedNews;
    private RecyclerView mRecyclerViewRelatedNews;

    private List<News> mListRelatedNews;
    private AdapterRelatedNews mAdapterRelatedNews;

    private LinearLayoutManager mLinearLayoutManagerRelatedNews;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_news_details);

        findViews();
        setViews();
    }

    private void findViews(){
        mBackButton = (ImageView) findViewById(R.id.backButton);
        mShareButton = (ImageView) findViewById(R.id.shareButton);
        mWishlistButton = (ImageView) findViewById(R.id.wishlistButton);
        mMoreOptionButton = (ImageView) findViewById(R.id.moreOptionButton);

        mTextViewNewsEvent = (TextView) findViewById(R.id.textViewNewsEvent);
        mTextViewNewsTitle = (TextView) findViewById(R.id.textViewNewsTitle);
        mTextViewNewsTime = (TextView) findViewById(R.id.textViewNewsTime);
        mTextViewNewsDescription = (TextView) findViewById(R.id.textViewNewsDescription);

        mImageViewNewsImage = (ImageView) findViewById(R.id.imageViewNewsImage);

        mLayoutRelatedNews = (LinearLayout) findViewById(R.id.layoutRelatedNews);

        mRecyclerViewRelatedNews = (RecyclerView) findViewById(R.id.recyclerViewRelatedNews);

        mListRelatedNews = new ArrayList<>();
        mAdapterRelatedNews = new AdapterRelatedNews(ActivityNewsDetails.this, mListRelatedNews);

        mLinearLayoutManagerRelatedNews = new LinearLayoutManager(ActivityNewsDetails.this, LinearLayoutManager.HORIZONTAL, false);
    }

    private void setViews(){
        SpannableString spannableString = new SpannableString(getString(R.string.news_dummy_content));

        RelativeSizeSpan relativeSizeSpan = new RelativeSizeSpan(3f){

            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                super.updateDrawState(ds);
                ds.setColor(getResources().getColor(R.color.secondary_icon_color));
            }
        };

        spannableString.setSpan(relativeSizeSpan, 0, 1, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        mTextViewNewsDescription.setText(spannableString);
        mTextViewNewsDescription.setClickable(false);

        loadRelatedNews();

        mBackButton.setOnClickListener(this);
        mShareButton.setOnClickListener(this);
        mWishlistButton.setOnClickListener(this);
        mMoreOptionButton.setOnClickListener(this);
    }

    private void loadRelatedNews(){
        if (InternetConnection.isNetworkConnected(ActivityNewsDetails.this)) {

            mListRelatedNews.add(new News(1, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/754a504a-a8e3-4499-9b11-00f8880d698d/GettyImages-1469216034.jpg?width=880&height=495", "Catches win matches: SA hero Tazmin Brits talks brilliant fielding and fears over broken bones", "Rarely has the old adage that ‘catches win matches’ been proven as right as in Friday’s semi-final between South Africa and England.", "Women's T20 World Cup", "23 Feb, 2023 6:00 PM"));
            mListRelatedNews.add(new News(2, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/cc4ccfed-c82c-494d-ae1f-7c53abf3804d/GettyImages-1469210607.jpg?width=880&height=495", "The end of the hoodoo! South Africa finally win a senior World Cup semi-final", "At the twelfth time of asking, South Africa have banished the painful memories of the past to finally win a semi-final at a senior-level ICC World Cup.", "Women's T20 World Cup", "24 Feb, 2023 6:00 PM"));
            mListRelatedNews.add(new News(3, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/c8337688-e6fe-42ab-b0a8-3f1603320eb7/GettyImages-1241988466.jpg?width=880&height=495", "Sri Lanka announce 17-member Test squad for tour of New Zealand", "Dimuth Karunaratne will lead Sri Lanka in a two-Test series in New Zealand which is all set to begin on March 9.", "Women's T20 World Cup", "25 Feb, 2023 6:00 PM"));
            mListRelatedNews.add(new News(4, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/20/70120e46-c89f-4eba-8d76-f8d21698f959/Mithali-Raj.png?width=880&height=495", "Mithali commends advancement in women’s cricket", "India legend Mithali Raj appreciated the rise of multi-dimensional cricketers, increased use of pace options, and narrowing of the gap between sides as seen in the ICC Women’s T20 World Cup 2023.", "Women's T20 World Cup", "26 Feb, 2023 6:00 PM"));

            if (mListRelatedNews.size() > 0){
                mLayoutRelatedNews.setVisibility(View.VISIBLE);
            }else {
                mLayoutRelatedNews.setVisibility(View.GONE);
            }

            mRecyclerViewRelatedNews.setHasFixedSize(true);
            mRecyclerViewRelatedNews.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewRelatedNews.setLayoutManager(mLinearLayoutManagerRelatedNews);
            mRecyclerViewRelatedNews.setAdapter(mAdapterRelatedNews);
            mRecyclerViewRelatedNews.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(ActivityNewsDetails.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                onBackPressed();
                break;
            case R.id.shareButton:
                break;
            case R.id.wishlistButton:
                break;
            case R.id.moreOptionButton:
                break;
        }
    }
}
