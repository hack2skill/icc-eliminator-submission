package com.sundartech.cricfen.adapter;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.graphics.Paint;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.ActivityProductDetails;
import com.sundartech.cricfen.model.Product;
import com.sundartech.cricfen.R;
import com.sundartech.cricfen.viewholder.ViewHolderProduct;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterProduct extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<Product> mListProduct;
    private Context mContext;

    public AdapterProduct(Context mContext, List<Product> mListProduct) {
        this.mContext = mContext;
        this.mListProduct = mListProduct;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_product, parent, false);
        return new ViewHolderProduct(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderProduct) {
            populateItem((ViewHolderProduct) holder, position);
        }
    }

    @SuppressLint({"ResourceType", "SetTextI18n"})
    private void populateItem(final ViewHolderProduct holder, final int position) {

        holder.mTextViewDiscount.setText(mListProduct.get(position).getProductDiscount() + "% OFF");
        holder.mTextViewTeamName.setText(mListProduct.get(position).getProductTeamName());

        holder.mImageViewProductImage.setImageResource(mContext.getResources().getIdentifier(mListProduct.get(position).getProductMainImage(), "drawable", mContext.getPackageName()));

        holder.mTextViewProductFor.setText(mListProduct.get(position).getProductFor());
        holder.mTextViewProductName.setText(mListProduct.get(position).getProductName());

        holder.mTextViewPriceAfterDicsount.setText("" + (int) (Integer.parseInt(mListProduct.get(position).getProductPrice()) - (Integer.parseInt(mListProduct.get(position).getProductPrice()) * Integer.parseInt(mListProduct.get(position).getProductDiscount()) * 0.01)));
        holder.mTextViewPrice.setText(mListProduct.get(position).getProductPrice());
        holder.mTextViewPrice.setPaintFlags(holder.mTextViewPrice.getPaintFlags() | Paint.STRIKE_THRU_TEXT_FLAG);

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                Intent intent = new Intent(mContext, ActivityProductDetails.class);
                intent.putExtra("PRODUCT_ID_KEY", mListProduct.get(position).getId());
                mContext.startActivity(intent);
            }
        });

    }

    public static int getResId(String resName, Class<?> c) {

        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public int getItemCount() {
        return mListProduct.size();
    }

    public void clear() {
        int size = mListProduct.size();
        mListProduct.clear();
        notifyItemRangeRemoved(0, size);
    }
}