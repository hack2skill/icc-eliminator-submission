package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffColorFilter;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;

public class ActivityAddMoney extends AppCompatActivity implements View.OnClickListener{

    private ImageView mBackButton;
    private TextView mTextViewCurrentBalance, mAddMoneyButton500, mAddMoneyButton1000, mAddMoneyButton2000,
            mAddMoneyButton5000, mTextViewStatus, mAddMoneyButton;
    private EditText mEditTextAmount;

    private int mAmount = 500;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_money);

        findViews();
        setViews();
    }

    private void findViews(){
        mBackButton = (ImageView) findViewById(R.id.backButton);

        mTextViewCurrentBalance = (TextView) findViewById(R.id.textViewCurrentBalance);
        mAddMoneyButton500 = (TextView) findViewById(R.id.addMoneyButton500);
        mAddMoneyButton1000 = (TextView) findViewById(R.id.addMoneyButton1000);
        mAddMoneyButton2000 = (TextView) findViewById(R.id.addMoneyButton2000);
        mAddMoneyButton5000 = (TextView) findViewById(R.id.addMoneyButton5000);
        mTextViewStatus = (TextView) findViewById(R.id.textViewStatus);
        mAddMoneyButton = (TextView) findViewById(R.id.addMoneyButton);

        mEditTextAmount = (EditText) findViewById(R.id.editTextAmount);
    }

    private void setViews(){
        mBackButton.setOnClickListener(this);
        mAddMoneyButton500.setOnClickListener(this);
        mAddMoneyButton1000.setOnClickListener(this);
        mAddMoneyButton2000.setOnClickListener(this);
        mAddMoneyButton5000.setOnClickListener(this);
        mAddMoneyButton.setOnClickListener(this);

        mEditTextAmount.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @SuppressLint("SetTextI18n")
            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {

            }

            @Override
            public void afterTextChanged(Editable s) {
                if (!s.toString().equals("")){
                    if (Integer.parseInt(s.toString()) > 100 && Integer.parseInt(s.toString()) < 100000){
                        mAmount = Integer.parseInt(s.toString());
                        mTextViewStatus.setCompoundDrawables(getDrawable(R.drawable.ic_baseline_check_circle_24), null, null, null);
                        setTextViewDrawableColor(mTextViewStatus, R.color.green_500);
                    }else {
                        mTextViewStatus.setCompoundDrawables(getDrawable(R.drawable.ic_baseline_cancel_24), null, null, null);
                        setTextViewDrawableColor(mTextViewStatus, R.color.red_500);
                    }

                    mTextViewStatus.setText("Adding " + s + " in wallet!");
                }
            }
        });
    }

    private void setTextViewDrawableColor(TextView textView, int color) {
        for (Drawable drawable : textView.getCompoundDrawables()) {
            if (drawable != null) {
                drawable.setColorFilter(new PorterDuffColorFilter(ContextCompat.getColor(textView.getContext(), color), PorterDuff.Mode.SRC_IN));
            }
        }
    }

    @SuppressLint("SetTextI18n")
    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                onBackPressed();
                break;
            case R.id.addMoneyButton500:
                mAmount = mAmount + 500;
                mEditTextAmount.setText("" + mAmount);
                break;
            case R.id.addMoneyButton1000:
                mAmount = mAmount + 1000;
                mEditTextAmount.setText("" + mAmount);
                break;
            case R.id.addMoneyButton2000:
                mAmount = mAmount + 2000;
                mEditTextAmount.setText("" + mAmount);
                break;
            case R.id.addMoneyButton5000:
                mAmount = mAmount + 5000;
                mEditTextAmount.setText("" + mAmount);
                break;
            case R.id.addMoneyButton:
                Intent intent = new Intent(ActivityAddMoney.this, ActivityPaymentMethod.class);
                intent.putExtra("AMOUNT_KEY", mAmount);
                startActivity(intent);
                finish();
                break;
        }
    }

    @Override
    public void onResume() {
        super.onResume();
        mTextViewCurrentBalance.setText("₹" + CONFIG.sharedPreferences.getString(CONFIG.money, "0"));
    }
}
