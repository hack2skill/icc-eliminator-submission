package com.sundartech.cricfen.fragment;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.PagerSnapHelper;
import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.StaggeredGridLayoutManager;

import com.sundartech.cricfen.utils.HelperClass;
import com.sundartech.cricfen.utils.InternetConnection;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterBanner;
import com.sundartech.cricfen.adapter.AdapterCategory;
import com.sundartech.cricfen.adapter.AdapterProduct;
import com.sundartech.cricfen.adapter.AdapterTeam;
import com.sundartech.cricfen.model.Banner;
import com.sundartech.cricfen.model.Category;
import com.sundartech.cricfen.model.Product;
import com.sundartech.cricfen.model.Team;

import java.util.ArrayList;
import java.util.List;

import me.relex.circleindicator.CircleIndicator2;

public class FragmentShop extends Fragment implements View.OnClickListener{

    private LinearLayout mLayoutBanner, mLayoutTopCategory, mLayoutTrendingProducts, mLayoutTshirts, mLayoutShopByTeam,
            mLayoutBottomWear, mLayoutTeamEssentials;
    private RecyclerView mRecyclerViewBanner, mRecyclerViewTopCategory, mRecyclerViewTrendingProducts,
            mRecyclerViewTshirts, mRecyclerViewShopByTeam, mRecyclerViewBottomWear, mRecyclerViewTeamEssentials;
    private CircleIndicator2 mBannerIndicator;

    private ImageView mLoadMoreCategoryButton, mLoadMoreTeamEssentialsButton;

    private AdapterBanner mAdapterBanner;
    private List<Banner> mListBanner;

    private AdapterCategory mAdapterTopCategory;
    private List<Category> mListTopCategory;

    private AdapterProduct mAdapterTrendingProduct;
    private List<Product> mListTrendingProduct;

    private AdapterProduct mAdapterTshirts;
    private List<Product> mListTshirts;

    private AdapterTeam mAdapterTeam;
    private List<Team> mListTeam;

    private AdapterProduct mAdapterBottomWear;
    private List<Product> mListBottomWear;

    private AdapterProduct mAdapterTeamEssentials;
    private List<Product> mListTeamEssentials;

    private LinearLayoutManager mLinearLayoutManagerBanner, mLinearLayoutManagerTopCategory, mLinearLayoutManagerTrendingProducts,
            mLinearLayoutManagerTshirts, mLinearLayoutManagerBottomWear;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public FragmentShop() {
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
    public static FragmentShop newInstance(String param1, String param2) {
        FragmentShop fragment = new FragmentShop();
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
        View v = inflater.inflate(R.layout.fragment_shop, container, false);

        findViews(v);
        setUpViews();

        return v;
    }

    private void findViews(View v) {
        mLayoutBanner = (LinearLayout) v.findViewById(R.id.layoutBanner);
        mLayoutTopCategory = (LinearLayout) v.findViewById(R.id.layoutTopCategories);
        mLayoutTrendingProducts = (LinearLayout) v.findViewById(R.id.layoutTrendingProducts);
        mLayoutTshirts = (LinearLayout) v.findViewById(R.id.layoutTshirts);
        mLayoutShopByTeam = (LinearLayout) v.findViewById(R.id.layoutShopByTeam);
        mLayoutBottomWear = (LinearLayout) v.findViewById(R.id.layoutBottomWear);
        mLayoutTeamEssentials = (LinearLayout) v.findViewById(R.id.layoutTeamEssential);

        mRecyclerViewBanner = (RecyclerView) v.findViewById(R.id.recyclerViewBanner);
        mRecyclerViewTopCategory = (RecyclerView) v.findViewById(R.id.recyclerViewTopCategories);
        mRecyclerViewTrendingProducts = (RecyclerView) v.findViewById(R.id.recyclerViewTrendingProducts);
        mRecyclerViewTshirts = (RecyclerView) v.findViewById(R.id.recyclerViewTshirts);
        mRecyclerViewShopByTeam = (RecyclerView) v.findViewById(R.id.recyclerViewShopByTeam);
        mRecyclerViewBottomWear = (RecyclerView) v.findViewById(R.id.recyclerViewBottomWear);
        mRecyclerViewTeamEssentials = (RecyclerView) v.findViewById(R.id.recyclerViewTeamEssentials);

        mBannerIndicator = v.findViewById(R.id.indicator);

        mLoadMoreCategoryButton = (ImageView) v.findViewById(R.id.loadMoreCategoriesButton);
        mLoadMoreTeamEssentialsButton = (ImageView) v.findViewById(R.id.loadMoreTeamEssentialsButton);

        mListBanner = new ArrayList<>();
        mAdapterBanner = new AdapterBanner(getActivity(), mListBanner);

        mListTopCategory = new ArrayList<>();
        mAdapterTopCategory = new AdapterCategory(getActivity(), mListTopCategory);

        mListTrendingProduct = HelperClass.getTrendingProducts(getActivity());
        mAdapterTrendingProduct = new AdapterProduct(getActivity(), mListTrendingProduct);

        mListTshirts = HelperClass.getProducts(getActivity(), "t-shirt", "category");
        mAdapterTshirts = new AdapterProduct(getActivity(), mListTshirts);

        mListTeam = new ArrayList<>();
        mAdapterTeam = new AdapterTeam(getActivity(), mListTeam);

        mListBottomWear = HelperClass.getProducts(getActivity(), "bottomwear", "category");
        mAdapterBottomWear = new AdapterProduct(getActivity(), mListBottomWear);

        mListTeamEssentials = HelperClass.getProducts(getActivity(), "india", "brand");
        mAdapterTeamEssentials = new AdapterProduct(getActivity(), mListTeamEssentials);

        mLinearLayoutManagerBanner = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerTopCategory = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerTrendingProducts = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerTshirts = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
        mLinearLayoutManagerBottomWear = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
    }

    private void setUpViews() {
        loadBanner();
        loadTopCategory();
        loadTrendingProducts();
        loadTshirts();
        loadShopByTeam();
        loadBottomWear();
        loadTeamEssentials();
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

    private void loadTopCategory(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListTopCategory.add(new Category(1, R.drawable.ic_tshirt, "T-shirt"));
            mListTopCategory.add(new Category(2, R.drawable.ic_cap, "Cap"));
            mListTopCategory.add(new Category(3, R.drawable.ic_cricket_ball, "Cricket Ball"));
            mListTopCategory.add(new Category(4, R.drawable.ic_jogger, "Jogger"));
            mListTopCategory.add(new Category(5, R.drawable.ic_headphone, "Accessories"));
            mListTopCategory.add(new Category(6, R.drawable.ic_tshirt, "T-shirt"));

            if (mListTopCategory.size() > 0){
                mLayoutTopCategory.setVisibility(View.VISIBLE);
            }else {
                mLayoutTopCategory.setVisibility(View.GONE);
            }

            mRecyclerViewTopCategory.setHasFixedSize(true);
            mRecyclerViewTopCategory.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewTopCategory.setLayoutManager(mLinearLayoutManagerTopCategory);
            mRecyclerViewTopCategory.setAdapter(mAdapterTopCategory);
            mRecyclerViewTopCategory.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadTrendingProducts(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            if (mListTrendingProduct.size() > 0){
                mLayoutTrendingProducts.setVisibility(View.VISIBLE);
            }else {
                mLayoutTrendingProducts.setVisibility(View.GONE);
            }

            mRecyclerViewTrendingProducts.setHasFixedSize(true);
            mRecyclerViewTrendingProducts.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewTrendingProducts.setLayoutManager(mLinearLayoutManagerTrendingProducts);
            mRecyclerViewTrendingProducts.setAdapter(mAdapterTrendingProduct);
            mRecyclerViewTrendingProducts.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadTshirts(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            if (mListTshirts.size() > 0){
                mLayoutTshirts.setVisibility(View.VISIBLE);
            }else {
                mLayoutTshirts.setVisibility(View.GONE);
            }

            mRecyclerViewTshirts.setHasFixedSize(true);
            mRecyclerViewTshirts.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewTshirts.setLayoutManager(mLinearLayoutManagerTshirts);
            mRecyclerViewTshirts.setAdapter(mAdapterTshirts);
            mRecyclerViewTshirts.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadShopByTeam(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListTeam.add(new Team(1, R.drawable.ic_ind, "India"));
            mListTeam.add(new Team(2, R.drawable.ic_aus, "Australia"));
            mListTeam.add(new Team(3, R.drawable.ic_pak, "Pakistan"));
            mListTeam.add(new Team(4, R.drawable.ic_ban, "Bangladesh"));
            mListTeam.add(new Team(5, R.drawable.ic_wi, "West Indies"));
            mListTeam.add(new Team(6, R.drawable.ic_nz, "New Zealand"));
            mListTeam.add(new Team(7, R.drawable.ic_ire, "Ireland"));
            mListTeam.add(new Team(8, R.drawable.ic_sl, "Sri Lanka"));
            mListTeam.add(new Team(9, R.drawable.ic_rsa, "South Africa"));
            mListTeam.add(new Team(10, R.drawable.ic_eng, "England"));

            if (mListTeam.size() > 0){
                mLayoutShopByTeam.setVisibility(View.VISIBLE);
            }else {
                mLayoutShopByTeam.setVisibility(View.GONE);
            }

            StaggeredGridLayoutManager staggeredGridLayoutManager = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.HORIZONTAL);

            mRecyclerViewShopByTeam.setHasFixedSize(true);
            mRecyclerViewShopByTeam.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewShopByTeam.setLayoutManager(staggeredGridLayoutManager);
            mRecyclerViewShopByTeam.setAdapter(mAdapterTeam);
            mRecyclerViewShopByTeam.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadBottomWear(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            if (mListBottomWear.size() > 0){
                mLayoutBottomWear.setVisibility(View.VISIBLE);
            }else {
                mLayoutBottomWear.setVisibility(View.GONE);
            }

            mRecyclerViewBottomWear.setHasFixedSize(true);
            mRecyclerViewBottomWear.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewBottomWear.setLayoutManager(mLinearLayoutManagerBottomWear);
            mRecyclerViewBottomWear.setAdapter(mAdapterBottomWear);
            mRecyclerViewBottomWear.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadTeamEssentials(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            if (mListTeamEssentials.size() > 0){
                mLayoutTeamEssentials.setVisibility(View.VISIBLE);
            }else {
                mLayoutTeamEssentials.setVisibility(View.GONE);
            }

            StaggeredGridLayoutManager staggeredGridLayoutManager = new StaggeredGridLayoutManager(2, StaggeredGridLayoutManager.HORIZONTAL);

            mRecyclerViewTeamEssentials.setHasFixedSize(true);
            mRecyclerViewTeamEssentials.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewTeamEssentials.setLayoutManager(staggeredGridLayoutManager);
            mRecyclerViewTeamEssentials.setAdapter(mAdapterTeamEssentials);
            mRecyclerViewTeamEssentials.setNestedScrollingEnabled(false);

        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        Intent intent;
        switch (mId){

        }
    }
}