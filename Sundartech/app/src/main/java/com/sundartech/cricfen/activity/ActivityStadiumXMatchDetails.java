package com.sundartech.cricfen.activity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.sundartech.cricfen.R;

public class ActivityStadiumXMatchDetails extends AppCompatActivity implements View.OnClickListener{

    private ImageView mImageViewStadium;
    private TextView mSeatView360Button;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_stadiumx_match_details);

        findViews();
        setViews();
    }

    private void findViews(){
        mImageViewStadium = (ImageView) findViewById(R.id.imageViewStadium);

        mSeatView360Button = (TextView) findViewById(R.id.seatView360Button);
    }

    private void setViews(){
        mSeatView360Button.setOnClickListener(this);
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.seatView360Button:
                startActivity(new Intent(ActivityStadiumXMatchDetails.this, ActivityIteractiveSeatView.class));
                break;
        }
    }
}
