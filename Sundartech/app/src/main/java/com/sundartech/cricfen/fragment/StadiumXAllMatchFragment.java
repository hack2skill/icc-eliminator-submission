package com.sundartech.cricfen.fragment;

import android.content.Context;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.core.widget.NestedScrollView;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.listerner.ClickListenerRecyclerViewItem;
import com.sundartech.cricfen.utils.InternetConnection;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterFlowLayoutMultiSelector;
import com.sundartech.cricfen.adapter.AdapterStadiumXMatch;
import com.sundartech.cricfen.model.StadiumXMatch;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class StadiumXAllMatchFragment extends Fragment {

    private NestedScrollView mNestedScrollView;

    private LinearLayout mLayoutCategories, mLayoutMatches;
    private RecyclerView mRecyclerViewCategories, mRecyclerViewMatches;

    private List<String> mListCategorySelected;
    private AdapterFlowLayoutMultiSelector mAdapterCategory;

    private List<StadiumXMatch> mListStadiumXMatch;
    private AdapterStadiumXMatch mAdapterStadiumXMatch;

    private LinearLayoutManager mLinearLayoutManagerCategories, mLinearLayoutManagerStadiumXMatch;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public StadiumXAllMatchFragment() {
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
    public static StadiumXAllMatchFragment newInstance(String param1, String param2) {
        StadiumXAllMatchFragment fragment = new StadiumXAllMatchFragment();
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
        View v = inflater.inflate(R.layout.fragment_stadiumx_matches, container, false);

        findViews(v);
        setViews();

        return v;
    }

    private void findViews(View v){
        mNestedScrollView = v.findViewById(R.id.nestedScrollView);

        mLayoutCategories = (LinearLayout) v.findViewById(R.id.layoutCategories);
        mLayoutMatches = (LinearLayout) v.findViewById(R.id.layoutMatches);
        mRecyclerViewCategories = (RecyclerView) v.findViewById(R.id.recyclerViewCategories);
        mRecyclerViewMatches = (RecyclerView) v.findViewById(R.id.recyclerViewMatches);

        mListCategorySelected = new ArrayList<>();

        mListStadiumXMatch = new ArrayList<>();
        mAdapterStadiumXMatch = new AdapterStadiumXMatch(getActivity(), mListStadiumXMatch);

        mLinearLayoutManagerCategories = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerStadiumXMatch = new LinearLayoutManager(getActivity(), LinearLayoutManager.VERTICAL, false);
    }

    private void setViews(){
        loadMatches();
        loadCategories();
    }

    private static void recyclerViewClickListener(Context mContext, RecyclerView mRecyclerView,
                                                  AdapterFlowLayoutMultiSelector mAdapterFlowLayoutMultiSelector, List<String> mList,
                                                  List<String> mListSelected, int mLimit){
        mRecyclerView.addOnItemTouchListener(new ClickListenerRecyclerViewItem(mContext, mRecyclerView, new ClickListenerRecyclerViewItem.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                multiSelect(mAdapterFlowLayoutMultiSelector, mList, mListSelected, position, mLimit);
            }

            @Override
            public void onItemLongClick(View view, int position) {
                Toast.makeText(mContext, mList.get(position), Toast.LENGTH_SHORT).show();

            }
        }));
    }

    public static void multiSelect(AdapterFlowLayoutMultiSelector mAdapterFlowLayoutMultiSelector, List<String> mList, List<String> mListSelected,
                                   int position, int mLimit) {
        if (mListSelected.contains(mList.get(position))) {
            mListSelected.remove(mList.get(position));
        } else if (mListSelected.size() == mLimit) {
            mListSelected.add(mList.get(position));
            mListSelected.remove(mListSelected.get(0));
        }else {
            mListSelected.add(mList.get(position));
        }

        refreshAdapter(mAdapterFlowLayoutMultiSelector, mList, mListSelected);
    }


    public static void refreshAdapter(AdapterFlowLayoutMultiSelector mAdapterFlowLayoutMultiSelector, List<String> mList, List<String> mListSelected) {
        mAdapterFlowLayoutMultiSelector.mListStringSelected = mListSelected;
        mAdapterFlowLayoutMultiSelector.mListString = mList;
        mAdapterFlowLayoutMultiSelector.notifyDataSetChanged();
    }

    private void loadCategories(){
        String[] mArrayCategory = {"All Matches", "Australia Tour of India", "Woman T20 World Cup"};

        List<String> mListCategory = Arrays.asList(mArrayCategory);

        mAdapterCategory = new AdapterFlowLayoutMultiSelector(getActivity(),
                mListCategory, mListCategorySelected);

        mRecyclerViewCategories.setHasFixedSize(true);
        mRecyclerViewCategories.setItemAnimator(new DefaultItemAnimator());
        mRecyclerViewCategories.setLayoutManager(mLinearLayoutManagerCategories);
        mRecyclerViewCategories.setAdapter(mAdapterCategory);
        mRecyclerViewCategories.setNestedScrollingEnabled(false);
        recyclerViewClickListener(getActivity(), mRecyclerViewCategories, mAdapterCategory, mListCategory, mListCategorySelected, 1);
    }

    private void loadMatches(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListStadiumXMatch.add(new StadiumXMatch(1, "England", "ENG", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-ENG@2x.png", "New Zealand", "NZ", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-NZC@2x.png", "LIVE", "Melbourne Cricket Stadium, Australia", "27 Feb, 2023 10:00 PM"));
            mListStadiumXMatch.add(new StadiumXMatch(2, "India", "IND", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-IND@2x.png", "Australia", "AUS", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-AUS@2x.png", "UPCOMING", "Arun Jetly Stadium, India", "10 March, 2023 10:00 AM"));
            mListStadiumXMatch.add(new StadiumXMatch(3, "England", "ENG", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-ENG@2x.png", "New Zealand", "NZ", "https://d13ir53smqqeyp.cloudfront.net/flags/cr-flags/FC-NZC@2x.png", "LIVE", "Melbourne Cricket Stadium, Australia", "27 Feb, 2023 10:00 PM"));

            if (mListStadiumXMatch.size() > 0){
                mLayoutMatches.setVisibility(View.VISIBLE);
            }else {
                mLayoutMatches.setVisibility(View.GONE);
            }

            mRecyclerViewMatches.setHasFixedSize(true);
            mRecyclerViewMatches.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewMatches.setLayoutManager(mLinearLayoutManagerStadiumXMatch);
            mRecyclerViewMatches.setAdapter(mAdapterStadiumXMatch);
            mRecyclerViewMatches.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }
}