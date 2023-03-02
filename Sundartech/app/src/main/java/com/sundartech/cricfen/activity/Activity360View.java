package com.sundartech.cricfen.activity;

import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.view.View;
import android.widget.ImageView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import com.google.vr.sdk.widgets.pano.VrPanoramaView;
import com.sundartech.cricfen.R;

public class Activity360View extends AppCompatActivity {

    private VrPanoramaView vrPanoramaView;
    private ImageView mBackButton;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_full_360_view);

        findViews();
        setViews();
    }

    private void findViews(){
        vrPanoramaView = findViewById(R.id.vrPanoramaView);

        mBackButton = (ImageView) findViewById(R.id.backButton);
    }

    private void setViews(){
        loadPanoramaImage();

        mBackButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onBackPressed();
            }
        });
    }

    private void loadPanoramaImage(){
        VrPanoramaView.Options options  = new  VrPanoramaView.Options();
        try {
            options.inputType = VrPanoramaView.Options.TYPE_MONO;
            vrPanoramaView.loadImageFromBitmap(BitmapFactory.decodeResource(getResources(), R.drawable.img_lords_stadium_panorama), options);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
