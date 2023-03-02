package com.sundartech.cricfen;

import android.content.SharedPreferences;

public class CONFIG {

    public static String TAG = "CricFen App: ";

    public static final String privacy_policy_url = "file:///android_asset/privacy_policy.html";

    public static SharedPreferences sharedPreferences;
    public static final String pref_name = "pref_name";
    public static final String phone_number = "uid";
    public static final String coin = "coin";
    public static final String money = "money";

    public static final String islogin = "is_login";
    public static final String showOnboardingScreen = "show_onboarding_screen";

    public static void resetSharedPreferencesData(){
        SharedPreferences.Editor editor = CONFIG.sharedPreferences.edit();
        editor.putString(CONFIG.phone_number, "");
        editor.putString(CONFIG.coin, "");
        editor.putString(CONFIG.money, "");
        editor.putBoolean(CONFIG.islogin, false);
        editor.apply();
    }

    public static void setSharedPreferencesData(String phone_number){
        SharedPreferences.Editor editor = CONFIG.sharedPreferences.edit();
        editor.putString(CONFIG.phone_number, phone_number);
        editor.putString(CONFIG.coin, "50");
        editor.putString(CONFIG.money, "0");
        editor.putBoolean(CONFIG.islogin, true);
        editor.apply();
    }

    public static void setMoney(int money){
        SharedPreferences.Editor editor = CONFIG.sharedPreferences.edit();
        int totalMoney = Integer.parseInt(CONFIG.sharedPreferences.getString(CONFIG.money, "0")) + money;
        editor.putString(CONFIG.money, "" + totalMoney);
        editor.apply();
    }
}
