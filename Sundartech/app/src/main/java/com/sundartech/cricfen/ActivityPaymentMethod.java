package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.app.Dialog;
import android.content.Intent;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.InternetBanking;
import com.sundartech.cricfen.model.StadiumXMatch;
import com.sundartech.cricfen.model.UPI;
import com.sundartech.cricfen.model.Wallet;
import com.sundartech.cricfen.sqlitedatabase.SQLiteDB;
import com.sundartech.cricfen.utils.InternetConnection;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ActivityPaymentMethod extends AppCompatActivity implements View.OnClickListener{

    private ImageView mBackButton;

    private TextView mTextViewAmount;

    private LinearLayout mLayoutUPIs, mLayoutCards, mLayoutWallets, mLayoutInternetBanking;
    private RecyclerView mRecyclerViewUPIs, mRecyclerViewWallets, mRecyclerViewInternetBanking;

    private CardView mDebitCardButton, mCreditCardButton;

    private List<UPI> mListUPI;
    private AdapterUPI mAdapterUPI;

    private List<Wallet> mListWallet;
    private AdapterWallet mAdapterWallet;

    private List<InternetBanking> mListInternetBanking;
    private AdapterInternetBanking mAdapterInternetBanking;

    private GridLayoutManager mGridLayoutManagerUPIs, mGridLayoutManagerWallets, mGridLayoutManagerInternetBanking;

    private Bundle bundle;
    private int mAmount;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_payment_gateway);

        findViews();
        setViews();
    }

    private void findViews(){
        mTextViewAmount = (TextView) findViewById(R.id.textViewAmount);

        bundle = getIntent().getExtras();
        if (bundle != null){
            mAmount = bundle.getInt("AMOUNT_KEY");

            mTextViewAmount.setText("₹ " + mAmount);
        }
        mBackButton = (ImageView) findViewById(R.id.backButton);

        mLayoutUPIs = (LinearLayout) findViewById(R.id.layoutUPIs);
        mLayoutCards = (LinearLayout) findViewById(R.id.layoutCards);
        mLayoutWallets = (LinearLayout) findViewById(R.id.layoutWallets);
        mLayoutInternetBanking = (LinearLayout) findViewById(R.id.layoutInternetBanking);

        mRecyclerViewUPIs = (RecyclerView) findViewById(R.id.recyclerViewUPIs);
        mRecyclerViewWallets = (RecyclerView) findViewById(R.id.recyclerViewWallets);
        mRecyclerViewInternetBanking = (RecyclerView) findViewById(R.id.recyclerViewInternetBanking);

        mDebitCardButton = (CardView) findViewById(R.id.debitCardButton);
        mCreditCardButton = (CardView) findViewById(R.id.creditCardButton);

        mListUPI = new ArrayList<>();
        mAdapterUPI = new AdapterUPI(ActivityPaymentMethod.this, mListUPI, new AdapterUPI.OnClickListener() {
            @Override
            public void onClick() {
                openInitiateDialog();
            }
        });

        mListWallet = new ArrayList<>();
        mAdapterWallet = new AdapterWallet(ActivityPaymentMethod.this, mListWallet, new AdapterWallet.OnClickListener() {
            @Override
            public void onClick() {
                openInitiateDialog();
            }
        });

        mListInternetBanking = new ArrayList<>();
        mAdapterInternetBanking = new AdapterInternetBanking(ActivityPaymentMethod.this, mListInternetBanking, new AdapterInternetBanking.OnClickListener() {
            @Override
            public void onClick() {
                openInitiateDialog();
            }
        });

        mGridLayoutManagerUPIs = new GridLayoutManager(ActivityPaymentMethod.this, 4);
        mGridLayoutManagerWallets = new GridLayoutManager(ActivityPaymentMethod.this, 4);
        mGridLayoutManagerInternetBanking = new GridLayoutManager(ActivityPaymentMethod.this, 4);
    }

    private void setViews(){
        loadUPIs();
        loadWallets();
        loadInternetBanking();

        mBackButton.setOnClickListener(this);
        mDebitCardButton.setOnClickListener(this);
        mCreditCardButton.setOnClickListener(this);
    }

    private void loadUPIs(){
        if (InternetConnection.isNetworkConnected(ActivityPaymentMethod.this)) {

            mListUPI.add(new UPI(1, R.drawable.ic_phone_pe, "PhonePe", "8757210196@ybl"));
            mListUPI.add(new UPI(2, R.drawable.ic_gpay, "Gpay", "8757210196@ybl"));
            mListUPI.add(new UPI(3, R.drawable.ic_paytm, "Paytm", "8757210196@ybl"));
            mListUPI.add(new UPI(4, R.drawable.ic_add, "Others", "8757210196@ybl"));

            if (mListUPI.size() > 0){
                mLayoutUPIs.setVisibility(View.VISIBLE);
            }else {
                mLayoutUPIs.setVisibility(View.GONE);
            }

            mRecyclerViewUPIs.setHasFixedSize(true);
            mRecyclerViewUPIs.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewUPIs.setLayoutManager(mGridLayoutManagerUPIs);
            mRecyclerViewUPIs.setAdapter(mAdapterUPI);
            mRecyclerViewUPIs.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(ActivityPaymentMethod.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadWallets(){
        if (InternetConnection.isNetworkConnected(ActivityPaymentMethod.this)) {

            mListWallet.add(new Wallet(1, R.drawable.ic_paypal, "PayPal"));

            if (mListWallet.size() > 0){
                mLayoutWallets.setVisibility(View.VISIBLE);
            }else {
                mLayoutWallets.setVisibility(View.GONE);
            }

            mRecyclerViewWallets.setHasFixedSize(true);
            mRecyclerViewWallets.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewWallets.setLayoutManager(mGridLayoutManagerWallets);
            mRecyclerViewWallets.setAdapter(mAdapterWallet);
            mRecyclerViewWallets.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(ActivityPaymentMethod.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void loadInternetBanking(){
        if (InternetConnection.isNetworkConnected(ActivityPaymentMethod.this)) {

            mListInternetBanking.add(new InternetBanking(1, R.drawable.ic_kotak, "Kotak", ""));
            mListInternetBanking.add(new InternetBanking(2, R.drawable.ic_sbi, "SBI", ""));
            mListInternetBanking.add(new InternetBanking(3, R.drawable.ic_icici, "ICICI", ""));
            mListInternetBanking.add(new InternetBanking(4, R.drawable.ic_hdfc, "HDFC", ""));
            mListInternetBanking.add(new InternetBanking(5, R.drawable.ic_idfc, "IDFC", ""));
            mListInternetBanking.add(new InternetBanking(6, R.drawable.ic_union, "Union", ""));
            mListInternetBanking.add(new InternetBanking(7, R.drawable.ic_canera, "Canera", ""));
            mListInternetBanking.add(new InternetBanking(8, R.drawable.ic_add, "Others", ""));

            if (mListInternetBanking.size() > 0){
                mLayoutInternetBanking.setVisibility(View.VISIBLE);
            }else {
                mLayoutInternetBanking.setVisibility(View.GONE);
            }

            mRecyclerViewInternetBanking.setHasFixedSize(true);
            mRecyclerViewInternetBanking.setItemAnimator(new DefaultItemAnimator());
            mRecyclerViewInternetBanking.setLayoutManager(mGridLayoutManagerInternetBanking);
            mRecyclerViewInternetBanking.setAdapter(mAdapterInternetBanking);
            mRecyclerViewInternetBanking.setNestedScrollingEnabled(false);
        }else {
            Toast.makeText(ActivityPaymentMethod.this, "Internet Connection Not Available", Toast.LENGTH_SHORT).show();
        }
    }

    private void openInitiateDialog(){
        Dialog dDialog = new Dialog(ActivityPaymentMethod.this, R.style.FullScreenDialogStyle);
        dDialog.setContentView(R.layout.dialog_initiate);

        TextView mTextViewCountDown = dDialog.findViewById(R.id.textViewCountDown);

        new CountDownTimer(5000, 1000) {
            @SuppressLint("SetTextI18n")
            @Override
            public void onTick(long l) {
                mTextViewCountDown.setText("Don't close app, Redirect within " + l/1000 + " seconds!" );
            }

            @SuppressLint("UseCompatLoadingForDrawables")
            @Override
            public void onFinish() {
                dDialog.cancel();
                openSuccessDialog();
            }
        }.start();

        dDialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        dDialog.show();
    }

    private void openSuccessDialog(){
        Dialog dDialog = new Dialog(ActivityPaymentMethod.this, R.style.FullScreenDialogStyle);
        dDialog.setContentView(R.layout.dialog_success);

        TextView mTextViewCountDown = dDialog.findViewById(R.id.textViewCountDown);

        new CountDownTimer(5000, 1000) {
            @SuppressLint("SetTextI18n")
            @Override
            public void onTick(long l) {
                mTextViewCountDown.setText("Don't close app, Redirect within " + l/1000 + " seconds!" );
            }

            @SuppressLint("UseCompatLoadingForDrawables")
            @Override
            public void onFinish() {
                dDialog.cancel();
                CONFIG.setMoney(mAmount);
                SQLiteDB.addToTransactionMoneyHistory(ActivityPaymentMethod.this, "INR Added to wallet", "success",
                        "2 Feb, 2023", String.valueOf(mAmount), "credit");

                finish();
            }
        }.start();

        dDialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        dDialog.show();
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                onBackPressed();
                break;
            case R.id.debitCardButton:
                Toast.makeText(this, "Please Try other payment method!", Toast.LENGTH_SHORT).show();
                break;
            case R.id.creditCardButton:
                Toast.makeText(this, "Please Try other payment method!", Toast.LENGTH_SHORT).show();
                break;
        }
    }
}
