package com.sundartech.cricfen;

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

import com.sundartech.cricfen.adapter.AdapterBanner;
import com.sundartech.cricfen.adapter.AdapterCategory;
import com.sundartech.cricfen.adapter.AdapterProduct;
import com.sundartech.cricfen.adapter.AdapterTeam;
import com.sundartech.cricfen.fragment.FragmentShop;
import com.sundartech.cricfen.model.Banner;
import com.sundartech.cricfen.model.Category;
import com.sundartech.cricfen.model.Product;
import com.sundartech.cricfen.model.Team;
import com.sundartech.cricfen.utils.InternetConnection;

import java.util.ArrayList;
import java.util.List;

import me.relex.circleindicator.CircleIndicator2;

public class FragmentMore extends Fragment implements View.OnClickListener{

    private LinearLayout mProfileLayoutButton;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public FragmentMore() {
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
    public static FragmentMore newInstance(String param1, String param2) {
        FragmentMore fragment = new FragmentMore();
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
        View v = inflater.inflate(R.layout.fragment_more, container, false);

        findViews(v);
        setUpViews();

        return v;
    }

    private void findViews(View v) {
        mProfileLayoutButton = (LinearLayout) v.findViewById(R.id.profileLayoutButton);
    }

    private void setUpViews() {
        mProfileLayoutButton.setOnClickListener(this);
    }

    @SuppressLint("NonConstantResourceId")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.profileLayoutButton:
                if (!CONFIG.sharedPreferences.getBoolean(CONFIG.islogin, false)){
                    startActivity(new Intent(getActivity(), ActivityPhoneNumber.class));
                }else {
                    Toast.makeText(getActivity(), "Edit Profile feature will introduce soon!", Toast.LENGTH_SHORT).show();
                }
                break;
        }
    }
}