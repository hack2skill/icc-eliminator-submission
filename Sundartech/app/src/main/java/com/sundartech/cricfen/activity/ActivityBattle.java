package com.sundartech.cricfen.activity;

import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.adapter.AdapterBanner;
import com.sundartech.cricfen.model.Banner;
import com.sundartech.cricfen.utils.InternetConnection;
import com.sundartech.cricfen.R;

import java.util.ArrayList;
import java.util.List;

public class ActivityBattle extends AppCompatActivity {

    private LinearLayout mLayoutBanner;
    private RecyclerView mRecyclerViewBanner;

    private AdapterBanner mAdapterBanner;
    private List<Banner> mListBanner;

    private LinearLayoutManager mLinearLayoutManagerBanner;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_battle);

        mLayoutBanner = (LinearLayout) findViewById(R.id.layoutBanner);

        mRecyclerViewBanner = (RecyclerView) findViewById(R.id.recyclerViewBanner);

        mListBanner = new ArrayList<>();
        mAdapterBanner = new AdapterBanner(ActivityBattle.this, mListBanner);

        mLinearLayoutManagerBanner = new LinearLayoutManager(ActivityBattle.this, LinearLayoutManager.HORIZONTAL, false);

        loadBanner();
    }

    private void loadBanner(){
        if (InternetConnection.isNetworkConnected(ActivityBattle.this)) {

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
        }else {
            Toast.makeText(ActivityBattle.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }
}
