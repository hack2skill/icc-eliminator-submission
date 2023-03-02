package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.recyclerview.widget.DefaultItemAnimator;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.appbar.AppBarLayout;
import com.google.android.material.appbar.CollapsingToolbarLayout;
import com.sundartech.autoimageslider.IndicatorView.animation.type.IndicatorAnimationType;
import com.sundartech.autoimageslider.SliderAnimations;
import com.sundartech.autoimageslider.SliderView;
import com.sundartech.cricfen.adapter.AdapterFlowLayoutMultiSelector;
import com.sundartech.cricfen.adapter.AdapterSlider;
import com.sundartech.cricfen.adapter.AdapterStadiumXMatch;
import com.sundartech.cricfen.listerner.ClickListenerRecyclerViewItem;
import com.sundartech.cricfen.model.Product;
import com.sundartech.cricfen.utils.HelperClass;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

public class ActivityProductDetails extends AppCompatActivity implements View.OnClickListener{

    private ImageView mBackButton, mShareButton, mWishlistButton;

    private SliderView mSliderView;
    private AdapterSlider mAdapterSlider;

    private TextView mTextViewBrand, mTextViewProductName, mTextViewPrice, mTextViewPriceAfterDiscount, mTextViewDiscount, mTextViewDescription;
    private RecyclerView mRecyclerViewSize;

    private List<String> mListSizeSelected;
    private AdapterSize mAdapterSize;

    private LinearLayoutManager mLinearLayoutManagerSize;

    private TextView mAddToCartButton, mBuyNowButton;

    private Product mProduct;

    private Bundle bundle;
    private int mId;

    private String mSize;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_details);

        findViews();
        setViews();
    }

    private void findViews(){

        bundle = getIntent().getExtras();

        if (bundle != null){
            mId = bundle.getInt("PRODUCT_ID_KEY");
        }

        mBackButton = (ImageView) findViewById(R.id.backButton);
        mShareButton = (ImageView) findViewById(R.id.shareButton);
        mWishlistButton = (ImageView) findViewById(R.id.wishlistButton);

        mSliderView = findViewById(R.id.imageSlider);

        mAdapterSlider = new AdapterSlider(ActivityProductDetails.this, R.layout.item_slider_2);

        mTextViewBrand = (TextView) findViewById(R.id.textViewBrand);
        mTextViewProductName = (TextView) findViewById(R.id.textViewProductName);
        mTextViewPrice = (TextView) findViewById(R.id.textViewProductPrice);
        mTextViewPriceAfterDiscount = (TextView) findViewById(R.id.textViewProductPriceAfterDiscount);
        mTextViewDiscount = (TextView) findViewById(R.id.textViewDicount);
        mTextViewDescription = (TextView) findViewById(R.id.textViewProductDescription);

        mRecyclerViewSize = (RecyclerView) findViewById(R.id.recyclerViewSize);

        mAddToCartButton = (TextView) findViewById(R.id.addToCartButton);
        mBuyNowButton = (TextView) findViewById(R.id.buyNowButton);

        mListSizeSelected = new ArrayList<>();

        mLinearLayoutManagerSize = new LinearLayoutManager(ActivityProductDetails.this, LinearLayoutManager.HORIZONTAL, false);
    }

    @SuppressLint("SetTextI18n")
    private void setViews(){

        mProduct = HelperClass.getProductById(ActivityProductDetails.this, mId);
        loadProductImages();

        mTextViewBrand.setText(mProduct.getProductTeamName());
        mTextViewProductName.setText(mProduct.getProductName());
        mTextViewPrice.setText("₹" + mProduct.getProductPrice());
        mTextViewPrice.setPaintFlags(mTextViewPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);
        mTextViewDiscount.setText( "(" + mProduct.getProductDiscount() + "% OFF)");
        mTextViewPriceAfterDiscount.setText("₹" + (int) (Integer.parseInt(mProduct.getProductPrice()) - (Integer.parseInt(mProduct.getProductPrice()) * Integer.parseInt(mProduct.getProductDiscount()) * 0.01)));
        mTextViewDescription.setText(mProduct.getProductDescription());

        loadProductSize();

        mBackButton.setOnClickListener(this);
        mAddToCartButton.setOnClickListener(this);
        mBuyNowButton.setOnClickListener(this);
    }

    private void loadProductImages(){
        mSliderView.setSliderAdapter(mAdapterSlider);

        mSliderView.setIndicatorAnimation(IndicatorAnimationType.WORM); //set indicator animation by using IndicatorAnimationType. :WORM or THIN_WORM or COLOR or DROP or FILL or NONE or SCALE or SCALE_DOWN or SLIDE and SWAP!!
        mSliderView.setSliderTransformAnimation(SliderAnimations.SIMPLETRANSFORMATION);
        mSliderView.setAutoCycleDirection(SliderView.AUTO_CYCLE_DIRECTION_BACK_AND_FORTH);
        mSliderView.setIndicatorSelectedColor(Color.WHITE);
        mSliderView.setIndicatorUnselectedColor(Color.GRAY);
        mSliderView.setScrollTimeInSec(4); //set scroll delay in seconds :
        //mSliderView.startAutoCycle();

        for (int i = 0; i < mProduct.getProductImages().length; i++) {
            mAdapterSlider.addItem(mProduct.getProductImages()[i]);
        }

    }

    private static void recyclerViewClickListener(Context mContext, RecyclerView mRecyclerView,
                                                  AdapterSize mAdapterSize, List<String> mList,
                                                  List<String> mListSelected, int mLimit){
        mRecyclerView.addOnItemTouchListener(new ClickListenerRecyclerViewItem(mContext, mRecyclerView, new ClickListenerRecyclerViewItem.OnItemClickListener() {
            @Override
            public void onItemClick(View view, int position) {
                multiSelect(mAdapterSize, mList, mListSelected, position, mLimit);
            }

            @Override
            public void onItemLongClick(View view, int position) {
                Toast.makeText(mContext, mList.get(position), Toast.LENGTH_SHORT).show();

            }
        }));
    }

    public static void multiSelect(AdapterSize mAdapterSize, List<String> mList, List<String> mListSelected,
                                   int position, int mLimit) {
        if (mListSelected.contains(mList.get(position))) {
            mListSelected.remove(mList.get(position));
        } else if (mListSelected.size() == mLimit) {
            mListSelected.add(mList.get(position));
            mListSelected.remove(mListSelected.get(0));
        }else {
            mListSelected.add(mList.get(position));
        }

        refreshAdapter(mAdapterSize, mList, mListSelected);
    }


    public static void refreshAdapter(AdapterSize mAdapterSize, List<String> mList, List<String> mListSelected) {
        mAdapterSize.mListStringSelected = mListSelected;
        mAdapterSize.mListString = mList;
        mAdapterSize.notifyDataSetChanged();
    }

    private void loadProductSize(){

        List<String> mListSize = Arrays.asList(mProduct.getProductSizes());

        mAdapterSize = new AdapterSize(ActivityProductDetails.this,
                mListSize, mListSizeSelected, new AdapterSize.OnItemClick() {
            @Override
            public void onClick(String string) {
                mSize = string;
            }
        });

        mRecyclerViewSize.setHasFixedSize(true);
        mRecyclerViewSize.setItemAnimator(new DefaultItemAnimator());
        mRecyclerViewSize.setLayoutManager(mLinearLayoutManagerSize);
        mRecyclerViewSize.setAdapter(mAdapterSize);
        mRecyclerViewSize.setNestedScrollingEnabled(false);
        recyclerViewClickListener(ActivityProductDetails.this, mRecyclerViewSize, mAdapterSize, mListSize, mListSizeSelected, 1);
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.menu_product, menu);
        return true;
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        // Handle item selection
        switch (item.getItemId()) {
            /*case R.id.action_add:
                addSomething();
                return true;
            case R.id.action_settings:
                startSettings();
                return true;*/
            default:
                return super.onOptionsItemSelected(item);
        }
    }

    @Override
    public void onClick(View v) {
        int mId = v.getId();
        switch (mId){
            case R.id.backButton:
                onBackPressed();
                break;
            case R.id.addToCartButton:
                Toast.makeText(this, "This feature will introduce soon!", Toast.LENGTH_SHORT).show();
                break;
            case R.id.buyNowButton:

                break;
        }
    }
}
