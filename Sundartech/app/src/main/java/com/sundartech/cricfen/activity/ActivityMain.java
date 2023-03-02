package com.sundartech.cricfen.activity;

import android.annotation.SuppressLint;
import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.sundartech.cricfen.ActivityPhoneNumber;
import com.sundartech.cricfen.CONFIG;
import com.sundartech.cricfen.FragmentMore;
import com.sundartech.cricfen.FragmentWallet;
import com.sundartech.cricfen.fragment.FragmentHome;
import com.sundartech.cricfen.fragment.FragmentShop;
import com.sundartech.cricfen.fragment.FragmentStadiumX;
import com.sundartech.cricfen.R;

public class ActivityMain extends AppCompatActivity {

    BottomNavigationView bottomNavigation;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        bottomNavigation = findViewById(R.id.bottom_navigation);
        //openFragment(HomeFragment.newInstance("", ""));

        BottomNavigationView.OnNavigationItemSelectedListener navigationItemSelectedListener =
                new BottomNavigationView.OnNavigationItemSelectedListener() {
                    @SuppressLint("NonConstantResourceId")
                    @Override public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                        switch (item.getItemId()) {
                            case R.id.homeIconButton:
                                openFragment(FragmentHome.newInstance("", ""));
                                return true;
                            case R.id.shopIconButton:
                                openFragment(FragmentShop.newInstance("", ""));
                                return true;
                            case R.id.stadiumxIconButton:
                                openFragment(FragmentStadiumX.newInstance("", ""));
                                return true;
                            case R.id.walletIconButton:
                                if (CONFIG.sharedPreferences.getBoolean(CONFIG.islogin, false)){
                                    openFragment(FragmentWallet.newInstance("", ""));
                                    item.setCheckable(true);
                                }else {
                                    item.setCheckable(false);
                                    startActivity(new Intent(ActivityMain.this, ActivityPhoneNumber.class));
                                }
                                return true;
                            case R.id.moreMenuIconButton:
                                openFragment(FragmentMore.newInstance("", ""));
                                return true;
                        }
                        return false;
                    }
                };

        bottomNavigation.setOnNavigationItemSelectedListener(navigationItemSelectedListener);
        openFragment(FragmentHome.newInstance("", ""));
    }

    public void openFragment(Fragment fragment) {
        FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
        transaction.replace(R.id.container, fragment);
        //transaction.addToBackStack(null);
        transaction.commit();
    }

    @Override
    public void onBackPressed() {
        //super.onBackPressed();

        /*Dialog dDialog = new Dialog(ActivityMain.this, R.style.FullScreenDialogStyle);
        dDialog.setContentView(R.layout.dialog_exit);

        dDialog.findViewById(R.id.cancel).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dDialog.cancel();
            }
        });

        dDialog.findViewById(R.id.cancelDialog).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                dDialog.cancel();
            }
        });

        dDialog.findViewById(R.id.exit).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finishAffinity();
                System.exit(0);
            }
        });

        dDialog.getWindow().setBackgroundDrawableResource(android.R.color.transparent);
        dDialog.show();*/
    }
}
