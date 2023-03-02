package com.sundartech.cricfen.fragment;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.Color;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentStatePagerAdapter;
import androidx.viewpager.widget.ViewPager;

import com.google.android.material.tabs.TabLayout;
import com.sundartech.autoimageslider.IndicatorView.animation.type.IndicatorAnimationType;
import com.sundartech.autoimageslider.SliderAnimations;
import com.sundartech.autoimageslider.SliderView;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterSlider;

public class FragmentStadiumX extends Fragment implements View.OnClickListener{

    private SliderView mSliderView;
    private AdapterSlider mAdapterSlider;

    private TabLayout mTabLayout;
    private ViewPager mViewPager;
    private AdapterViewPager mAdapter;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public FragmentStadiumX() {
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
    public static FragmentStadiumX newInstance(String param1, String param2) {
        FragmentStadiumX fragment = new FragmentStadiumX();
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
        View v = inflater.inflate(R.layout.fragment_stadiumx, container, false);

        findViews(v);
        setUpViews();

        return v;
    }

    private void findViews(View v) {
        mSliderView = v.findViewById(R.id.imageSlider);

        mTabLayout = v.findViewById(R.id.tabLayout);
        mViewPager = v.findViewById(R.id.viewPager);

        mAdapterSlider = new AdapterSlider(getActivity(), R.layout.item_slider);
    }

    private void setUpViews() {
        loadSlider();

        loadPageView();
    }

    private void loadSlider(){
        mSliderView.setSliderAdapter(mAdapterSlider);

        mSliderView.setIndicatorAnimation(IndicatorAnimationType.WORM); //set indicator animation by using IndicatorAnimationType. :WORM or THIN_WORM or COLOR or DROP or FILL or NONE or SCALE or SCALE_DOWN or SLIDE and SWAP!!
        mSliderView.setSliderTransformAnimation(SliderAnimations.SIMPLETRANSFORMATION);
        mSliderView.setAutoCycleDirection(SliderView.AUTO_CYCLE_DIRECTION_BACK_AND_FORTH);
        mSliderView.setIndicatorSelectedColor(Color.WHITE);
        mSliderView.setIndicatorUnselectedColor(Color.GRAY);
        mSliderView.setScrollTimeInSec(4); //set scroll delay in seconds :
        mSliderView.startAutoCycle();

        mAdapterSlider.addItem("https://images.fancode.com/eyJrZXkiOiJza2lsbHVwLXVwbG9hZHMvcHJvZC1pbWFnZXMvMjAyMy8wMi9JQ0Nfd29tZW5zX29wNC5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIiLCJ3aWR0aCI6MjMzMiwiaGVpZ2h0Ijo4NTB9fSwib3V0cHV0Rm9ybWF0Ijoid2VicCJ9");
        mAdapterSlider.addItem("https://images.fancode.com/eyJrZXkiOiJza2lsbHVwLXVwbG9hZHMvcHJvZC1pbWFnZXMvMjAyMy8wMi9JQ0Nfd29tZW5zX29wNC5wbmciLCJlZGl0cyI6eyJyZXNpemUiOnsiZml0IjoiY292ZXIiLCJ3aWR0aCI6MjMzMiwiaGVpZ2h0Ijo4NTB9fSwib3V0cHV0Rm9ybWF0Ijoid2VicCJ9");

    }

    private void loadPageView(){
        mAdapter = new AdapterViewPager(getActivity().getSupportFragmentManager());
        mViewPager.setOffscreenPageLimit(mAdapter.getCount());
        mViewPager.setAdapter(mAdapter);
        mViewPager.setOffscreenPageLimit(2);
        mTabLayout.setupWithViewPager(mViewPager);
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        Intent intent;
        switch (mId){

        }
    }

    private class AdapterViewPager extends FragmentStatePagerAdapter {

        String[] tabArray = {"Book Tickets", "Food & Beverage"};

        AdapterViewPager(FragmentManager fragmentManager) {
            super(fragmentManager, BEHAVIOR_RESUME_ONLY_CURRENT_FRAGMENT);
        }

        @NonNull
        @Override
        public Fragment getItem(int position) {
            if (position == 0) {
                return new StadiumXAllMatchFragment();
            }else {
                return new StadiumXFoodFragment();
            }
        }

        @Override
        public int getCount() {
            return tabArray.length;
        }

        @Override
        public CharSequence getPageTitle(int position) {
            return tabArray[position];
        }
    }
}