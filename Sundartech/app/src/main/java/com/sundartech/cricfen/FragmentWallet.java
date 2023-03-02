package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;
import android.widget.Toast;

import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.TransactionMoney;
import com.sundartech.cricfen.sqlitedatabase.SQLiteDB;

import java.util.ArrayList;
import java.util.List;

public class FragmentWallet extends Fragment implements View.OnClickListener{

    private TextView mTextViewCurrentBalance, mTextViewLockedBalance, mAddMoneyButton, mWithdrawButton;
    private RecyclerView mRecyclerViewTransactionHistory;

    private List<TransactionMoney> mListTransactionHistory;
    private AdapterTransactionMoney mAdapterTransactionMoney;
    private LinearLayoutManager mLinearLayoutManagerTransactionMoney;

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    public FragmentWallet() {
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
    public static FragmentWallet newInstance(String param1, String param2) {
        FragmentWallet fragment = new FragmentWallet();
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
        View v = inflater.inflate(R.layout.fragment_wallet, container, false);

        findViews(v);
        setViews();

        return v;
    }

    private void findViews(View v) {
        mTextViewCurrentBalance = (TextView) v.findViewById(R.id.textViewCurrentBalance);
        mTextViewLockedBalance = (TextView) v.findViewById(R.id.textViewLockedBalance);
        mAddMoneyButton = (TextView) v.findViewById(R.id.addMoneyButton);
        mWithdrawButton = (TextView) v.findViewById(R.id.withdrawButton);

        mRecyclerViewTransactionHistory = (RecyclerView) v.findViewById(R.id.recyclerViewTransactionHistory);

        mListTransactionHistory = new ArrayList<>();
        mAdapterTransactionMoney = new AdapterTransactionMoney(getActivity(), mListTransactionHistory);
        mLinearLayoutManagerTransactionMoney = new LinearLayoutManager(getActivity(), RecyclerView.VERTICAL, false);
    }

    private void setViews(){
        mAddMoneyButton.setOnClickListener(this);
        mWithdrawButton.setOnClickListener(this);

        mRecyclerViewTransactionHistory.setAdapter(mAdapterTransactionMoney);
        mRecyclerViewTransactionHistory.setLayoutManager(mLinearLayoutManagerTransactionMoney);
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                getActivity().onBackPressed();
                break;
            case R.id.addMoneyButton:
                startActivity(new Intent(getActivity(), ActivityAddMoney.class));
                break;
            case R.id.withdrawButton:
                Toast.makeText(getActivity(), "This feature will introduce soon!", Toast.LENGTH_SHORT).show();
                break;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mTextViewCurrentBalance.setText("₹" + CONFIG.sharedPreferences.getString(CONFIG.money, "0"));

        mAdapterTransactionMoney.clear();
        loadTransactionHistory();
    }

    private void loadTransactionHistory() {
        List<TransactionMoney> transactionHistoryBriefs = SQLiteDB.getTransactionMoneyHistoryBriefs(getContext());
        if (transactionHistoryBriefs.isEmpty()) {
            return;
        }else {

        }

        for (TransactionMoney transactionMoney : transactionHistoryBriefs) {
            mListTransactionHistory.add(transactionMoney);
        }
        mAdapterTransactionMoney.notifyDataSetChanged();
    }
}