package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.os.Bundle;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextPaint;
import android.text.method.LinkMovementMethod;
import android.text.style.ClickableSpan;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.kevinschildhorn.otpview.OTPView;

public class ActivityOTP extends AppCompatActivity {

    private ImageView mBackButton;
    private OTPView mOTPView;
    private TextView mResendOTPText, mNextButton;

    private Bundle bundle;
    private String mPhoneNumber;

    private TextView mTextViewTitle;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_otp);

        findViews();
        setViews();
    }

    @SuppressLint("SetTextI18n")
    private void findViews(){
        mBackButton = (ImageView) findViewById(R.id.backButton);

        mOTPView = (OTPView) findViewById(R.id.otp_view);

        mResendOTPText = (TextView) findViewById(R.id.resendOtpText);
        mNextButton = (TextView) findViewById(R.id.nextButton);

        mTextViewTitle = (TextView) findViewById(R.id.textViewTitle);

        bundle = getIntent().getExtras();

        if (bundle != null){
            mPhoneNumber = bundle.getString("PHONE_NUMBER_KEY");
        }

        mTextViewTitle.setText("Enter the otp sent to " + mPhoneNumber);
    }

    private void setViews(){
        SpannableString spannableString = new SpannableString(getString(R.string.resend_otp));

        ClickableSpan clickableSpanResendOTP = new ClickableSpan() {
            @Override
            public void onClick(@NonNull View textView) {
                Toast.makeText(ActivityOTP.this, "OTP Send Successfully!", Toast.LENGTH_SHORT).show();
            }
            @Override
            public void updateDrawState(@NonNull TextPaint ds) {
                super.updateDrawState(ds);
                ds.setColor(getResources().getColor(R.color.secondary_icon_color));
            }
        };


        spannableString.setSpan(clickableSpanResendOTP, 23, 33, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

        mResendOTPText.setText(spannableString);
        mResendOTPText.setClickable(true);
        mResendOTPText.setMovementMethod(LinkMovementMethod.getInstance());

        mBackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });

        mNextButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (mOTPView.isFilled()){
                    if (mOTPView.getStringFromFields().equalsIgnoreCase("1234")){
                        CONFIG.setSharedPreferencesData(mPhoneNumber);
                        finish();
                    }
                }else {
                    Toast.makeText(ActivityOTP.this, "Please Enter OTP!", Toast.LENGTH_SHORT).show();
                }
            }
        });
    }
}
