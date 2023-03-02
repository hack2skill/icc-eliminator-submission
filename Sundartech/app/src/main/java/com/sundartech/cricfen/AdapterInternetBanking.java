package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.InternetBanking;
import com.sundartech.cricfen.model.Wallet;

import java.util.List;

public class AdapterInternetBanking extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<InternetBanking> mListInternetBanking;
    private Context mContext;
    private OnClickListener mOnClickListener;

    public AdapterInternetBanking(Context mContext, List<InternetBanking> mListInternetBanking, OnClickListener mOnClickListener) {
        this.mContext = mContext;
        this.mListInternetBanking = mListInternetBanking;
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

        holder.mCircleImageViewPaymentMethodIcon.setImageResource(mListInternetBanking.get(position).getBankIcon());
        holder.mTextViewMethodName.setText(mListInternetBanking.get(position).getBankName());

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                mOnClickListener.onClick();
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListInternetBanking.size();
    }

    public void clear() {
        int size = mListInternetBanking.size();
        mListInternetBanking.clear();
        notifyItemRangeRemoved(0, size);
    }

    public interface OnClickListener{
        void onClick();
    }
}