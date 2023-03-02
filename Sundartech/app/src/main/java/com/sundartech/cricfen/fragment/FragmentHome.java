package com.sundartech.cricfen.fragment;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.widget.Toolbar;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.PagerSnapHelper;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.ActivityPhoneNumber;
import com.sundartech.cricfen.CONFIG;
import com.sundartech.cricfen.adapter.AdapterVideo;
import com.sundartech.cricfen.utils.InternetConnection;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterBanner;
import com.sundartech.cricfen.adapter.AdapterNews;
import com.sundartech.cricfen.adapter.AdapterStory;
import com.sundartech.cricfen.adapter.AdapterTrendingMatch;
import com.sundartech.cricfen.model.Banner;
import com.sundartech.cricfen.model.News;
import com.sundartech.cricfen.model.Story;
import com.sundartech.cricfen.model.TrendingMatch;
import com.sundartech.cricfen.model.Video;

import java.util.ArrayList;
import java.util.List;

import me.relex.circleindicator.CircleIndicator2;

public class FragmentHome extends Fragment implements View.OnClickListener{

    private LinearLayout mCoinLayoutButton;
    private TextView mTextViewCoin;

    private LinearLayout mLayoutStory, mLayoutBanner, mLayoutCurrentMatches, mLayoutFeaturedVideo,
            mLayoutTopNews;
    private RecyclerView mRecyclerViewStory, mRecyclerViewBanner, mRecyclerViewCurrentMatches,
            mRecyclerViewFeaturedVideo, mRecyclerViewTopNews;
    private CircleIndicator2 mBannerIndicator;

    private ImageView mLoadMoreMatchesButton, mLoadMoreVideoButton, mLoadMoreNewsButton;

    private AdapterStory mAdapterStory;
    private List<Story> mListStory;

    private AdapterBanner mAdapterBanner;
    private List<Banner> mListBanner;

    private AdapterTrendingMatch mAdapterTrendingMatch;
    private List<TrendingMatch> mListTrendingMatch;

    private AdapterVideo mAdapterFeaturedVideo;
    private List<Video> mListFeaturedVideo;

    private AdapterNews mAdapterTopNews;
    private List<News> mListTopNews;

    private LinearLayoutManager mLinearLayoutManagerStory, mLinearLayoutManagerBanner, mLinearLayoutManagerTrendingMatch,
            mLinearLayoutManagerFeaturedVideo, mLinearLayoutManagerTopNews;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public FragmentHome() {
        // Required empty public constructor
    }
    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment HomeFragment.
     */
    // TODO: Rename and change types and number of parameters
    public static FragmentHome newInstance(String param1, String param2) {
        FragmentHome fragment = new FragmentHome();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View v = inflater.inflate(R.layout.fragment_home, container, false);

        findViews(v);
        setUpViews();

        return v;
    }

    private void findViews(View v) {

        mCoinLayoutButton = (LinearLayout) v.findViewById(R.id.coinLayoutButton);
        mTextViewCoin = (TextView) v.findViewById(R.id.textViewCoin);

        mLayoutStory = (LinearLayout) v.findViewById(R.id.layoutStory);
        mLayoutBanner = (LinearLayout) v.findViewById(R.id.layoutBanner);
        mLayoutCurrentMatches = (LinearLayout) v.findViewById(R.id.layoutCurrentMatches);
        mLayoutFeaturedVideo = (LinearLayout) v.findViewById(R.id.layoutFeaturedVideo);
        mLayoutTopNews = (LinearLayout) v.findViewById(R.id.layoutTopNews);

        mRecyclerViewStory = (RecyclerView) v.findViewById(R.id.recyclerViewStory);
        mRecyclerViewBanner = (RecyclerView) v.findViewById(R.id.recyclerViewBanner);
        mRecyclerViewCurrentMatches = (RecyclerView) v.findViewById(R.id.recyclerViewCurrentMatches);
        mRecyclerViewFeaturedVideo = (RecyclerView) v.findViewById(R.id.recyclerViewFeaturedVideo);
        mRecyclerViewTopNews = (RecyclerView) v.findViewById(R.id.recyclerViewTopNews);

        mBannerIndicator = v.findViewById(R.id.indicator);

        mLoadMoreMatchesButton = (ImageView) v.findViewById(R.id.loadMoreMatchesButton);
        mLoadMoreVideoButton = (ImageView) v.findViewById(R.id.loadMoreVideosButton);
        mLoadMoreNewsButton = (ImageView) v.findViewById(R.id.loadMoreNewsButton);

        mListStory = new ArrayList<>();
        mAdapterStory = new AdapterStory(getActivity(), mListStory);

        mListBanner = new ArrayList<>();
        mAdapterBanner = new AdapterBanner(getActivity(), mListBanner);

        mListTrendingMatch = new ArrayList<>();
        mAdapterTrendingMatch = new AdapterTrendingMatch(getActivity(), mListTrendingMatch);

        mListFeaturedVideo = new ArrayList<>();
        mAdapterFeaturedVideo = new AdapterVideo(getActivity(), mListFeaturedVideo, R.layout.item_video);

        mListTopNews = new ArrayList<>();
        mAdapterTopNews = new AdapterNews(getActivity(), mListTopNews);

        mLinearLayoutManagerStory = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerBanner = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerTrendingMatch = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerFeaturedVideo = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerTopNews = new LinearLayoutManager(getActivity(), LinearLayoutManager.VERTICAL, false);
    }

    private void setUpViews() {
        mTextViewCoin.setText(CONFIG.sharedPreferences.getString(CONFIG.coin, "00"));

        loadStory();
        loadBanner();
        loadTrendingMatch();
        loadFeaturedVideo();
        loadTopNews();

        mCoinLayoutButton.setOnClickListener(this);
    }

    private void loadStory(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListStory.add(new Story(1, "Aus Champions", "https://media.usestoryteller.com/assets/stories/3dfbea77-e223-6e3f-7b01-3a09a0c9e9f5/638130268914883609_image_thumbnail_webp.webp", new String[]{""}));
            mListStory.add(new Story(2, "Player of the tournaments", "https://media.usestoryteller.com/assets/stories/376cb8d4-85f5-47a2-bdb0-ea60733216fa/638130253578229637_image_thumbnail_webp.webp", new String[]{""}));
            mListStory.add(new Story(3, "AUS vs SA Highlights", "https://media.usestoryteller.com/assets/wsc-story/ac894b84-7669-3337-07d3-3a09a0a9c1f8/thumbnail.jpeg", new String[]{""}));
            mListStory.add(new Story(4, "Aus Top Plays", "https://media.usestoryteller.com/assets/wsc-story/4662695e-4e4c-8702-1da0-3a09a0a9af91/thumbnail.jpeg", new String[]{""}));
            mListStory.add(new Story(5, "Mooney vs SA", "https://media.usestoryteller.com/assets/stories/ee738c7b-69eb-49f7-a1a9-3067917cc22a/638130248725163488_image_thumbnail_webp.webp", new String[]{""}));
            mListStory.add(new Story(6, "SA Top Plays", "https://media.usestoryteller.com/assets/wsc-story/2533554c-220b-ccda-9adf-3a09a0a9ab0c/thumbnail.jpeg", new String[]{""}));

            if (mListStory.size() > 0){
                mLayoutStory.setVisibility(View.VISIBLE);
            }else {
                mLayoutStory.setVisibility(View.GONE);
            }

            mRecyclerViewStory.setHasFixedSize(true);
            mRecyclerViewStory.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewStory.setLayoutManager(mLinearLayoutManagerStory);
            mRecyclerViewStory.setAdapter(mAdapterStory);
            mRecyclerViewStory.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadBanner(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListBanner.add(new Banner(1, "Celebrate T20 Cricket’s Big Carnival", "Pre-order now", "", "merchandise", "merchandise", "#EB00FF"));
            mListBanner.add(new Banner(1, "20% OFF ON TEAM INDIA ESSENTIALS", "Order now", "", "merchandise", "merchandise", "#1383F1"));

            if (mListBanner.size() > 0){
                mLayoutBanner.setVisibility(View.VISIBLE);
            }else {
                mLayoutBanner.setVisibility(View.GONE);
            }

            mRecyclerViewBanner.setHasFixedSize(true);
            mRecyclerViewBanner.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewBanner.setLayoutManager(mLinearLayoutManagerBanner);
            mRecyclerViewBanner.setAdapter(mAdapterBanner);
            mRecyclerViewBanner.setNestedScrollingEnabled(false);

            PagerSnapHelper pagerSnapHelper = new PagerSnapHelper();
            pagerSnapHelper.attachToRecyclerView(mRecyclerViewBanner);

            mBannerIndicator.attachToRecyclerView(mRecyclerViewBanner, pagerSnapHelper);

            // optional
            mAdapterBanner.registerAdapterDataObserver(mBannerIndicator.getAdapterDataObserver());
        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadTrendingMatch(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListTrendingMatch.add(new TrendingMatch(1, "England", "ENG", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-ENG@2x.png", "315/3",
                    "65 overs", "New Zealand", "NZ", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-NZC@2x.png", "0/0",
                    "", "TEST", "LIVE", "2nd Test England tour of New Zealand", "https://images.fancode.com/eyJrZXkiOiJhaWcvbWF0Y2gvdjMvNjUzNDBfQ0FTQUNBUkRTX0FQUC5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIiLCJoZWlnaHQiOjE1MCwid2lkdGgiOjQ5MiwicG9zaXRpb24iOiJ0b3AifX19", "Stumps - New Zealand elected to field"));

            mListTrendingMatch.add(new TrendingMatch(2, "India", "IND", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-IND@2x.png", "",
                    "", "Australia", "AUS", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-AUS@2x.png", "",
                    "", "TEST", "UPCOMING", "Australia tour of India", "https://www.deccanherald.com/sites/dh/files/articleimages/2022/08/17/test-match-india-rep-afp-1136908-1660734647.jpg", "Wed, 01 Mar • Match starts at 9:30 AM"));

            mListTrendingMatch.add(new TrendingMatch(2, "India", "IND", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-IND@2x.png", "",
                    "", "Australia", "AUS", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-AUS@2x.png", "",
                    "", "TEST", "UPCOMING", "Australia tour of India", "https://www.deccanherald.com/sites/dh/files/articleimages/2022/08/17/test-match-india-rep-afp-1136908-1660734647.jpg", "Wed, 01 Mar • Match starts at 9:30 AM"));


            if (mListTrendingMatch.size() > 0){
                mLayoutCurrentMatches.setVisibility(View.VISIBLE);
            }else {
                mLayoutCurrentMatches.setVisibility(View.GONE);
            }

            mRecyclerViewCurrentMatches.setHasFixedSize(true);
            mRecyclerViewCurrentMatches.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewCurrentMatches.setLayoutManager(mLinearLayoutManagerTrendingMatch);
            mRecyclerViewCurrentMatches.setAdapter(mAdapterTrendingMatch);
            mRecyclerViewCurrentMatches.setNestedScrollingEnabled(false);

            mRecyclerViewCurrentMatches.smoothScrollToPosition(1);
        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadFeaturedVideo(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListFeaturedVideo.add(new Video(1, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/2524df78-efcf-4624-a291-5c857f7327d2/icc-wwc-23-match-highlight-1e4fda69-d66b-42b8-ae7c-a66db0a3d48e.png?width=267&height=150", "Brits brilliance inspires South Africa | POTM Highlights | Women's T20WC 2023", "3:59", "10 mins ago"));
            mListFeaturedVideo.add(new Video(2, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/aea5f2c4-cee5-4ed4-b1ab-3a78537818cc/match-hls-1-.png?width=267&height=150", "Highlights as South Africa reach first-ever World Cup final | ENG v SA | Women's T20WC 2023", "5:17", "15 mins ago"));
            mListFeaturedVideo.add(new Video(3, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/ff91e1c0-83f7-42c4-89e0-8b9baaa2ffca/obLSz7q8.jpg?width=267&height=150", "Extra Cover: Australia v India | Women's T20WC Semi-Final 1", "11:58", "17 mins ago"));
            mListFeaturedVideo.add(new Video(4, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/1d5e872a-1d75-459b-9c8c-ebd3ff082cde/LwrLW1YX.jpg?width=267&height=150", "Springbok captain Siya Kolisi on supporting women's cricket | Women's T20WC 2023", "1:26", "35 mins ago"));

            if (mListFeaturedVideo.size() > 0){
                mLayoutFeaturedVideo.setVisibility(View.VISIBLE);
            }else {
                mLayoutFeaturedVideo.setVisibility(View.GONE);
            }

            mRecyclerViewFeaturedVideo.setHasFixedSize(true);
            mRecyclerViewFeaturedVideo.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewFeaturedVideo.setLayoutManager(mLinearLayoutManagerFeaturedVideo);
            mRecyclerViewFeaturedVideo.setAdapter(mAdapterFeaturedVideo);
            mRecyclerViewFeaturedVideo.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadTopNews(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListTopNews.add(new News(1, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/754a504a-a8e3-4499-9b11-00f8880d698d/GettyImages-1469216034.jpg?width=880&height=495", "Catches win matches: SA hero Tazmin Brits talks brilliant fielding and fears over broken bones", "Rarely has the old adage that ‘catches win matches’ been proven as right as in Friday’s semi-final between South Africa and England.", "Women's T20 World Cup", "23 Feb, 2023 6:00 PM"));
            mListTopNews.add(new News(2, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/cc4ccfed-c82c-494d-ae1f-7c53abf3804d/GettyImages-1469210607.jpg?width=880&height=495", "The end of the hoodoo! South Africa finally win a senior World Cup semi-final", "At the twelfth time of asking, South Africa have banished the painful memories of the past to finally win a semi-final at a senior-level ICC World Cup.", "Women's T20 World Cup", "24 Feb, 2023 6:00 PM"));
            mListTopNews.add(new News(3, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/c8337688-e6fe-42ab-b0a8-3f1603320eb7/GettyImages-1241988466.jpg?width=880&height=495", "Sri Lanka announce 17-member Test squad for tour of New Zealand", "Dimuth Karunaratne will lead Sri Lanka in a two-Test series in New Zealand which is all set to begin on March 9.", "Women's T20 World Cup", "25 Feb, 2023 6:00 PM"));
            mListTopNews.add(new News(4, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/20/70120e46-c89f-4eba-8d76-f8d21698f959/Mithali-Raj.png?width=880&height=495", "Mithali commends advancement in women’s cricket", "India legend Mithali Raj appreciated the rise of multi-dimensional cricketers, increased use of pace options, and narrowing of the gap between sides as seen in the ICC Women’s T20 World Cup 2023.", "Women's T20 World Cup", "26 Feb, 2023 6:00 PM"));

            if (mListTopNews.size() > 0){
                mLayoutTopNews.setVisibility(View.VISIBLE);
            }else {
                mLayoutTopNews.setVisibility(View.GONE);
            }

            mRecyclerViewTopNews.setHasFixedSize(true);
            mRecyclerViewTopNews.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewTopNews.setLayoutManager(mLinearLayoutManagerTopNews);
            mRecyclerViewTopNews.setAdapter(mAdapterTopNews);
            mRecyclerViewTopNews.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.coinLayoutButton:
                if (CONFIG.sharedPreferences.getBoolean(CONFIG.islogin, false)){
                    Toast.makeText(getActivity(), "This Page will appear soon!", Toast.LENGTH_SHORT).show();
                }else {
                    startActivity(new Intent(getActivity(), ActivityPhoneNumber.class));
                }
                break;
        }
    }
}