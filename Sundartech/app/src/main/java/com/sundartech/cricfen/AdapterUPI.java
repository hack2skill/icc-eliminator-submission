package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.Category;
import com.sundartech.cricfen.model.UPI;
import com.sundartech.cricfen.viewholder.ViewHolderCategory;

import java.lang.reflect.Field;
import java.util.List;

public class AdapterUPI extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<UPI> mListUPI;
    private Context mContext;
    private OnClickListener mOnClickListener;

    public AdapterUPI(Context mContext, List<UPI> mListUPI, OnClickListener mOnClickListener) {
        this.mContext = mContext;
        this.mListUPI = mListUPI;
        this.mOnClickListener = mOnClickListener;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_payment_method, parent, false);
        return new ViewHolderPaymentMethod(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderPaymentMethod) {
            populateItem((ViewHolderPaymentMethod) holder, position);
        }
    }

    @SuppressLint("ResourceType")
    private void populateItem(final ViewHolderPaymentMethod holder, final int position) {

        holder.mCircleImageViewPaymentMethodIcon.setImageResource(mListUPI.get(position).getIcon());
        holder.mTextViewMethodName.setText(mListUPI.get(position).getName());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mOnClickListener.onClick();
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListUPI.size();
    }

    public void clear() {
        int size = mListUPI.size();
        mListUPI.clear();
        notifyItemRangeRemoved(0, size);
    }

    public interface OnClickListener{
        void onClick();
    }
}