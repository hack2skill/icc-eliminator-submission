package com.sundartech.cricfen;

import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.adapter.AdapterVideo;
import com.sundartech.cricfen.model.Video;
import com.sundartech.cricfen.utils.InternetConnection;

import java.util.ArrayList;
import java.util.List;

public class ActivityVideoDetails extends AppCompatActivity implements CustomVideoPlayer.PlaybackListener {

    private CustomVideoPlayer mCustomVideoPlayer;

    private LinearLayout mLayoutRelatedVideos;
    private RecyclerView mRecyclerViewRelatedVideos;

    private List<Video> mListRelatedVideo;
    private AdapterVideo mAdapterRelatedVideo;

    private LinearLayoutManager mLinearLayoutManagerRelatedVideos;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video_details);

        findViews();
        setViews();
    }

    private void findViews(){
        mCustomVideoPlayer = (CustomVideoPlayer) findViewById(R.id.customVideoPlayer);

        mLayoutRelatedVideos = (LinearLayout) findViewById(R.id.layoutRelatedVideos);
        mRecyclerViewRelatedVideos = (RecyclerView) findViewById(R.id.recyclerViewRelatedVideos);

        mListRelatedVideo = new ArrayList<>();
        mAdapterRelatedVideo = new AdapterVideo(ActivityVideoDetails.this, mListRelatedVideo, R.layout.item_related_video);

        mLinearLayoutManagerRelatedVideos = new LinearLayoutManager(ActivityVideoDetails.this, LinearLayoutManager.VERTICAL, false);
    }

    private void setViews(){
        mCustomVideoPlayer.setMediaUrl("https://www.rmp-streaming.com/media/bbb-360p.mp4")
                .enableAutoMute(false)
                .enableAutoPlay(true)
                .hideControllers(false)
                .setOnPlaybackListener(this)
                .build();

        loadRelatedVideos();
    }

    private void loadRelatedVideos(){
        if (InternetConnection.isNetworkConnected(ActivityVideoDetails.this)) {

            mListRelatedVideo.add(new Video(1, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/2524df78-efcf-4624-a291-5c857f7327d2/icc-wwc-23-match-highlight-1e4fda69-d66b-42b8-ae7c-a66db0a3d48e.png?width=267&height=150", "Brits brilliance inspires South Africa | POTM Highlights | Women's T20WC 2023", "3:59", "10 mins ago"));
            mListRelatedVideo.add(new Video(2, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/aea5f2c4-cee5-4ed4-b1ab-3a78537818cc/match-hls-1-.png?width=267&height=150", "Highlights as South Africa reach first-ever World Cup final | ENG v SA | Women's T20WC 2023", "5:17", "15 mins ago"));
            mListRelatedVideo.add(new Video(3, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/ff91e1c0-83f7-42c4-89e0-8b9baaa2ffca/obLSz7q8.jpg?width=267&height=150", "Extra Cover: Australia v India | Women's T20WC Semi-Final 1", "11:58", "17 mins ago"));
            mListRelatedVideo.add(new Video(4, "https://resources.pulse.icc-cricket.com/photo-resources/2023/02/24/1d5e872a-1d75-459b-9c8c-ebd3ff082cde/LwrLW1YX.jpg?width=267&height=150", "Springbok captain Siya Kolisi on supporting women's cricket | Women's T20WC 2023", "1:26", "35 mins ago"));

            if (mListRelatedVideo.size() > 0){
                mLayoutRelatedVideos.setVisibility(View.VISIBLE);
            }else {
                mLayoutRelatedVideos.setVisibility(View.GONE);
            }

            mRecyclerViewRelatedVideos.setHasFixedSize(true);
            mRecyclerViewRelatedVideos.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewRelatedVideos.setLayoutManager(mLinearLayoutManagerRelatedVideos);
            mRecyclerViewRelatedVideos.setAdapter(mAdapterRelatedVideo);
            mRecyclerViewRelatedVideos.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(ActivityVideoDetails.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onVolumeChange(boolean volumeOn) {

    }

    @Override
    public void onPlayEvent() {

    }

    @Override
    public void onPauseEvent() {

    }

    @Override
    public void onCompletedEvent() {

    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        mCustomVideoPlayer.pause();
    }
}
