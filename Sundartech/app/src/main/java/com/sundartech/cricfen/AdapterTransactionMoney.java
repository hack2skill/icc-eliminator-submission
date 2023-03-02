package com.sundartech.cricfen;

import android.annotation.SuppressLint;
import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.sundartech.cricfen.model.InternetBanking;
import com.sundartech.cricfen.model.TransactionMoney;

import java.util.List;

public class AdapterTransactionMoney extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<TransactionMoney> mListTransactionMoney;
    private Context mContext;

    public AdapterTransactionMoney(Context mContext, List<TransactionMoney> mListTransactionMoney) {
        this.mContext = mContext;
        this.mListTransactionMoney = mListTransactionMoney;
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View itemView = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_transaction, parent, false);
        return new ViewHolderTransactionMoney(itemView);
    }

    @Override
    public void onBindViewHolder(@NonNull final RecyclerView.ViewHolder holder, int position) {

        if (holder instanceof ViewHolderTransactionMoney) {
            populateItem((ViewHolderTransactionMoney) holder, position);
        }
    }

    @SuppressLint({"ResourceType", "SetTextI18n"})
    private void populateItem(final ViewHolderTransactionMoney holder, final int position) {

        if (mListTransactionMoney.get(position).getTransactionType().equalsIgnoreCase("credit")){
            holder.mImageViewTransactionType.setImageResource(R.drawable.ic_baseline_add_24);
        }else {
            holder.mImageViewTransactionType.setImageResource(R.drawable.ic_baseline_horizontal_rule_24);
        }

        holder.mTextViewTransactionTitle.setText(mListTransactionMoney.get(position).getTransactionStatus());
        holder.mTextViewTransactionTime.setText(mListTransactionMoney.get(position).getTransactionTime());
        holder.mTextViewTransactionAmount.setText("₹ " + mListTransactionMoney.get(position).getTransactionAmount());

        if (mListTransactionMoney.get(position).getTransactionStatus().equalsIgnoreCase("success")){
            holder.mTextViewTransactionStatus.setText("Completed");
            holder.mTextViewTransactionStatus.setTextColor(R.color.green_500);
        }else {
            holder.mTextViewTransactionStatus.setText("Failed");
            holder.mTextViewTransactionStatus.setTextColor(R.color.red_500);
        }

        holder.itemView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                /*Intent intent = new Intent(mContext, ActivityExploredCinema.class);
                intent.putExtra("SEARCHABLE_STRING_KEY", mListCast.get(position).getName());
                intent.putExtra("TYPE_KEY", "Cast");
                mContext.startActivity(intent);*/
            }
        });

    }

    @Override
    public int getItemCount() {
        return mListTransactionMoney.size();
    }

    public void clear() {
        int size = mListTransactionMoney.size();
        mListTransactionMoney.clear();
        notifyItemRangeRemoved(0, size);
    }
}