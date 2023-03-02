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
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.listerner.ClickListenerRecyclerViewItem;
import com.sundartech.cricfen.utils.InternetConnection;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.adapter.AdapterFood;
import com.sundartech.cricfen.adapter.AdapterFoodCategory;
import com.sundartech.cricfen.model.Food;
import com.sundartech.cricfen.model.FoodCategory;

import java.util.ArrayList;
import java.util.List;

public class StadiumXFoodFragment extends Fragment {

    private NestedScrollView mNestedScrollView;

    private LinearLayout mLayoutCategories, mLayoutFoods;
    private RecyclerView mRecyclerViewCategories, mRecyclerViewFoods;

    private List<FoodCategory> mListCategorySelected;
    private AdapterFoodCategory mAdapterCategory;

    private List<Food> mListFood;
    private AdapterFood mAdapterFood;

    private LinearLayoutManager mLinearLayoutManagerCategories;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public StadiumXFoodFragment() {
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
    public static StadiumXFoodFragment newInstance(String param1, String param2) {
        StadiumXFoodFragment fragment = new StadiumXFoodFragment();
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
        View v = inflater.inflate(R.layout.fragment_stadiumx_foods, container, false);

        findViews(v);
        setViews();

        return v;
    }

    private void findViews(View v){
        mNestedScrollView = v.findViewById(R.id.nestedScrollView);

        mLayoutCategories = (LinearLayout) v.findViewById(R.id.layoutCategories);
        mLayoutFoods = (LinearLayout) v.findViewById(R.id.layoutFoods);
        mRecyclerViewCategories = (RecyclerView) v.findViewById(R.id.recyclerViewCategories);
        mRecyclerViewFoods = (RecyclerView) v.findViewById(R.id.recyclerViewFoods);

        mListCategorySelected = new ArrayList<>();

        mListFood = new ArrayList<>();
        mAdapterFood = new AdapterFood(getActivity(), mListFood);

        mLinearLayoutManagerCategories = new LinearLayoutManager(getActivity(), LinearLayoutManager.HORIZONTAL, false);
    }

    private void setViews(){
        loadCategories();
        loadFoods();
    }

    private static void recyclerViewClickListener(Context mContext, RecyclerView mRecyclerView,
                                                  AdapterFoodCategory mAdapterCategory, List<FoodCategory> mList,
                                                  List<FoodCategory> mListSelected, int mLimit){
        mRecyclerView.addOnItemTouchListener(new ClickListenerRecyclerViewItem(mContext, mRecyclerView, new ClickListenerRecyclerViewItem.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                multiSelect(mAdapterCategory, mList, mListSelected, position, mLimit);
            }

            @Override
            public void onItemLongClick(View view, int position) {
                Toast.makeText(mContext, mList.get(position).getCategoryName(), Toast.LENGTH_SHORT).show();

            }
        }));
    }

    public static void multiSelect(AdapterFoodCategory mAdapterCategory, List<FoodCategory> mList, List<FoodCategory> mListSelected,
                                   int position, int mLimit) {
        if (mListSelected.contains(mList.get(position))) {
            mListSelected.remove(mList.get(position));
        } else if (mListSelected.size() == mLimit) {
            mListSelected.add(mList.get(position));
            mListSelected.remove(mListSelected.get(0));
        }else {
            mListSelected.add(mList.get(position));
        }

        refreshAdapter(mAdapterCategory, mList, mListSelected);
    }


    public static void refreshAdapter(AdapterFoodCategory mAdapterCategory, List<FoodCategory> mList, List<FoodCategory> mListSelected) {
        mAdapterCategory.mListFoodCategorySelected = mListSelected;
        mAdapterCategory.mListFoodCategory = mList;
        mAdapterCategory.notifyDataSetChanged();
    }

    private void loadCategories(){
        List<FoodCategory> mListCategory = new ArrayList<>();
        mListCategory.add(new FoodCategory(1, R.drawable.ic_burger, "Burger"));
        mListCategory.add(new FoodCategory(2, R.drawable.ic_pizza, "Pizza"));
        mListCategory.add(new FoodCategory(3, R.drawable.ic_ice_cream, "Ice Cream"));
        mListCategory.add(new FoodCategory(4, R.drawable.ic_fruit, "Fruits"));

        mAdapterCategory = new AdapterFoodCategory(getActivity(),
                mListCategory, mListCategorySelected);

        mRecyclerViewCategories.setHasFixedSize(true);
        mRecyclerViewCategories.setItemAnimator(new DefaultItemAnimator());
        mRecyclerViewCategories.setLayoutManager(mLinearLayoutManagerCategories);
        mRecyclerViewCategories.setAdapter(mAdapterCategory);
        mRecyclerViewCategories.setNestedScrollingEnabled(false);
        recyclerViewClickListener(getActivity(), mRecyclerViewCategories, mAdapterCategory, mListCategory, mListCategorySelected, 1);
    }

    private void loadFoods(){
        if (InternetConnection.isNetworkConnected(getActivity())) {

            mListFood.add(new Food(1, "Chicken Burger", "https://www.freepnglogos.com/uploads/burger-png/burger-png-food-menu-sullivan-ice-cream-1.png", "160", "The beef burger uses 100% quality beef with sliced tomatoes, cucumbers, vegetables & onions.", "Burger", "4.5", "Cheesy Mozarella"));
            mListFood.add(new Food(2, "Veg Pizza", "https://www.transparentpng.com/thumb/pizza/kVjZlH-veggie-whole-pizza-hd-broccoli-tomato-mushroom.png", "300", "The beef burger uses 100% quality beef with sliced tomatoes, cucumbers, vegetables & onions.", "Pizza", "4.8", "Cheesy Mozarella"));
            mListFood.add(new Food(3, "Ice Cream", "https://freepngimg.com/save/25335-ice-cream-cone-transparent-image/819x1395", "79", "The beef burger uses 100% quality beef with sliced tomatoes, cucumbers, vegetables & onions.", "Ice Cream", "4.2", "Cheesy Mozarella"));
            mListFood.add(new Food(4, "French Fries", "https://assets.stickpng.com/thumbs/585abfc54f6ae202fedf2935.png", "99", "The beef burger uses 100% quality beef with sliced tomatoes, cucumbers, vegetables & onions.", "Burger", "4.5", "Cheesy Mozarella"));

            if (mListFood.size() > 0){
                mLayoutFoods.setVisibility(View.VISIBLE);
            }else {
                mLayoutFoods.setVisibility(View.GONE);
            }

            mRecyclerViewFoods.setHasFixedSize(true);
            mRecyclerViewFoods.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewFoods.setLayoutManager(new GridLayoutManager(getActivity(), 2));
            mRecyclerViewFoods.setAdapter(mAdapterFood);
            mRecyclerViewFoods.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(getActivity(), "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }
}