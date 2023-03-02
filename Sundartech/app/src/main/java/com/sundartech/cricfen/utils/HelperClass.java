package com.sundartech.cricfen.utils;

import android.content.Context;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import androidx.recyclerview.widget.RecyclerView;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.sundartech.cricfen.model.Product;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;
import java.io.InputStream;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class HelperClass {
    public static String getJsonFromAssets(Context context, String fileName) {
        String jsonString;
        try {
            InputStream is = context.getAssets().open(fileName);

            int size = is.available();
            byte[] buffer = new byte[size];
            is.read(buffer);
            is.close();

            jsonString = new String(buffer, "UTF-8");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        return jsonString;
    }

    public static List<Product> getTrendingProducts(Context mContext){
        List<Product> mListProduct = new ArrayList<>();
        String jsonFileString = getJsonFromAssets(mContext, "products.json");
        Log.i("data", jsonFileString);

        try {
            JSONObject jsonObject = new JSONObject(jsonFileString);
            JSONArray products = jsonObject.getJSONArray("products");

            for (int i = 0; i < products.length(); i++) {
                JSONObject product = products.getJSONObject(i);
                if (i < 5){
                    mListProduct.add(new Product(product.getInt("id"), product.getString("name"), product.getString("discount"),
                            product.getString("brand"), product.getString("for"), product.getString("price"),
                            product.getString("description"), product.getString("main_image"), product.getString("category"),
                            getStringArray(product.getJSONArray("images")), getStringArray(product.getJSONArray("size"))));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return mListProduct;
    }

    public static List<Product> getProducts(Context mContext, String filter, String filterType){
        List<Product> mListProduct = new ArrayList<>();
        String jsonFileString = getJsonFromAssets(mContext, "products.json");
        Log.i("data", jsonFileString);

        try {
            JSONObject jsonObject = new JSONObject(jsonFileString);
            JSONArray products = jsonObject.getJSONArray("products");

            for (int i = 0; i < products.length(); i++) {
                JSONObject product = products.getJSONObject(i);
                if (product.getString(filterType).equalsIgnoreCase(filter)){
                    mListProduct.add(new Product(product.getInt("id"), product.getString("name"), product.getString("discount"),
                            product.getString("brand"), product.getString("for"), product.getString("price"),
                            product.getString("description"), product.getString("main_image"), product.getString("category"),
                            getStringArray(product.getJSONArray("images")), getStringArray(product.getJSONArray("size"))));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return mListProduct;
    }

    public static Product getProductById(Context mContext, int mId){
        Product mProduct = null;
        String jsonFileString = getJsonFromAssets(mContext, "products.json");
        Log.i("data", jsonFileString);

        try {
            JSONObject jsonObject = new JSONObject(jsonFileString);
            JSONArray products = jsonObject.getJSONArray("products");

            for (int i = 0; i < products.length(); i++) {
                JSONObject product = products.getJSONObject(i);
                if (product.getInt("id") == mId){
                    mProduct = new Product(product.getInt("id"), product.getString("name"), product.getString("discount"),
                            product.getString("brand"), product.getString("for"), product.getString("price"),
                            product.getString("description"), product.getString("main_image"), product.getString("category"),
                            getStringArray(product.getJSONArray("images")), getStringArray(product.getJSONArray("size")));
                }
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }

        return mProduct;
    }

    public static String[] getStringArray(JSONArray jsonArray){
        List<String> mList = new ArrayList<>();
        for (int i = 0; i < jsonArray.length(); i++) {
            try {
                mList.add(jsonArray.getString(i));
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        return mList.toArray(new String[0]);
    }
}
