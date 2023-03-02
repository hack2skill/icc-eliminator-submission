package com.sundartech.cricfen;

import android.content.Intent;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

public class ActivityPhoneNumber extends AppCompatActivity {

    private ImageView mBackButton;
    private EditText mEditTextPhoneNumber;
    private TextView mSendOTPButton;
    private TextView mTextViewAcceptCondition;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_phone_number);

        findViews();
        setViews();
    }

    private void findViews(){
        mBackButton = (ImageView) findViewById(R.id.backButton);
        mEditTextPhoneNumber = (EditText) findViewById(R.id.editTextPhoneNumber);
        mSendOTPButton = (TextView) findViewById(R.id.sendOTPButton);

        mTextViewAcceptCondition = (TextView) findViewById(R.id.acceptConditionText);
    }

    private void setViews(){
        SpannableString spannableString = new SpannableString(getString(R.string.accept_condition_string));

        ClickableSpan clickableSpanTermsOfUsage = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View textView) {
                Toast.makeText(ActivityPhoneNumber.this, "Terms of Usage Page will create soon!", Toast.LENGTH_SHORT).show();
            }
            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                super.updateDrawState(ds);
                ds.setUnderlineText(true);
                ds.setColor(getResources().getColor(R.color.secondary_icon_color));
            }
        };

        ClickableSpan clickableSpanPrivacyPolicy = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View textView) {
                Toast.makeText(ActivityPhoneNumber.this, "Privacy Policy Page will create soon!", Toast.LENGTH_SHORT).show();
            }
            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                super.updateDrawState(ds);
                ds.setUnderlineText(true);
                ds.setColor(getResources().getColor(R.color.secondary_icon_color));
            }
        };

        spannableString.setSpan(clickableSpanTermsOfUsage, 31, 47, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
        spannableString.setSpan(clickableSpanPrivacyPolicy, 51, 66, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        mTextViewAcceptCondition.setText(spannableString);
        mTextViewAcceptCondition.setClickable(true);
        mTextViewAcceptCondition.setMovementMethod(LinkMovementMethod.getInstance());

        mBackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        mSendOTPButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!mEditTextPhoneNumber.getText().toString().equalsIgnoreCase("") &&
                        mEditTextPhoneNumber.getText().toString().length() == 10){
                    Toast.makeText(ActivityPhoneNumber.this, "OTP Sent Successfully!", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(ActivityPhoneNumber.this, ActivityOTP.class);
                    intent.putExtra("PHONE_NUMBER_KEY", mEditTextPhoneNumber.getText().toString());
                    startActivity(intent);
                    finish();
                }else {
                    Toast.makeText(ActivityPhoneNumber.this, "Please Enter Valid Phone Number!", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
